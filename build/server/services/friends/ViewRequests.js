"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Friends_1 = __importDefault(require("../models/Friends"));
const Accounts_1 = __importDefault(require("../models/Accounts"));
class ViewRequests {
    ViewRequests(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let requesters = [];
            let res = yield Friends_1.default.find({ receiver: username });
            if (res.length > 0) {
                for (const request of res) {
                    requesters.push(request.requester);
                }
                return { response: 'Friends found', requesters, status: true };
            }
            else {
                return { response: 'No requests', status: false };
            }
            ;
        });
    }
    ViewFriends(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let friendList = [];
            let res = yield Friends_1.default.find({ requester: username, confirmed: true });
            if (res.length === 0) {
                res = yield Friends_1.default.find({ receiver: username, confirmed: true });
                if (res.length === 0) {
                    return { response: 'No friends found', status: false };
                }
                else {
                    for (const friend of res) {
                        friendList.push(friend.requester);
                    }
                }
            }
            else {
                for (const friend of res) {
                    friendList.push(friend.receiver);
                }
                res = yield Friends_1.default.find({ receiver: username, confirmed: true });
                if (res.length > 0) {
                    for (const friend of res) {
                        friendList.push(friend.requester);
                    }
                }
            }
            let activeFriends = [];
            for (const friend of friendList) {
                let result = yield Accounts_1.default.findOne({ username: friend, active: true });
                if (result) {
                    activeFriends.push(friend);
                }
            }
            return { response: 'Friends found', activeFriends, status: true };
        });
    }
}
exports.default = ViewRequests;
//# sourceMappingURL=ViewRequests.js.map
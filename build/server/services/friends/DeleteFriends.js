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
class DeleteFriend {
    delete(username, friend) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Friends_1.default.findOne({ requester: friend, receiver: username, confirmed: true });
            if (!res) {
                res = yield Friends_1.default.findOne({ requester: username, receiver: friend, confirmed: true });
                if (!res) {
                    return { response: `There is no friendship between ${username} and ${friend}`, status: false };
                }
                else {
                    yield Friends_1.default.deleteOne({ requester: username, receiver: friend });
                }
            }
            else {
                yield Friends_1.default.deleteOne({ requester: friend, receiver: username });
            }
            return { response: `${friend} has been removed from your friends list`, status: true };
        });
    }
}
exports.default = DeleteFriend;
//# sourceMappingURL=DeleteFriends.js.map
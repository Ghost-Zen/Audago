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
class SendRequest {
    FriendRequest(requester, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Friends_1.default.findOne({ requester, receiver });
            let exists = false;
            if (!res) { //check if the current request exists
                let check = yield Friends_1.default.findOne({ requester: receiver, receiver: requester });
                if (!check) { //check if the invers of the request exists
                    let request = new Friends_1.default({ requester, receiver, confirmed: false });
                    yield request.save();
                    return { response: 'Friend request sent', status: true };
                }
                else {
                    exists = true;
                }
            }
            else {
                exists = true;
            }
            if (exists) {
                return { response: 'Friend request already exists', status: false };
            }
        });
    }
}
exports.default = SendRequest;
//# sourceMappingURL=SendFriendRequest.js.map
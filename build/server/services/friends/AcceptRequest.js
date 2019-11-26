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
class AcceptRequest {
    AcceptRequest(username, friend) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = false;
            let check = yield Friends_1.default.findOne({ requester: username, receiver: friend });
            if (!check) {
                check = yield Friends_1.default.findOne({ requester: friend, receiver: username });
                if (check) {
                    found = true;
                }
            }
            else {
                found = true;
            }
            if (!found) {
                return { response: 'Request not found', status: false };
            }
            else {
                yield Friends_1.default.updateOne({ _id: check._id }, { confirmed: true });
                return { response: `Successfully accepted friend request between ${username} & ${friend}`, status: true };
            }
        });
    }
}
exports.default = AcceptRequest;
//# sourceMappingURL=AcceptRequest.js.map
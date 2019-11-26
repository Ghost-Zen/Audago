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
const Accounts_1 = __importDefault(require("../models/Accounts"));
const ViewRequests_1 = __importDefault(require("./ViewRequests"));
const viewRequests = new ViewRequests_1.default;
class FriendSearch {
    search(username, search) {
        return __awaiter(this, void 0, void 0, function* () {
            let activeFriends = yield viewRequests.ViewFriends(username);
            let searchResult = [];
            if (search.trim() === '') {
                let res = yield Accounts_1.default.find({ active: true });
                for (const account of res) {
                    let found = false;
                    if (username !== account.username) {
                        if (activeFriends.data) {
                            for (const user of activeFriends.data) {
                                if (user.friend === account.username) {
                                    found = true;
                                }
                            }
                        }
                        if (!found) {
                            let item = { friend: account.username, image: account.image };
                            searchResult.push(item);
                        }
                    }
                }
            }
            else {
                let res = yield Accounts_1.default.findOne({ username: search, active: true });
                if (res) {
                    let item = { friend: res.username, image: res.image };
                    searchResult.push(item);
                }
            }
            if (searchResult.length > 0) {
                return { response: 'Users found', data: searchResult, status: true };
            }
            else {
                return { response: 'No users found', status: false };
            }
        });
    }
}
exports.default = FriendSearch;
//# sourceMappingURL=FriendSearch.js.map
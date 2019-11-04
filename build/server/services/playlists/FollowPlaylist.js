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
const Playlists_1 = __importDefault(require("../models/Playlists"));
const Accounts_1 = __importDefault(require("../models/Accounts"));
class FollowPlaylist {
    follow(username, playlistName) {
        return __awaiter(this, void 0, void 0, function* () {
            let userFound = false;
            let playlistFound = false;
            let exists = false;
            let userID;
            yield Accounts_1.default.findOne({ username })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                if (res === null) {
                    userFound = false;
                }
                else {
                    userFound = true;
                    userID = res._id;
                    yield Playlists_1.default.findOne({ name: playlistName })
                        .then((res) => __awaiter(this, void 0, void 0, function* () {
                        if (res === null) {
                            playlistFound = false;
                        }
                        else {
                            playlistFound = true;
                            if (!res.users.includes(userID)) {
                                let userList = res.users;
                                userList.push(userID);
                                yield Playlists_1.default.updateOne({ name: playlistName }, { users: userList, follower_count: userList.length });
                            }
                            else {
                                exists = true;
                            }
                        }
                    }));
                }
                ;
            }));
            if (!userFound) {
                return { response: `Username ${username} not found`, status: false };
            }
            else if (!playlistFound) {
                return { response: `Playlist ${playlistName} not found`, status: false };
            }
            else if (exists) {
                return { response: `${username} is already following ${playlistName}`, status: false };
            }
            else {
                return { response: `${username} is now following ${playlistName}`, status: true };
            }
        });
    }
    unfollow(username, playlistName) {
        return __awaiter(this, void 0, void 0, function* () {
            let userFound = false;
            let playlistFound = false;
            let userID;
            yield Accounts_1.default.findOne({ username })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                if (res === null) {
                    userFound = false;
                }
                else {
                    userFound = true;
                    userID = res._id;
                    yield Playlists_1.default.findOne({ name: playlistName })
                        .then((res) => __awaiter(this, void 0, void 0, function* () {
                        if (res === null) {
                            playlistFound = false;
                        }
                        else {
                            playlistFound = true;
                            let index = yield res.users.indexOf(userID);
                            yield res.users.splice(index, 1);
                            yield Playlists_1.default.updateOne({ name: playlistName }, { users: res.users, follower_count: res.users.length });
                        }
                    }));
                }
                ;
            }));
            if (!userFound) {
                return { response: `Username ${username} not found`, status: false };
            }
            else if (!playlistFound) {
                return { response: `Playlist ${playlistName} not found`, status: false };
            }
            else {
                return { response: `${username} has unfollowed ${playlistName}`, status: true };
            }
        });
    }
}
exports.default = FollowPlaylist;
//# sourceMappingURL=FollowPlaylist.js.map
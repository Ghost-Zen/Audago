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
class PlaylistsForUser {
    playlistsFor(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let usernameFound = false;
            let userID;
            let playlists = [];
            yield Accounts_1.default.findOne({ username })
                .then(res => {
                if (res === null) {
                    usernameFound = false;
                }
                else {
                    usernameFound = true;
                    userID = res._id;
                }
            });
            if (usernameFound) {
                yield Playlists_1.default.find({})
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    for (const playlist of res) {
                        if (playlist.users.includes(userID)) {
                            let playlistData = { name: playlist.name, followers: playlist.follower_count, song_count: playlist.song_count };
                            playlists.push(playlistData);
                        }
                    }
                    ;
                }));
                if (playlists.length === 0) {
                    return { response: `No playlists found, go follow/create some!`, status: true };
                }
                else {
                    return { response: `Playlist(s) found`, list: playlists, status: true };
                }
            }
            else {
                return { response: `Username ${username} not found`, status: false };
            }
        });
    }
}
exports.default = PlaylistsForUser;
//# sourceMappingURL=PlaylistsForUser.js.map
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
class CreatePlaylist {
    create(playlist) {
        return __awaiter(this, void 0, void 0, function* () {
            let exists = false;
            let newPlaylist = new Playlists_1.default(playlist);
            yield Playlists_1.default.find({ name: playlist.name })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                if (res.length > 0) {
                    exists = true;
                }
                yield Accounts_1.default.findOne({ username: playlist.creator })
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    yield newPlaylist.users.push(res._id);
                }));
            }));
            if (!exists) {
                yield newPlaylist.save();
                return { response: `Playlist created!` };
            }
            else {
                return { response: `Playlist ${playlist.name} already exists` };
            }
        });
    }
    addToPlaylist(track) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = true;
            let exists = false;
            yield Playlists_1.default.findOne({ name: track.playlist_name })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                if (res === null) {
                    found = false;
                }
                else {
                    let song_list = res.songs;
                    for (const song of song_list) {
                        if (song.song === track.song && song.artist === track.artist) {
                            exists = true;
                        }
                    }
                    if (!exists) {
                        song_list.push({ song: track.song, artist: track.artist });
                        yield Playlists_1.default.updateOne({ name: track.playlist_name }, { songs: song_list });
                    }
                }
            }));
            if (!found) {
                return { response: `${track.playlist_name} not found` };
            }
            else if (exists) {
                return { response: `${track.song} is already in the playlist` };
            }
            else {
                return { response: `track added successfully` };
            }
        });
    }
}
exports.CreatePlaylist = CreatePlaylist;
//# sourceMappingURL=CreatePlaylist.js.map
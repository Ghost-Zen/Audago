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
    create(name, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            if (name.trim()) {
                let playlist = {
                    name,
                    creator,
                    follower_count: 1,
                    song_count: 0,
                };
                let exists = false;
                let newPlaylist = new Playlists_1.default(playlist);
                yield Playlists_1.default.findOne({ name: playlist.name })
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    if (res) { //check if playlist name is already in use
                        exists = true;
                    }
                    else {
                        yield Accounts_1.default.findOne({ username: playlist.creator })
                            .then((res) => __awaiter(this, void 0, void 0, function* () {
                            yield newPlaylist.users.push(res._id); //if it's a new playlist assign playlist creator to playlist followers(users)
                        }));
                    }
                }));
                // Returning separate from code as returns don't work in a promise        
                if (!exists) {
                    yield newPlaylist.save();
                    return { response: `Playlist created!`, status: true };
                }
                else {
                    return { response: `Playlist ${playlist.name} already exists`, status: false };
                }
            }
            else {
                return { response: `Please eneter a name for the playlist`, status: false };
            }
        });
    }
    addToPlaylist(username, track) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = false;
            let exists = false;
            let owner = false;
            yield Playlists_1.default.findOne({ name: track.playlist_name })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                if (res) { //check if playlist exists
                    found = true;
                    if (res.creator === username) {
                        owner = true;
                        let song_list = res.songs;
                        for (const song of song_list) { //if playlist exists, check the playlist if the new track is already in the playlist
                            if (song.track === track.track && song.artist === track.artist) {
                                exists = true;
                            }
                        }
                        if (!exists) {
                            song_list.push(track); //if the track doesn't already exist then add to list and update DB
                            yield Playlists_1.default.updateOne({ name: track.playlist_name }, { songs: song_list, song_count: song_list.length });
                        }
                    }
                    ;
                }
            }));
            // Returning separate from code as returns don't work in a promise        
            if (!found) {
                return { response: `${track.playlist_name} not found`, status: false };
            }
            else if (!owner) {
                return { response: `You cannot add to a playlist you do not own`, status: false };
            }
            else if (exists) {
                return { response: `${track.track} is already in the playlist`, status: false };
            }
            else {
                return { response: `track added successfully`, status: true };
            }
        });
    }
}
exports.CreatePlaylist = CreatePlaylist;
//# sourceMappingURL=CreatePlaylist.js.map
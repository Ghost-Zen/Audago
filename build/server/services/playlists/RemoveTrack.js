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
class RemoveTrack {
    remove(username, track) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = false;
            let owner = false;
            yield Playlists_1.default.findOne({ name: track.playlist_name }) //find playlist the track is in
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                if (res.creator === username) {
                    owner = true;
                    let newList = [];
                    let song_list = res.songs;
                    for (const item of song_list) {
                        if (item.track === track.track && item.artist === track.artist) {
                            found = true;
                        }
                        else {
                            newList.push(item); //if the track is found leave it out of the new track list
                        }
                    }
                    yield Playlists_1.default.updateOne({ name: track.playlist_name }, { songs: newList, song_count: newList.length }); //update document with new songlist and song count
                }
            }));
            //Returning is seperate from rest of code as you can't return in a promise
            if (!owner) {
                return { response: `You cannot remove a track from a playlist you don't own`, status: false };
            }
            else if (!found) {
                return { response: `The song ${track.track} was not found in the playlist ${track.playlist_name}`, status: false };
            }
            else {
                return { response: `The song ${track.track} was successfully removed from the playlist ${track.playlist_name}`, status: true };
            }
        });
    }
}
exports.default = RemoveTrack;
//# sourceMappingURL=RemoveTrack.js.map
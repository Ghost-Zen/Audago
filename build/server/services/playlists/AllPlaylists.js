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
class AllPlaylists {
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            let playlists = [];
            yield Playlists_1.default.find({}) //pull all playlists
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                for (const playlist of res) {
                    playlists.push({ name: playlist.name, creator: playlist.creator, followers: playlist.follower_count, song_count: playlist.song_count, songs: playlist.songs });
                }
            }));
            return { playlists, response: `Playlists found`, status: true };
        });
    }
}
exports.default = AllPlaylists;
//# sourceMappingURL=AllPlaylists.js.map
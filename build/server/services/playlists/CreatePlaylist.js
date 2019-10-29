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
class CreatePlaylist {
    create(playlist) {
        return __awaiter(this, void 0, void 0, function* () {
            let exists = false;
            let newPlaylist = new Playlists_1.default(playlist);
            yield Playlists_1.default.find({ name: playlist.name })
                .then(res => {
                if (res.length > 0) {
                    exists = true;
                }
            });
            if (!exists) {
                yield newPlaylist.save();
            }
            return exists;
        });
    }
    addToPlaylist(song, artist, playlist) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Playlists_1.default.find({ name: playlist })
                .then(res => {
                if (res.length > 0) {
                    return `${playlist} not found`;
                }
                else {
                    res[0];
                }
            });
        });
    }
}
exports.CreatePlaylist = CreatePlaylist;
//# sourceMappingURL=CreatePlaylist.js.map
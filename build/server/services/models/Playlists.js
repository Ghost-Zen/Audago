"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Playlist = new mongoose_1.Schema({
    "name": { "type": String, "required": true, "unique": true },
    "creator": { "type": String, "required": true, "unique": false },
    "follower_count": { "type": Number, "required": true },
    "song_count": { "type": Number, "required": true },
    "songs": { "type": [{ "track": String, "artist": String, "song": String, "album": String, "artwork": String }], "required": false },
    "users": [{ "type": mongoose_1.Schema.Types.ObjectId, ref: 'Accounts' }]
});
exports.default = mongoose_1.default.model('Playlist', Playlist);
//# sourceMappingURL=Playlists.js.map
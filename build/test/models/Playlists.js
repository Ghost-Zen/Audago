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
    "follower_count": { "type": Number, "required": true },
    "song_count": { "type": Number, "required": true },
    "songs": { "type": [String], "required": true },
    "users": [{ "type": mongoose_1.Schema.Types.ObjectId, ref: 'Accounts' }]
});
exports.default = mongoose_1.default.model('Playlist', Playlist);
// sample data
// {
//     name: '2019 Rap',
//     follower_count: 20034,
//     song_count: 1,
//     songs: ['Blessings'],
//     users: ["507f1f77bcf86cd799439011"]
// }
//# sourceMappingURL=Playlists.js.map
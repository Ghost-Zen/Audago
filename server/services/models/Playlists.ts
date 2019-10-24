import mongoose, { Schema, Document } from 'mongoose';

export interface Iplaylist {
    name: string,
    follower_count: number,
    song_count: number,
    songs: Array<string>
    users?: Array<string>
}

interface PlaylistModel extends Iplaylist, Document{}

const Playlist: Schema = new Schema({
    "name": { "type": String, "required": true, "unique": true },
    "follower_count": {"type": Number, "required": true},
    "song_count": {"type": Number, "required": true},
    "songs": {"type": [String], "required":true},
    "users": [{ "type": Schema.Types.ObjectId, ref: 'Accounts' }]
});

export default mongoose.model<PlaylistModel>('Playlist', Playlist);

// sample data
// {
//     name: '2019 Rap',
//     follower_count: 20034,
//     song_count: 1,
//     songs: ['Blessings'],
//     users: ["507f1f77bcf86cd799439011"]
// }
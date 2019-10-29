import mongoose, { Schema, Document } from 'mongoose';

export interface Iplaylist {
    name: string,
    creator: string,
    follower_count: number,
    song_count: number,
    songs?: Array<{ song_name: string, artist: string }>
    users?: Array<string>
}

interface PlaylistModel extends Iplaylist, Document { }

const Playlist: Schema = new Schema({
    "name": { "type": String, "required": true, "unique": true },
    "creator": { "type": String, "required": true, "unique": false },
    "follower_count": { "type": Number, "required": true },
    "song_count": { "type": Number, "required": true },
    "songs": { "type": [{ "song_name": String, "artist": String }], "required": false },
    "users": [{ "type": Schema.Types.ObjectId, ref: 'Accounts' }]
});

export default mongoose.model<PlaylistModel>('Playlist', Playlist);

// sample data
// {
//     name: '2019 Rap',
//     follower_count: 20034,
//     creator: 'Dyllan',
//     song_count: 1,
//     songs: ['Blessings'],
//     users: ["507f1f77bcf86cd799439011"]
// }
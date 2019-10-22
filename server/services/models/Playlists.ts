import mongoose, { Schema, Document } from 'mongoose';

export interface Iplaylist extends Document {
    name: string,
    follower_count: number,
    song_count: number,
    songs: [string]
}

const Playlist: Schema = new Schema({
    "name": { "type": String, "required": true, "unique": true },
    "follower_count": {"type": Number, "required": true},
    "song_count": {"type": Number, "required": true},
    "songs": {"type": [String], "required":true}
});

export default mongoose.model<Iplaylist>('playlist', Playlist);

// sample data
// {
//     name: '2019 Rap',
//     follower_count: 20034,
//     song_count: 1,
//     songs: ['Blessings']
// }
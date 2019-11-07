import mongoose, { Schema, Document } from 'mongoose';

export interface Iplaylist {
    name: string,
    creator: string,
    follower_count: number,
    song_count: number,
    songs?: Array<TrackInfo>
    users?: Array<any>
}
export interface TrackInfo {
    track: string,
    artist: string,
    song: string,
    album: string,
    artwork: string,
    playlist_name: string
}

interface PlaylistModel extends Iplaylist, Document { }

const Playlist: Schema = new Schema({
    "name": { "type": String, "required": true, "unique": true },
    "creator": { "type": String, "required": true, "unique": false },
    "follower_count": { "type": Number, "required": true },
    "song_count": { "type": Number, "required": true },
    "songs": { "type": [{ "track": String, "artist": String, "song": String, "album": String, "artwork": String }], "required": false },
    "users": [{ "type": Schema.Types.ObjectId, ref: 'Accounts' }]
});

export default mongoose.model<PlaylistModel>('Playlist', Playlist);

// sample data
// {
//     name: '2019 Rap',
//     follower_count: 20034,
//     creator: 'Dyllan',
//     song_count: 1,
//     songs: [{track:'Blessings', artist:'Big sean', song:'urltosong.com', album:'none',artwork:'urltoartwork'}],
//     users: ["507f1f77bcf86cd799439011"]
// }
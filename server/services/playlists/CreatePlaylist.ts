import Playlist, { Iplaylist, TrackInfo } from '../models/Playlists';
import Account from '../models/Accounts';

export class CreatePlaylist {

    async create(playlist: Iplaylist) {
        let exists = false;
        let newPlaylist = new Playlist(playlist);
        await Playlist.findOne({ name: playlist.name })
            .then(async (res) => {
                if (res) {     //check if playlist name is already in use
                    exists = true;
                } else {
                    await Account.findOne({ username: playlist.creator })
                        .then(async (res) => {
                            await newPlaylist.users.push(res._id);      //if it's a new playlist assign playlist creator to playlist followers(users)
                        });
                }
            });
        // Returning separate from code as returns don't work in a promise        
        if (!exists) {
            await newPlaylist.save();
            return { response: `Playlist created!`, status: true };
        } else {
            return { response: `Playlist ${playlist.name} already exists`, status: false };
        }
    }

    async addToPlaylist(track: TrackInfo) {
        let found = false;
        let exists = false;
        await Playlist.findOne({ name: track.playlist_name })
            .then(async (res) => {
                if (res) {      //check if playlist exists
                    found = true;
                    let song_list = res.songs;
                    for (const song of song_list) {     //if playlist exists, check the playlist if the new track is already in the playlist
                        if (song.track === track.track && song.artist === track.artist) {
                            exists = true;
                        }
                    }
                    if (!exists) {
                        song_list.push({ track: track.track, artist: track.artist });       //if the track doesn't already exist then add to list and update DB
                        await Playlist.updateOne({ name: track.playlist_name }, { songs: song_list, song_count: song_list.length });
                    }
                }
            });
        // Returning separate from code as returns don't work in a promise        
        if (!found) {
            return { response: `${track.playlist_name} not found`, status: false };
        } else if (exists) {
            return { response: `${track.track} is already in the playlist`, status: false };
        } else {
            return { response: `track added successfully`, status: true };
        }
    }
}
import Playlist, { TrackInfo } from '../models/Playlists';

export default class RemoveTrack {
    async remove(track: TrackInfo) {
        let found = false;
        await Playlist.findOne({ name: track.playlist_name })       //find playlist the track is in
            .then(async (res) => {
                let newList = [];
                let song_list = res.songs;
                for (const item of song_list) {
                    if (item.track === track.track && item.artist === track.artist) {
                        found = true;
                    } else {
                        newList.push(item);     //if the track is found leave it out of the new track list
                    }
                }
                await Playlist.updateOne({ name: track.playlist_name }, { songs: newList, song_count: newList.length });    //update document with new songlist and song count
            });
        //Returning is seperate from rest of code as you can't return in a promise
        if (!found) {
            return { response: `The song ${track.track} was not found in the playlist ${track.playlist_name}`, status: false };
        } else {
            return { response: `The song ${track.track} was successfully removed from the playlist ${track.playlist_name}`, status: true };
        }
    }
}


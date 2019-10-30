import Playlist, { TrackInfo } from '../models/Playlists';

export default class RemoveTrack {
    async remove(track: TrackInfo) {
        let found = false;
        await Playlist.findOne({ name: track.playlist_name })
            .then(async (res) => {
                let newList = [];
                let song_list = res.songs;
                for (const item of song_list) {
                    if (item.song === track.song && item.artist === track.artist) {
                        found = true;
                    }   else {
                        newList.push(item);
                    }
                }
                await Playlist.updateOne({ name: track.playlist_name }, { songs: newList });
            });
        if(!found){
            return {response: `The song ${track.song} was not found in the playlist ${track.playlist_name}`};
        } else {
            return {response: `The song ${track.song} was successfully removed from the playlist ${track.playlist_name}`};
        }
    }
}


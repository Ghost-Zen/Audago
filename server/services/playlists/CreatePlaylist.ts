import Playlist, { Iplaylist } from '../models/Playlists';

export class CreatePlaylist {
    async create(playlist: Iplaylist) {
        let exists = false;
        let newPlaylist = new Playlist(playlist);
        await Playlist.find({ name: playlist.name })
            .then(res => {
                if (res.length > 0) {
                    exists = true;
                }
            });
        if (!exists) {
            await newPlaylist.save();
        }
        return exists
    }

    async addToPlaylist(song: string, artist: string, playlist: string) {
        await Playlist.find({ name: playlist })
            .then(res => {
                if (res.length > 0) {
                    return `${playlist} not found`;
                } else {
                    res[0]
                }
            });
    }
}
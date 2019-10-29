import Playlist, { Iplaylist } from '../models/Playlists';
import Account from '../models/Accounts';

export class CreatePlaylist {
    async create(playlist: Iplaylist) {
        let exists = false;
        let newPlaylist = new Playlist(playlist);
        await Playlist.find({ name: playlist.name })
            .then(async (res) => {
                if (res.length > 0) {
                    exists = true;
                }
                await Account.findOne({ username: playlist.creator })
                    .then(async (res) => {
                        await newPlaylist.users.push(res._id);
                    });
            });
        if (!exists) {
            await newPlaylist.save();
            return { response: `Playlist created!` };
        } else {
            return { response: `Playlist ${playlist.name} already exists` };
        }
    }

    async addToPlaylist(newSong: string, artist: string, playlist: string) {
        let found = true;
        let exists = false;
        await Playlist.findOne({ name: playlist })
            .then(async (res) => {
                if (res === null) {
                    found = false;
                } else {
                    let song_list = res.songs;
                    for (const song of song_list) {
                        if (song.song_name === newSong && song.artist === artist) {
                            exists = true;
                        }
                    }
                    if (!exists) {
                        song_list.push({ song_name: newSong, artist });
                        await Playlist.updateOne({ name: playlist }, { songs: song_list });
                    }
                }
            });
        if (!found) {
            return { response: `${playlist} not found` };
        } else if (exists) {
            return { response: `${newSong} is already in the playlist` };
        } else {
            return { response: `track added successfully` };
        }
    }
}
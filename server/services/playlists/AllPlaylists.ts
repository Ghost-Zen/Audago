import Playlist from "../models/Playlists";

export default class AllPlaylists {
    async all() {
        let playlists = [];
        await Playlist.find({}) //pull all playlists
            .then(async (res) => {
                for (const playlist of res) {
                    playlists.push({ name: playlist.name, creator: playlist.creator, followers: playlist.follower_count, song_count: playlist.song_count, songs: playlist.songs });
                }
            });
        return { playlists, response: `Playlists found`, status: true };

    }
}
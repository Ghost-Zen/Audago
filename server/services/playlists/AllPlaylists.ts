import Playlist from "../models/Playlists";

export default class AllPlaylists {
    async all() {
        let playlists = [];
        await Playlist.find({}) //pull all playlists
            .then(async (res) => {
                for (const playlist of res) {
                    let followers = [];
                    await Playlist.
                        findOne({ name: playlist.name }).
                        populate('users').
                        then(function (users) {
                            for (const user of users.users) {
                                followers.push(user.username);
                            }
                        });
                    playlists.push({ name: playlist.name, creator: playlist.creator, followers: playlist.follower_count, song_count: playlist.song_count, songs: playlist.songs, follower_list: followers });
                }
            });
        return { playlists, response: `Playlists found`, status: true };

    }
}
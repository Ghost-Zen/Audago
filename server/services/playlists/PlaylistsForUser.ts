import Playlist from "../models/Playlists";
import Account from "../models/Accounts";

export default class PlaylistsForUser {
    async playlistsFor(username: string) {
        let usernameFound: boolean = false;
        let userID: any;
        let playlists: any = [];
        await Account.findOne({ username })
            .then(res => {
                if (res === null) {
                    usernameFound = false;
                } else {
                    usernameFound = true;
                    userID = res._id;
                }
            });
        if (usernameFound) {
            await Playlist.find({})
                .then(async (res) => {
                    for (const playlist of res) {
                        if (playlist.users.includes(userID)) {
                            let playlistData: any = { name: playlist.name, followers: playlist.follower_count, song_count: playlist.song_count };
                            playlists.push(playlistData);
                        }
                    };
                });
            if (playlists.length === 0) {
                return {response: `No playlists found, go follow/create some!`, status: true};
            } else {
                return { response: playlists, status: true };
            }
        } else {
            return { response: `Username ${username} not found`, status: false }
        }
    }
}
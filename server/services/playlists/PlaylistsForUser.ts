import Playlist from "../models/Playlists";
import Account from "../models/Accounts";

export default class PlaylistsForUser {
    async playlistsFor(username: string) {
        let usernameFound: boolean = false;
        let userID: any;
        let playlists: any = [];
        await Account.findOne({ username })
            .then(res => {
                if (res) {      //check if username exists
                    usernameFound = true;
                    userID = res._id;
                }
            });
        if (usernameFound) {
            await Playlist.find({}) //pull all playlists
                .then(async (res) => {
                    for (const playlist of res) {
                        if (playlist.users.includes(userID)) {      //loop through all playlists for users ID
                            let followers = [];
                            await Playlist.
                                findOne({ name: playlist.name }).
                                populate('users').
                                then(function (users) {
                                    for (const user of users.users) {
                                        followers.push(user.username);
                                    }
                                });
                            let playlistData: any = { name: playlist.name, creator: playlist.creator, followers: playlist.follower_count, song_count: playlist.song_count, songs: playlist.songs, follower_list:followers };
                            playlists.push(playlistData);       //if a users ID is found then add it to a list
                        }
                    };
                });

            //Returning is seperate from rest of code as you can't return in a promise
            if (playlists.length === 0) {
                return { response: `No playlists found, go follow or create some!`, status: true };
            } else {
                return { playlists, response: `Playlists found`, status: true };
            }
        } else {
            return { response: `Username ${username} not found`, status: false }
        }
    }
}
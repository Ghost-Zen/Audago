import Playlist from '../models/Playlists';
import Account from '../models/Accounts';

export default class FollowPlaylist {
    async follow(username: string, playlistName: string) {
        let userFound = false;
        let playlistFound = false;
        let exists = false;
        let userID: any;
        await Account.findOne({ username })
            .then(async (res) => {
                if (res) {      //check if account exists in DB
                    userFound = true;
                    userID = res._id;       //if found save user ID
                    await Playlist.findOne({ name: playlistName })
                        .then(async (res) => {
                            if (res) {      //check if playlist exists in playlist
                                playlistFound = true;
                                if (!res.users.includes(userID)) {      //if playlist is found, check if user isn't already following the playlist
                                    let userList = res.users;
                                    userList.push(userID);      //if the user isn't already following the playlist then add them
                                    await Playlist.updateOne({ name: playlistName }, { users: userList, follower_count: userList.length });     //update documents users and follower count
                                } else {
                                    exists = true;      //if user already follows then return error
                                }
                            }
                        });
                };
            });

        // Returning error messages separate from code as returns don't work in a promise
        if (!userFound) {
            return { response: `Username ${username} not found`, status: false };
        } else if (!playlistFound) {
            return { response: `Playlist ${playlistName} not found`, status: false };
        } else if (exists) {
            return { response: `${username} is already following ${playlistName}`, status: false };
        } else {
            return { response: `${username} is now following ${playlistName}`, status: true };
        }
    }

    async unfollow(username: string, playlistName: string) {
        let userFound = false;
        let playlistFound = false;
        let userID: any;
        await Account.findOne({ username })
            .then(async (res) => {
                if (res) {      //check if username exists in DB
                    userFound = true;
                    userID = res._id;
                    await Playlist.findOne({ name: playlistName })
                        .then(async (res) => {
                            if (res) {      //check if playlist exists in DB
                                playlistFound = true;
                                let index = await res.users.indexOf(userID);        //if it exists then get index of user in the array in document
                                await res.users.splice(index, 1);       //remove user using index
                                await Playlist.updateOne({ name: playlistName }, { users: res.users, follower_count: res.users.length });  //update documents users and follower count
                            }
                        })
                };
            });

        // Returning separate from code as returns don't work in a promise
        if (!userFound) {
            return { response: `Username ${username} not found`, status: false };
        } else if (!playlistFound) {
            return { response: `Playlist ${playlistName} not found`, status: false };
        } else {
            return { response: `${username} has unfollowed ${playlistName}`, status: true };
        }
    }
}
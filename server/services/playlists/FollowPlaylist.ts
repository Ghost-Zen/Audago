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
                if (res === null) {
                    userFound = false;
                } else {
                    userFound = true;
                    userID = res._id;
                    await Playlist.findOne({ name: playlistName })
                        .then(async (res) => {
                            if (res === null) {
                                playlistFound = false;
                            } else {
                                playlistFound = true;
                                if (!res.users.includes(userID)) {
                                    let userList = res.users;
                                    userList.push(userID);
                                    await Playlist.updateOne({ name: playlistName }, { users: userList, follower_count: userList.length });
                                } else {
                                    exists = true;
                                }
                            }
                        });
                };
            });

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
                if (res === null) {
                    userFound = false;
                } else {
                    userFound = true;
                    userID = res._id;
                    await Playlist.findOne({ name: playlistName })
                        .then(async (res) => {
                            if (res === null) {
                                playlistFound = false;
                            } else {
                                playlistFound = true;
                                let index = await res.users.indexOf(userID);
                                await res.users.splice(index, 1);
                                await Playlist.updateOne({ name: playlistName }, { users: res.users, follower_count: res.users.length });
                            }
                        })
                };
            });
        if (!userFound) {
            return { response: `Username ${username} not found`, status: false };
        } else if (!playlistFound) {
            return { response: `Playlist ${playlistName} not found`, status: false };
        } else {
            return { response: `${username} has unfollowed ${playlistName}`, status: true };
        }
    }
}
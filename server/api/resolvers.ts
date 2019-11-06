import CreateAccount from '../services/accounts/CreateAccount';
import DeleteAccount from '../services/accounts/DeletingAccount';
import UpdateAccount from '../services/accounts/UpdateAccount';
import UserData from '../services/accounts/UserData';
import SearchSong from '../services/songsearch';
import PlaylistsForUser from '../services/playlists/PlaylistsForUser';
import FollowPlaylist from '../services/playlists/FollowPlaylist';
import { CreatePlaylist } from '../services/playlists/CreatePlaylist';
import RemoveTrack from '../services/playlists/RemoveTrack';
const dataRetrieval = new UserData;
const createAccount = new CreateAccount;
const searchSong = new SearchSong;
const deleteAccount = new DeleteAccount;
const updateAccount = new UpdateAccount;
const createPlaylist = new CreatePlaylist;
const removeTrack = new RemoveTrack;
const playlistsForUser = new PlaylistsForUser;
const followPlaylist = new FollowPlaylist;

const Query = {
    hello: () => 'Hello World',
    test: () => 'Test Success, GraphQL server is up & running !!',
    createAccount: async (input) => {
        return await createAccount.create(input.account)
    },
    verifytoken: () => {
        
    },
    searchSong: async (input) => {
        let result = await searchSong.getFromItunesAPI(input)
        return { response: result }
    },
    loginCheck: async (input) => {
        return await dataRetrieval.loginData(input.username, input.password, input.email);
    },
    userData: async (input) => {
        return await dataRetrieval.userData(input.username)
    },
    deleteUser: async (input) => {
        return await deleteAccount.delete(input.username);
    },
    deleteAll: async () => {
        return await deleteAccount.deleteAll();
    },
    newPlaylist: async (input) => {
        return await createPlaylist.create(input.playlist);
    },
    newTrack: async (input) => {
        return await createPlaylist.addToPlaylist(input.track);
    },
    deleteTrack: async (input) => {
        return await removeTrack.remove(input.track);
    },
    updateUser: async (input) => {
        return await updateAccount.update(input.username, input.account);
    },
    updatePassword: async (input) => {
        return await updateAccount.updatePassword(input.username, input.currentPass, input.newPass);
    },
    followPlaylist: async (input) => {
        return await followPlaylist.follow(input.username, input.playlistName);
    },
    unfollowPlaylist: async (input) => {
        return await followPlaylist.unfollow(input.username, input.playlistName);
    },
    playlistsForUser: async (input) => {
        return await playlistsForUser.playlistsFor(input.username);
    }
}
export default Query
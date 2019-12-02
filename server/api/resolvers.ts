import CreateAccount from '../services/accounts/CreateAccount';
import DeleteAccount from '../services/accounts/DeletingAccount';
import UpdateAccount from '../services/accounts/UpdateAccount';
import UserData from '../services/accounts/UserData';
import SignOut from '../services/accounts/SignOut';
import SearchSong from '../services/songsearch';
import PlaylistsForUser from '../services/playlists/PlaylistsForUser';
import FollowPlaylist from '../services/playlists/FollowPlaylist';
import { CreatePlaylist } from '../services/playlists/CreatePlaylist';
import AllPlaylists from '../services/playlists/AllPlaylists';
import RemoveTrack from '../services/playlists/RemoveTrack';
import SendFriendRequest from '../services/friends/SendFriendRequest';
import RequestResponse from '../services/friends/RequestResponse';
import ViewRequests from '../services/friends/ViewRequests';
import DeleteFriends from '../services/friends/DeleteFriends';
import FriendSearch from '../services/friends/FriendSearch';
const dataRetrieval = new UserData;
const sendFriendRequest = new SendFriendRequest;
const requestResponse = new RequestResponse;
const viewFriendData = new ViewRequests;
const deleteFriends = new DeleteFriends;
const createAccount = new CreateAccount;
const searchSong = new SearchSong;
const deleteAccount = new DeleteAccount;
const updateAccount = new UpdateAccount;
const createPlaylist = new CreatePlaylist;
const removeTrack = new RemoveTrack;
const playlistsForUser = new PlaylistsForUser;
const followPlaylist = new FollowPlaylist;
const allPlaylists = new AllPlaylists;
const friendSearch = new FriendSearch;
const logOut = new SignOut;

export default {
    hello: () => 'Hello World',
    test: (input) => {
        return input;
    },
    createAccount: async (input) => {
        return await createAccount.create(input.account)
    },
    verifyAccount: async (email, token) => {
        return await dataRetrieval.verifyAccount(email, token)
    },
    searchSong: async (input) => {
        return await searchSong.getFromItunesAPI(input);
    },
    onChangeSearch: async (input) => {
        return await searchSong.getFromItunesAPI(input);
    },
    loginCheck: async (input) => {
        return await dataRetrieval.loginData(input.username, input.password);
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
        return await createPlaylist.create(input.name, input.creator);
    },
    newTrack: async (input) => {
        console.log(input)
        return await createPlaylist.addToPlaylist(input.username, input.track);
    },
    deleteTrack: async (input) => {
        return await removeTrack.remove(input.username, input.trackInfo);
    },
    updateUser: async (input) => {
        return await updateAccount.update(input.username, input.updateData);
    },
    updateProfilePic: async (input) => {
        return await updateAccount.updatePicture(input.user, input.file);
    },
    updatePassword: async (input) => {
        return await updateAccount.updatePassword(input.username, input.currentPass, input.newPass, input.testPass);
    },
    followPlaylist: async (input) => {
        return await followPlaylist.follow(input.username, input.playlistName);
    },
    unfollowPlaylist: async (input) => {
        return await followPlaylist.unfollow(input.username, input.playlistName);
    },
    playlistsForUser: async (input) => {
        return await playlistsForUser.playlistsFor(input.username);
    },
    allPlaylists: async () => {
        return await allPlaylists.all();
    },
    sendRequest: async (input) => {
        return await sendFriendRequest.FriendRequest(input.requester, input.receiver);
    },
    acceptRequest: async (input) => {
        return await requestResponse.AcceptRequest(input.username, input.friend);
    },
    denyRequest: async (input) => {
        return await requestResponse.DenyRequest(input.username, input.friend);
    },
    viewFriendRequests: async (input) => {
        return await viewFriendData.ViewRequests(input.username);
    },
    viewFriendsList: async (input) => {
        return await viewFriendData.ViewFriends(input.username);
    },
    deleteFriend: async (input) => {
        return await deleteFriends.delete(input.username, input.friend);
    },
    accountSearch: async (input) => {
        return await friendSearch.search(input.username, input.search);
    },
    signOut: async (input) => {
        return await logOut.signOut(input.username, input.date);
    },
    deactivateAccount: async (input) =>{
        return await deleteAccount.deactivateAccount(input.username);
    },
    activateAccount: async (input) => {
        return await deleteAccount.activateAccount(input.username);
    }

}

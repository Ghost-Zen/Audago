"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateAccount_1 = __importDefault(require("../services/accounts/CreateAccount"));
const DeletingAccount_1 = __importDefault(require("../services/accounts/DeletingAccount"));
const UpdateAccount_1 = __importDefault(require("../services/accounts/UpdateAccount"));
const UserData_1 = __importDefault(require("../services/accounts/UserData"));
const SignOut_1 = __importDefault(require("../services/accounts/SignOut"));
const songsearch_1 = __importDefault(require("../services/songsearch"));
const PlaylistsForUser_1 = __importDefault(require("../services/playlists/PlaylistsForUser"));
const FollowPlaylist_1 = __importDefault(require("../services/playlists/FollowPlaylist"));
const CreatePlaylist_1 = require("../services/playlists/CreatePlaylist");
const AllPlaylists_1 = __importDefault(require("../services/playlists/AllPlaylists"));
const RemoveTrack_1 = __importDefault(require("../services/playlists/RemoveTrack"));
const SendFriendRequest_1 = __importDefault(require("../services/friends/SendFriendRequest"));
const RequestResponse_1 = __importDefault(require("../services/friends/RequestResponse"));
const ViewRequests_1 = __importDefault(require("../services/friends/ViewRequests"));
const DeleteFriends_1 = __importDefault(require("../services/friends/DeleteFriends"));
const FriendSearch_1 = __importDefault(require("../services/friends/FriendSearch"));
const dataRetrieval = new UserData_1.default;
const sendFriendRequest = new SendFriendRequest_1.default;
const requestResponse = new RequestResponse_1.default;
const viewFriendData = new ViewRequests_1.default;
const deleteFriends = new DeleteFriends_1.default;
const createAccount = new CreateAccount_1.default;
const searchSong = new songsearch_1.default;
const deleteAccount = new DeletingAccount_1.default;
const updateAccount = new UpdateAccount_1.default;
const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
const removeTrack = new RemoveTrack_1.default;
const playlistsForUser = new PlaylistsForUser_1.default;
const followPlaylist = new FollowPlaylist_1.default;
const allPlaylists = new AllPlaylists_1.default;
const friendSearch = new FriendSearch_1.default;
const logOut = new SignOut_1.default;
exports.default = {
    hello: () => 'Hello World',
    test: (input) => {
        return input;
    },
    createAccount: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield createAccount.create(input);
    }),
    verifyAccount: (email, token) => __awaiter(void 0, void 0, void 0, function* () {
        return yield dataRetrieval.verifyAccount(email, token);
    }),
    searchSong: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield searchSong.getFromItunesAPI(input);
    }),
    onChangeSearch: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield searchSong.getFromItunesAPI(input);
    }),
    loginCheck: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield dataRetrieval.loginData(input.username, input.password);
    }),
    userData: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield dataRetrieval.userData(input.username);
    }),
    deleteUser: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield deleteAccount.delete(input.username);
    }),
    deleteAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield deleteAccount.deleteAll();
    }),
    newPlaylist: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield createPlaylist.create(input.name, input.creator);
    }),
    newTrack: (input) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(input);
        return yield createPlaylist.addToPlaylist(input.username, input.track);
    }),
    deleteTrack: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield removeTrack.remove(input.username, input.trackInfo);
    }),
    updateUser: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield updateAccount.update(input.username, input.updateData);
    }),
    updateProfilePic: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield updateAccount.updatePicture(input.user, input.file);
    }),
    updatePassword: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield updateAccount.updatePassword(input.username, input.currentPass, input.newPass, input.testPass);
    }),
    followPlaylist: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield followPlaylist.follow(input.username, input.playlistName);
    }),
    unfollowPlaylist: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield followPlaylist.unfollow(input.username, input.playlistName);
    }),
    playlistsForUser: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield playlistsForUser.playlistsFor(input.username);
    }),
    allPlaylists: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield allPlaylists.all();
    }),
    sendRequest: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield sendFriendRequest.FriendRequest(input.requester, input.receiver);
    }),
    acceptRequest: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield requestResponse.AcceptRequest(input.username, input.friend);
    }),
    denyRequest: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield requestResponse.DenyRequest(input.username, input.friend);
    }),
    viewFriendRequests: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield viewFriendData.ViewRequests(input.username);
    }),
    viewFriendsList: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield viewFriendData.ViewFriends(input.username);
    }),
    deleteFriend: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield deleteFriends.delete(input.username, input.friend);
    }),
    accountSearch: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield friendSearch.search(input.username, input.search);
    }),
    signOut: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield logOut.signOut(input.username, input.date);
    }),
    deactivateAccount: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield deleteAccount.deactivateAccount(input.username);
    }),
    activateAccount: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield deleteAccount.activateAccount(input.username);
    })
};
//# sourceMappingURL=resolvers.js.map
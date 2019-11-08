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
const songsearch_1 = __importDefault(require("../services/songsearch"));
const PlaylistsForUser_1 = __importDefault(require("../services/playlists/PlaylistsForUser"));
const FollowPlaylist_1 = __importDefault(require("../services/playlists/FollowPlaylist"));
const CreatePlaylist_1 = require("../services/playlists/CreatePlaylist");
const RemoveTrack_1 = __importDefault(require("../services/playlists/RemoveTrack"));
const dataRetrieval = new UserData_1.default;
const createAccount = new CreateAccount_1.default;
const searchSong = new songsearch_1.default;
const deleteAccount = new DeletingAccount_1.default;
const updateAccount = new UpdateAccount_1.default;
const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
const removeTrack = new RemoveTrack_1.default;
const playlistsForUser = new PlaylistsForUser_1.default;
const followPlaylist = new FollowPlaylist_1.default;
const Query = {
    hello: () => 'Hello World',
    test: (input) => {
        console.log(input);
        return input;
    },
    createAccount: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield createAccount.create(input.account);
    }),
    verifytoken: () => {
    },
    searchSong: (input) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield searchSong.getFromItunesAPI(input);
        return { response: result };
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
        return yield createPlaylist.create(input.playlist);
    }),
    newTrack: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield createPlaylist.addToPlaylist(input.track);
    }),
    deleteTrack: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield removeTrack.remove(input.track);
    }),
    updateUser: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield updateAccount.update(input.username, input.account);
    }),
    updatePassword: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield updateAccount.updatePassword(input.username, input.currentPass, input.newPass);
    }),
    followPlaylist: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield followPlaylist.follow(input.username, input.playlistName);
    }),
    unfollowPlaylist: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield followPlaylist.unfollow(input.username, input.playlistName);
    }),
    playlistsForUser: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield playlistsForUser.playlistsFor(input.username);
    })
};
exports.default = Query;
//# sourceMappingURL=resolvers.js.map
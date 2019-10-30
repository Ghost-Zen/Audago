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
const UserData_1 = __importDefault(require("../services/accounts/UserData"));
const UpdateAccount_1 = __importDefault(require("../services/accounts/UpdateAccount"));
const CreatePlaylist_1 = require("../services/playlists/CreatePlaylist");
const createAccount = new CreateAccount_1.default;
const deleteAccount = new DeletingAccount_1.default;
const userData = new UserData_1.default;
const updateAccount = new UpdateAccount_1.default;
const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
class UserApi {
    userSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { firstName, lastName, username, password, email } = req.body;
            let user = {
                firstName,
                lastName,
                username,
                password,
                email,
                image: '',
                active: true,
                timestamp: {
                    created: '',
                    lastSeen: '',
                }
            };
            res.json({
                staus: 'success',
                exists: yield createAccount.create(user)
            });
        });
    }
    deleteUser(req, res) {
        let { username } = req.body;
        deleteAccount.delete(username);
        res.json({
            status: 'success'
        });
    }
    userSignIn(req, res) {
    }
    // async getUserData(req, res) {
    //     const username = req.params.user;
    //     res.json({
    //         status: 'success',
    //         response: await userData.loginData(username)
    //     })
    // }
    editUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { firstName, lastName, username, password, email, image, active, timestamp } = req.body;
            let user = {
                firstName,
                lastName,
                username,
                password,
                email,
                image,
                active,
                timestamp
            };
            yield updateAccount.update(username, user);
            res.json({
                status: 'success'
            });
        });
    }
    createPlaylist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let playlist = {
                name: '2019 House',
                follower_count: 0,
                creator: 'dyllanhope123',
                song_count: 0
            };
            // await createPlaylist.create(playlist);
            yield createPlaylist.addToPlaylist('Middle Child', 'J. Cole', '2019 Rap');
        });
    }
}
exports.default = UserApi;
//# sourceMappingURL=user_api.js.map
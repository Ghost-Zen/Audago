"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateAccount_1 = __importDefault(require("../services/accounts/CreateAccount"));
const createAccount = new CreateAccount_1.default;
class UserApi {
    userSignUp(req, res) {
        let { firstName, lastName, username, password, email } = req.body;
        let user = {
            firstName,
            lastName,
            username,
            password,
            email,
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            playlists: ['house']
        };
        createAccount.create(user);
    }
    userSignIn(req, res) {
    }
    getUserData(req, res) {
        res.json({
            status: 'Dummy Data',
            response: { firstname: 'John', lastname: 'Doe', username: 'johndoe123' }
        });
    }
    editUserData(req, res) {
    }
}
exports.default = UserApi;
//# sourceMappingURL=user_api.js.map
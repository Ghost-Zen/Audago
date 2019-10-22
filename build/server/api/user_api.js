"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateAccount_1 = __importDefault(require("../services/accounts/CreateAccount"));
const DeletingAccount_1 = __importDefault(require("../services/accounts/DeletingAccount"));
const createAccount = new CreateAccount_1.default;
const deleteAccount = new DeletingAccount_1.default;
class UserApi {
    userSignUp(req, res) {
        let user = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe123',
            password: '12345',
            email: 'johndoe@gmail.com',
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
    deleteUser(req, res) {
        let user = 'johndoe123';
        deleteAccount.delete(user);
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
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
const Accounts_1 = __importDefault(require("../models/Accounts"));
class UserData {
    loginData(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = false;
            let data = { username: '', password: '', email: '' };
            if (username.trim()) {
                yield Accounts_1.default.findOne({ username: username }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1 }) // searching for user's data only want the username, password and email
                    .then(res => {
                    if (res) {
                        data.username = res.username;
                        data.password = res.password;
                        data.email = res.email;
                        found = true;
                    }
                });
                if (found) {
                    if (password === data.password) {
                        return { response: `You logged in successfully!`, status: true };
                    }
                    else {
                        return { response: `Password incorrect`, status: false };
                    }
                }
                else {
                    return { response: `Username ${username} not found`, status: false }; //if the user's data isn't found then return an error
                }
            }
            else {
                return { response: `Please enter a username`, status: false };
            }
        });
    }
    ;
}
exports.default = UserData;
//# sourceMappingURL=UserData.js.map
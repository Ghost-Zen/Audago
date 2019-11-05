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
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserData {
    loginData(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = false;
            let data = { username: '', password: '', email: '' };
            if (username.trim()) {
                yield Accounts_1.default.findOne({ username: username }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1 }) // searching for user's data only want the username, password and email
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    if (res) { //if a document is found with the user name, load data for check
                        data.username = res.username;
                        data.password = res.password;
                        data.email = res.email;
                        found = true;
                    }
                    else { //if no document is found for username, check if an email was entered
                        yield Accounts_1.default.findOne({ email: email }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1 })
                            .then(res => {
                            if (res) { //if a document is found for email, load data for check
                                data.username = res.username;
                                data.password = res.password;
                                data.email = res.email;
                                found = true;
                            }
                        });
                    }
                }));
                const match = yield bcrypt_1.default.compare(password, data.password);
                // Returning separate from code as returns don't work in a promise
                if (found) {
                    if (match) {
                        return { response: `You logged in successfully!`, status: true };
                    }
                    else {
                        return { response: `Password incorrect`, status: false };
                    }
                }
                else {
                    return { response: `Username ${username} not found`, status: false };
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
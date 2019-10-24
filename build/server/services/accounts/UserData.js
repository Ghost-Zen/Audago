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
    loginData(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = false;
            let data = { username: '', password: '', email: '' };
            // searching for user's data only want the username, password and email
            yield Accounts_1.default.findOne({ username: username }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1 })
                .then(res => {
                //if a record was found with that username then return the user's data
                if (res) {
                    data.username = res.username;
                    data.password = res.password;
                    data.email = res.email;
                    found = true;
                }
            });
            if (found) {
                return data;
            }
            else {
                //if the user's data isn't found then return an error
                return `User "${username}" not found`;
            }
        });
    }
    ;
}
exports.default = UserData;
//# sourceMappingURL=UserData.js.map
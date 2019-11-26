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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EmailService_1 = __importDefault(require("../utils/EmailService"));
const email_service = new EmailService_1.default;
class UserData {
    verifyAccount(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Accounts_1.default.findOne({ email: email }, { '_id': 0, 'status': 1 })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                if (res) {
                    if (res.status === token) {
                        yield Accounts_1.default.updateOne({ email }, { status: 'verified' });
                    }
                }
                else {
                    return { response: `User by email ${email} not found`, status: '404' };
                }
            }));
        });
    }
    userData(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = false;
            let data = { firstName: '', lastName: '', email: '', image: '', timeStamp: { created: '', lastSeen: '' } };
            yield Accounts_1.default.findOne({ username })
                .then(res => {
                if (res) { //check if account is in document
                    data.firstName = res.firstName;
                    data.lastName = res.lastName;
                    data.email = res.email;
                    data.image = res.image;
                    data.timeStamp = res.timestamp;
                    found = true;
                }
            });
            if (found) {
                return { response: 'User found', user: data, status: true };
            }
            else {
                return { response: `Username ${username} not found`, user: data, status: false };
            }
        });
    }
    loginData(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = false;
            let timestamp;
            let data = { username: '' };
            if (username.trim()) {
                yield Accounts_1.default.findOne({ username: username }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1, 'status': 1, 'timestamp': 1 }) // searching for user's data only want the username, password and email
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    if (res) { //if a document is found with the user name, load data for check
                        data.username = res.username;
                        data.status = res.status;
                        timestamp = res.timestamp;
                        found = true;
                    }
                    else { //if no document is found for username, check if an email was entered
                        yield Accounts_1.default.findOne({ email: username }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1, 'status': 1, 'timestamp': 1 })
                            .then(res => {
                            if (res) { //if a document is found for email, load data for check
                                data.username = res.username;
                                data.status = res.status;
                                timestamp = res.timestamp;
                                found = true;
                            }
                        });
                    }
                }));
                const match = yield bcrypt_1.default.compare(password, data.password);
                // Returning separate from code as returns don't work in a promise
                if (found) {
                    if (match) {
                        // if(data.status === 'verified'){
                        let token = jsonwebtoken_1.default.sign({ data }, process.env.JWT_SECRET, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        timestamp.lastSeen = 'online';
                        yield Accounts_1.default.updateOne({ username: data.username }, { timestamp });
                        return { response: token, username: data.username, status: true };
                        // }else{
                        //   let emailUserAgain = email_service.verifyEmail(data.email,data.status) //email user everytime he forgets to verify and tries to login.
                        //   return { response: `Account not verified, check your emails`, status: false }; //added email verification link just for dev purposes
                        // }
                    }
                }
                return { response: 'Please enter the correct username and password', status: false };
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
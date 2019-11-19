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
const random_gen_1 = __importDefault(require("../utils/random_gen"));
const EmailService_1 = __importDefault(require("../utils/EmailService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const email_service = new EmailService_1.default;
const random_key = new random_gen_1.default;
class CreateAccount {
    create(account) {
        return __awaiter(this, void 0, void 0, function* () {
            let strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            if (account.firstName && account.lastName && account.password && account.email && account.username) {
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let date = new Date();
                let created = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
                let exists = false;
                let status = random_key.generate(30);
                account.timestamp = { created: "", lastSeen: "" };
                account.timestamp.created = created;
                account.timestamp.lastSeen = created;
                account.status = status;
                let passTest = strongPassRegex.test(account.password);
                passTest = true; //for testing purposes
                if (passTest) {
                    yield bcrypt_1.default.hash(account.password, saltRounds).then(function (hash) {
                        account.password = hash;
                    });
                    let user = new Accounts_1.default(account);
                    yield Accounts_1.default.findOne({ username: user.username }) //search for username (unique field) in DB
                        .then(res => {
                        if (res) { //checking if there was a response for the user (if that account doesn't exists)
                            exists = true;
                        }
                    });
                    // Returning separate from code as returns don't work in a promise
                    if (!exists) {
                        yield user.save();
                        let verifyLink = yield email_service.verifyEmail(user.email, user.status); // will remove once real email account is added
                        return { response: `Account created, verify@ ${verifyLink}`, status: true }; //if account created successfully return this message
                    }
                    else {
                        return { response: `Username ${account.username} already exists`, status: false }; //return whether the account exists or not
                    }
                }
                else {
                    return { response: 'Your password is too weak', status: false };
                }
            }
            else {
                return { response: 'Please fill out all the fields', status: false };
            }
        });
    }
}
exports.default = CreateAccount;
//# sourceMappingURL=CreateAccount.js.map
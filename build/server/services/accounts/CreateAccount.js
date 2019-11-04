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
class CreateAccount {
    create(account) {
        return __awaiter(this, void 0, void 0, function* () {
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let date = new Date();
            let created = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            let exists = false;
            account.timestamp = { created: "", lastSeen: "" };
            account.timestamp.created = created;
            account.timestamp.lastSeen = created;
            let user = new Accounts_1.default(account);
            yield Accounts_1.default.findOne({ username: user.username }) //search for username (unique field) in DB
                .then(res => {
                if (res) { //checking if their was a response for the user (if that account doesn't exists)
                    exists = true;
                }
            });
            if (!exists) {
                yield user.save();
                return { response: `Account created`, status: true }; //if account created successfully return this message 
            }
            else {
                return { response: `Username ${account.username} already exists`, status: false }; //return whether the account exists or not
            }
        });
    }
}
exports.default = CreateAccount;
//# sourceMappingURL=CreateAccount.js.map
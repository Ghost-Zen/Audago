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
            let exists = false;
            let user = new Accounts_1.default(account);
            //search for username (unique field) in DB
            yield Accounts_1.default.find({ username: user.username })
                //returns array, if empty then the record doesn't exist else the username is already in use
                .then(res => {
                //checking if their was a response for the user (if that account doesn't exists)
                if (res.length > 0) {
                    exists = true;
                }
            });
            if (!exists) {
                //if account is new, add it
                yield user.save();
            }
            //return whether the account exists or not, reference for when we want to return an error
            return exists;
        });
    }
}
exports.default = CreateAccount;
//# sourceMappingURL=CreateAccount.js.map
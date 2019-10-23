"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Accounts_1 = __importDefault(require("../models/Accounts"));
class CreateAccount {
    create(account) {
        let user = new Accounts_1.default(account);
        user.save();
    }
}
exports.default = CreateAccount;
//# sourceMappingURL=CreateAccount.js.map
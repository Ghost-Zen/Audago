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
class DeleteAccount {
    //deleting specific users
    delete(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Accounts_1.default.deleteOne({ username: username });
            return { response: `User ${username} deleted successfully`, status: true };
        });
    }
    //deleting all users
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Accounts_1.default.deleteMany({});
            return { response: `All users deleted!`, status: true };
        });
    }
    deactivateAccount(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Accounts_1.default.findOne({ username });
            if (res) {
                yield Accounts_1.default.updateOne({ username }, { active: false });
                return { response: 'Account deactivated', status: true };
            }
            else {
                return { response: 'Account not found', status: false };
            }
        });
    }
    activateAccount(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Accounts_1.default.findOne({ username });
            if (res) {
                yield Accounts_1.default.updateOne({ username }, { active: true });
                return { response: 'Account activated', status: true };
            }
            else {
                return { response: 'Account not found', status: false };
            }
        });
    }
}
exports.default = DeleteAccount;
//# sourceMappingURL=DeletingAccount.js.map
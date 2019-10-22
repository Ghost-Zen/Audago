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
    delete(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Accounts_1.default.deleteOne({ username: username });
            console.log(`${username} was deleted!`);
        });
    }
}
exports.default = DeleteAccount;
//   const account: Iaccounts = new Accounts({
//     firstName: 'Dyllan',
//     lastName: 'Hope',
//     username: 'dyllanhope123',
//     password: '12345',
//     email: 'dyllanjhope@gmail.com',
//     image: '',
//     active: true,
//     timestamp: {
//         created: 'date',
//         lastSeen: 'date'
//     },
//     playlists: ['trance','chill','rap']
// });
//   await account.save();
//   console.log("done!");
//# sourceMappingURL=DeletingAccount.js.map
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
const CreateAccount_1 = __importDefault(require("../services/accounts/CreateAccount"));
const DeletingAccount_1 = __importDefault(require("../services/accounts/DeletingAccount"));
const UpdateAccount_1 = __importDefault(require("../services/accounts/UpdateAccount"));
const UserData_1 = __importDefault(require("../services/accounts/UserData"));
const songsearch_1 = __importDefault(require("../services/songsearch"));
const userData = new UserData_1.default();
const createAccount = new CreateAccount_1.default;
const searchSong = new songsearch_1.default();
const deleteAccount = new DeletingAccount_1.default;
const updateAccount = new UpdateAccount_1.default;
const Query = {
    hello: () => 'Hello World',
    test: () => 'Test Success, GraphQL server is up & running !!',
    createAccount: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield createAccount.create(input);
    }),
    searchSong: (input) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(input);
        let result = yield searchSong.getFromItunesAPI(input);
<<<<<<< HEAD
        console.log(result);
        return { Search: result };
=======
        return { search: result };
>>>>>>> 89973c2a33eecfe4e38932c99c341c2af4e26f8f
    }),
    loginCheck: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userData.loginData(input.username, input.password, input.email);
    }),
    deleteUser: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield deleteAccount.delete(input.username);
    }),
    deleteAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield deleteAccount.deleteAll();
    }),
    updateUser: (input) => __awaiter(void 0, void 0, void 0, function* () {
        return yield updateAccount.update(input.username, input.account);
    })
};
exports.default = Query;
//# sourceMappingURL=resolvers.js.map
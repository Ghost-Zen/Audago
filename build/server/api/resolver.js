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
const songsearch_1 = __importDefault(require("../services/songsearch"));
const UserData_1 = __importDefault(require("../services/accounts/UserData"));
const userData = new UserData_1.default();
const Query = {
    hello: () => 'Hello World',
    test: () => 'Test Success, GraphQL server is up & running !!',
    createAccount: (input) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(input)
        const createAccount = new CreateAccount_1.default;
        let response = yield createAccount.create(input);
        if (!response) {
            return { response: `Account created` };
        }
        else {
            return { response: `Username ${input.username} already exists` };
        }
        // commented out must fix schema for graphql *timestamp
    }),
    searchSong: (input) => {
        console.log(input);
        const searchSong = new songsearch_1.default();
        searchSong.getFromItunesAPI(input);
    },
    loginCheck: (input) => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield userData.loginData(input.username);
        if (response) {
            if (response.password === input.password) {
                return { response: `You logged in successfully!` };
            }
            else {
                return { response: `Password incorrect` };
            }
        }
        else {
            return { response: `Username ${input.username} not found` };
        }
    })
};
exports.default = Query;
//# sourceMappingURL=resolver.js.map
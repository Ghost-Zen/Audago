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
const CreateAccount_1 = __importDefault(require("../server/services/accounts/CreateAccount"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const createAccount = new CreateAccount_1.default;
    let user = {
        firstName: 'Dyllan',
        lastName: 'Hope',
        username: 'dyllanhope123',
        password: 'Fwgr123#',
        email: 'dyllanhope@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status: ''
    };
    yield createAccount.create(user);
    user = {
        firstName: 'John',
        lastName: 'Hope',
        username: 'johnhope123',
        password: 'Fwgr123#',
        email: 'johnhope@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status: ''
    };
    yield createAccount.create(user);
    user = {
        firstName: 'Michael',
        lastName: 'Dollman',
        username: 'Mikey',
        password: 'Fwgr123#',
        email: 'mikey@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status: ''
    };
    yield createAccount.create(user);
    user = {
        firstName: 'Chris',
        lastName: 'Green',
        username: 'ChrisCross',
        password: 'Fwgr123#',
        email: 'chris_green@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status: ''
    };
    yield createAccount.create(user);
    user = {
        firstName: 'Mark',
        lastName: 'Anderson',
        username: 'Sharkykzn',
        password: 'Fwgr123#',
        email: 'markganderson@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status: ''
    };
    yield createAccount.create(user);
    user = {
        firstName: 'Daniel',
        lastName: 'Minter',
        username: 'danielminter123',
        password: 'Fwgr123#',
        email: 'danielminter@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status: ''
    };
    yield createAccount.create(user);
});
//# sourceMappingURL=accountsPremade.js.map
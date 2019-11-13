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
const assert_1 = __importDefault(require("assert"));
const Accounts_1 = __importDefault(require("../server/services/models/Accounts"));
const mongoose_1 = __importDefault(require("mongoose"));
const CreateAccount_1 = __importDefault(require("../server/services/accounts/CreateAccount"));
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';
describe('Testing the create account functionality', () => {
    before(function (done) {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.set('useCreateIndex', true);
        mongoose_1.default.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
        const db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            done();
        });
    });
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Accounts_1.default.deleteMany({});
    }));
    after(() => {
        mongoose_1.default.connection.close();
    });
    it('Should return that "Dyllan" was added as a new account', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        let user = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        };
        yield createAccount.create(user);
        Accounts_1.default.find({}, { '_id': 0, 'username': 1 })
            .then((accounts) => {
            assert_1.default.strict.equal(accounts[0].username, 'dyllanhope123');
        });
    }));
    it('Should return that "Dyllan & Daniel" were added as new accounts', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        let user = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        };
        yield createAccount.create(user);
        user = {
            firstName: 'Daniel',
            lastName: 'Minter',
            username: 'danielminter123',
            password: 'Fwgr123#',
            email: 'danielminter@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        };
        yield createAccount.create(user);
        Accounts_1.default.find({})
            .then((accounts) => {
            assert_1.default.strict.equal(accounts[0].username, 'dyllanhope123');
            assert_1.default.strict.equal(accounts[1].username, 'danielminter123');
        });
    }));
    it('Should return that "Dyllan" is already an existing account', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        let user = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        };
        let status = yield createAccount.create(user);
        assert_1.default.strict.deepEqual(status, { response: `Account created`, status: true });
        user = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        };
        status = yield createAccount.create(user);
        assert_1.default.strict.deepEqual(status, { response: `Username dyllanhope123 already exists`, status: false });
    }));
    it('Should return an error message that all the fields need to be filled out', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        let user = {
            firstName: '',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        };
        let status = yield createAccount.create(user);
        assert_1.default.strict.deepEqual(status, { response: 'Please fill out all the fields', status: false });
    }));
    it('Should return that the entered pasword is too weak', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        let user = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr12#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        };
        let response = yield createAccount.create(user);
        assert_1.default.strict.deepEqual(response, { response: 'Your password is too weak', status: false });
    }));
});
//# sourceMappingURL=CreateAccount.test.js.map
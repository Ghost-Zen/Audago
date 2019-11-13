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
const UserData_1 = __importDefault(require("../server/services/accounts/UserData"));
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';
describe('Testing the UserData functionality', () => {
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
    describe('Login service testing', () => {
        it("Should return with that Michael has logged in successfully and returns a token with true status", () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccount = new CreateAccount_1.default;
            const userData = new UserData_1.default;
            let user = {
                firstName: 'Micheal',
                lastName: 'Dollman',
                username: 'michaeldollman123',
                password: 'Fwgr123#',
                email: 'michaeldollman@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            };
            yield createAccount.create(user);
            let response = yield userData.loginData('michaeldollman123', 'Fwgr123#');
            assert_1.default.strict.deepEqual(response.status, true);
        }));
        it("Should return with an error that John's data could not be found, as the account wasn't made", () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccount = new CreateAccount_1.default;
            const userData = new UserData_1.default;
            let user = {
                firstName: 'Michael',
                lastName: 'Dollman',
                username: 'michaeldollman123',
                password: 'Fwgr123#',
                email: 'michaeldollman@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            };
            yield createAccount.create(user);
            assert_1.default.strict.deepEqual(yield userData.loginData('johnhope123', 'Fwgr123#'), { response: 'Username johnhope123 not found', status: false });
        }));
        it("Should return with an error that the entered password is  incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccount = new CreateAccount_1.default;
            const userData = new UserData_1.default;
            let user = {
                firstName: 'Michael',
                lastName: 'Dollman',
                username: 'michaeldollman123',
                password: 'Fwgr123#',
                email: 'michaeldollman@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            };
            yield createAccount.create(user);
            assert_1.default.strict.deepEqual(yield userData.loginData('michaeldollman123', '1245'), { response: 'Password incorrect', status: false });
        }));
    });
    describe('User data return testing', () => {
        it("Should return all dyllanhope123's data from DB", () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccount = new CreateAccount_1.default;
            const userData = new UserData_1.default;
            let user = {
                firstName: 'Dyllan',
                lastName: 'Hope',
                username: 'dyllanhope123',
                password: 'Fwgr123#',
                email: 'dyllan@gmail.com',
                image: 'image@picture.url',
                active: true,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            };
            yield createAccount.create(user);
            let response = yield userData.userData('dyllanhope123');
            assert_1.default.deepEqual(response, {
                response: 'User found',
                user: {
                    firstName: 'Dyllan', lastName: 'Hope', email: 'dyllan@gmail.com', image: 'image@picture.url', timeStamp: { $init: true, created: "13 November 2019", lastSeen: "13 November 2019" }
                },
                status: true
            });
        }));
        it("Should return that johnhope123 wasn't found in the DB", () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccount = new CreateAccount_1.default;
            const userData = new UserData_1.default;
            let user = {
                firstName: 'Dyllan',
                lastName: 'Hope',
                username: 'dyllanhope123',
                password: 'Fwgr123#',
                email: 'dyllan@gmail.com',
                image: 'image@picture.url',
                active: true,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            };
            yield createAccount.create(user);
            let response = yield userData.userData('johnhope123');
            assert_1.default.strict.deepEqual(response, {
                response: 'Username johnhope123 not found',
                user: { firstName: '', lastName: '', email: '', image: '', timeStamp: { created: "", lastSeen: "" } },
                status: false
            });
        }));
    });
});
//# sourceMappingURL=UserData.test.js.map
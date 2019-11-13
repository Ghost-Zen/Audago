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
const UpdateAccount_1 = __importDefault(require("../server/services/accounts/UpdateAccount"));
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';
describe('Testing the update account functionality', () => {
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
    it("Should return that Dyllan's email has been updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        const updateAccount = new UpdateAccount_1.default;
        let user = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: '12345',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        };
        yield createAccount.create(user);
        let updatedUser = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            email: 'dyllan@gmail.com',
        };
        yield updateAccount.update('dyllanhope123', updatedUser);
        Accounts_1.default.find({}, { '_id': 0, 'email': 1 })
            .then((accounts) => {
            assert_1.default.strict.equal(accounts[0].email, 'dyllan@gmail.com');
        });
    }));
    describe('User data changing testing', () => {
        it("Should return that Chris's first and last name has been updated", () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccount = new CreateAccount_1.default;
            const updateAccount = new UpdateAccount_1.default;
            let user = {
                firstName: 'Chris',
                lastName: 'Green',
                username: 'chrisgreen123',
                password: '12345',
                email: 'chrisgreen@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            };
            yield createAccount.create(user);
            let updatedUser = {
                firstName: 'Christopher',
                lastName: 'Greenings',
                email: 'chrisgreen@gmail.com',
            };
            yield updateAccount.update('chrisgreen123', updatedUser);
            Accounts_1.default.findOne({}, { '_id': 0, 'firstName': 1, 'lastName': 1 })
                .then((accounts) => {
                assert_1.default.strict.equal(accounts.firstName, 'Christopher');
                assert_1.default.strict.equal(accounts.lastName, 'Greenings');
            });
        }));
        it("Should return that Chris's email has been changed successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccount = new CreateAccount_1.default;
            const updateAccount = new UpdateAccount_1.default;
            let user = {
                firstName: 'Chris',
                lastName: 'Green',
                username: 'chrisgreen123',
                password: '12345',
                email: 'chrisgreen@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            };
            yield createAccount.create(user);
            let updatedUser = {
                firstName: 'Chris',
                lastName: 'Green',
                email: 'chris@gmail.com',
            };
            yield updateAccount.update('chrisgreen123', updatedUser);
            Accounts_1.default.findOne({}, { '_id': 0, 'email': 1 })
                .then((accounts) => {
                assert_1.default.strict.equal(accounts.email, 'chris@gmail.com');
            });
        }));
    });
    describe('Password changing testing', () => {
        it("Should return that John's password was successfully changed", () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccount = new CreateAccount_1.default;
            const updateAccount = new UpdateAccount_1.default;
            let user = {
                firstName: 'John',
                lastName: 'Hope',
                username: 'johnhope123',
                password: '12345',
                email: 'johnhope@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            };
            yield createAccount.create(user);
            yield updateAccount.updatePassword('johnhope123', '12345', 'House123', 'House123');
            let response = yield updateAccount.updatePassword('johnhope123', 'House123', '12345', '12345');
            assert_1.default.strict.deepEqual(response, { response: 'Password updated', status: true });
        }));
        it("Should return that dyllanhope123 was not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccount = new CreateAccount_1.default;
            const updateAccount = new UpdateAccount_1.default;
            let user = {
                firstName: 'John',
                lastName: 'Hope',
                username: 'johnhope123',
                password: '12345',
                email: 'johnhope@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            };
            yield createAccount.create(user);
            let response = yield updateAccount.updatePassword('dyllanhope123', '12345', 'House123', 'House123');
            assert_1.default.strict.deepEqual(response, { response: 'Username dyllanhope123 not found', status: false });
        }));
        it("Should return that the entered password was incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccount = new CreateAccount_1.default;
            const updateAccount = new UpdateAccount_1.default;
            let user = {
                firstName: 'John',
                lastName: 'Hope',
                username: 'johnhope123',
                password: '12345',
                email: 'johnhope@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            };
            yield createAccount.create(user);
            let response = yield updateAccount.updatePassword('johnhope123', 'car', 'House123', 'House123');
            assert_1.default.strict.deepEqual(response, { response: 'Password incorrect', status: false });
        }));
        it("Should return that the confirmation and new passwords do not match", () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccount = new CreateAccount_1.default;
            const updateAccount = new UpdateAccount_1.default;
            let user = {
                firstName: 'John',
                lastName: 'Hope',
                username: 'johnhope123',
                password: '12345',
                email: 'johnhope@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            };
            yield createAccount.create(user);
            let response = yield updateAccount.updatePassword('johnhope123', 'car', 'House123', '12345');
            assert_1.default.strict.deepEqual(response, {
                response: 'Your New and Confirmation passwords do not match',
                status: false
            });
        }));
    });
});
//# sourceMappingURL=UpdateAccount.test.js.map
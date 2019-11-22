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
const UpdateAccount_1 = __importDefault(require("../server/services/accounts/UpdateAccount"));
const accountsPremade_1 = __importDefault(require("./accountsPremade"));
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
        yield accountsPremade_1.default();
    }));
    after(() => {
        mongoose_1.default.connection.close();
    });
    describe('User data changing testing', () => {
        it("Should return that Chris's first and last name has been updated", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateAccount = new UpdateAccount_1.default;
            let updatedUser = {
                firstName: 'Christopher',
                lastName: 'Greenings',
                email: 'chrisgreen@gmail.com',
            };
            yield updateAccount.update('ChrisCross', updatedUser);
            let res = yield Accounts_1.default.findOne({ username: 'ChrisCross' });
            let name = res.firstName + ' ' + res.lastName;
            assert_1.default.equal(name, 'Christopher Greenings');
        }));
        it("Should return that Chris's email has been changed successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateAccount = new UpdateAccount_1.default;
            let updatedUser = {
                firstName: 'Chris',
                lastName: 'Green',
                email: 'chris@gmail.com',
            };
            yield updateAccount.update('ChrisCross', updatedUser);
            let res = yield Accounts_1.default.findOne({ username: 'ChrisCross' });
            assert_1.default.equal(res.email, 'chris@gmail.com');
        }));
    });
    describe('Password changing testing', () => {
        it("Should return that John's password was successfully changed", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateAccount = new UpdateAccount_1.default;
            yield updateAccount.updatePassword('johnhope123', 'Fwgr123#', 'Kill@manjar0', 'Kill@manjar0');
            let response = yield updateAccount.updatePassword('johnhope123', 'Kill@manjar0', 'T3ch9%!(', 'T3ch9%!(');
            assert_1.default.strict.deepEqual(response, { response: 'Password updated', status: true });
        }));
        it("Should return that vuyo_ma2 was not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateAccount = new UpdateAccount_1.default;
            let response = yield updateAccount.updatePassword('vuyo_ma2', 'Fwgr123#', 'T3ch9%!(', 'T3ch9%!(');
            assert_1.default.strict.deepEqual(response, { response: 'Username vuyo_ma2 not found', status: false });
        }));
        it("Should return that the entered password was incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateAccount = new UpdateAccount_1.default;
            let response = yield updateAccount.updatePassword('johnhope123', 'car', 'T3ch9%!(', 'T3ch9%!(');
            assert_1.default.strict.deepEqual(response, { response: 'Password incorrect', status: false });
        }));
        it("Should return that the confirmation and new passwords do not match", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateAccount = new UpdateAccount_1.default;
            let response = yield updateAccount.updatePassword('johnhope123', 'car', 'House123', 'Fwgr123#');
            assert_1.default.strict.deepEqual(response, {
                response: 'Your New and Confirmation passwords do not match',
                status: false
            });
        }));
        it("Should return that the new password is too weak", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateAccount = new UpdateAccount_1.default;
            let response = yield updateAccount.updatePassword('johnhope123', 'Fwgr123#', 'House123', 'House123');
            assert_1.default.strict.deepEqual(response, { response: 'The entered password is too weak', status: false });
        }));
    });
});
//# sourceMappingURL=UpdateAccount.test.js.map
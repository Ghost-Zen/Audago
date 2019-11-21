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
const DeletingAccount_1 = __importDefault(require("../server/services/accounts/DeletingAccount"));
const accountsPremade_1 = __importDefault(require("./accountsPremade"));
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';
describe('Testing the delete account functionality', () => {
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
    it('Should return an empty array after using the "deleteAll" function', () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteAccount = new DeletingAccount_1.default;
        yield deleteAccount.deleteAll();
        Accounts_1.default.find({})
            .then((accounts) => {
            assert_1.default.strict.deepEqual(accounts, []);
        });
    }));
    it('Should return an array with only "Daniel" as Dyllans account was deleted separately', () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteAccount = new DeletingAccount_1.default;
        yield deleteAccount.delete('dyllanhope123');
        let res = yield Accounts_1.default.findOne({ username: 'dyllanhope123' });
        assert_1.default.strict.deepEqual(res, null);
    }));
});
//# sourceMappingURL=DeleteAccount.test.js.map
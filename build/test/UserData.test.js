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
const UserData_1 = __importDefault(require("../server/services/accounts/UserData"));
const accountsPremade_1 = __importDefault(require("./accountsPremade"));
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
        yield accountsPremade_1.default();
    }));
    after(() => {
        mongoose_1.default.connection.close();
    });
    describe('Login service testing', () => {
        // it("Should return with that Michael has logged in successfully and returns a token with true status", async () => {
        //     const createAccount = new CreateAccount;
        //     const userData = new UserData;
        //     let user: Iaccounts = {
        //         firstName: 'Micheal',
        //         lastName: 'Dollman',
        //         username: 'michaeldollman123',
        //         password: 'Fwgr123#',
        //         email: 'michaeldollman@gmail.com',
        //         image: '',
        //         active: false,
        //         timestamp: {
        //             created: 'date',
        //             lastSeen: 'date'
        //         },
        //         status:''
        //     }
        //     await createAccount.create(user);
        //     let response = await userData.loginData('michaeldollman123', 'Fwgr123#')
        //     assert.strict.deepEqual(response.status, true);
        // });
        it("Should return with an error that Vuyo's data could not be found, as the account wasn't made", () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = new UserData_1.default;
            assert_1.default.strict.deepEqual(yield userData.loginData('vuyo_ma2', 'Fwgr123#'), { response: 'Username vuyo_ma2 not found', status: false });
        }));
        it("Should return with an error that the entered password is  incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = new UserData_1.default;
            assert_1.default.strict.deepEqual(yield userData.loginData('Mikey', '1245'), { response: 'Password incorrect', status: false });
        }));
    });
    describe('User data return testing', () => {
        it("Should return all dyllanhope123's data from DB", () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = new UserData_1.default;
            let response = yield userData.userData('dyllanhope123');
            assert_1.default.equal(response.response, 'User found');
        }));
        it("Should return that vuyo_ma2 wasn't found in the DB", () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = new UserData_1.default;
            let response = yield userData.userData('vuyo_ma2');
            assert_1.default.strict.deepEqual(response, {
                response: 'Username vuyo_ma2 not found',
                user: { firstName: '', lastName: '', email: '', image: '', timeStamp: { created: "", lastSeen: "" } },
                status: false
            });
        }));
    });
});
//# sourceMappingURL=UserData.test.js.map
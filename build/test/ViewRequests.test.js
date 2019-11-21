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
const mongoose_1 = __importDefault(require("mongoose"));
const Accounts_1 = __importDefault(require("../server/services/models/Accounts"));
const Friends_1 = __importDefault(require("../server/services/models/Friends"));
const SendFriendRequest_1 = __importDefault(require("../server/services/friends/SendFriendRequest"));
const AcceptRequest_1 = __importDefault(require("../server/services/friends/AcceptRequest"));
const ViewRequests_1 = __importDefault(require("../server/services/friends/ViewRequests"));
const accountsPremade_1 = __importDefault(require("./accountsPremade"));
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';
describe('Testing the ViewRequest functionality', () => {
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
        yield Friends_1.default.deleteMany({});
        yield Accounts_1.default.deleteMany({});
    }));
    after(() => {
        mongoose_1.default.connection.close();
    });
    it('Should return all the unconfirmed friend requests for johnhope123 (3 requests)', () => __awaiter(void 0, void 0, void 0, function* () {
        let friendRequest = new SendFriendRequest_1.default;
        let viewRequests = new ViewRequests_1.default;
        yield friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        yield friendRequest.FriendRequest('Mikey', 'johnhope123');
        yield friendRequest.FriendRequest('Sharkykzn', 'johnhope123');
        yield friendRequest.FriendRequest('johnhope123', 'ChrisCross');
        let response = yield viewRequests.ViewRequests('johnhope123');
        assert_1.default.deepEqual(response, {
            response: 'Friends found',
            requesters: ['dyllanhope123', 'Mikey', 'Sharkykzn'],
            status: true
        });
    }));
    it('Should return that Mikey has no requests', () => __awaiter(void 0, void 0, void 0, function* () {
        let friendRequest = new SendFriendRequest_1.default;
        let viewRequests = new ViewRequests_1.default;
        yield friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        yield friendRequest.FriendRequest('Mikey', 'johnhope123');
        yield friendRequest.FriendRequest('Sharkykzn', 'johnhope123');
        yield friendRequest.FriendRequest('johnhope123', 'ChrisCross');
        let response = yield viewRequests.ViewRequests('Mikey');
        assert_1.default.deepEqual(response, { response: 'No requests', status: false });
    }));
    it('Should return all the confirmed and active friends of John', () => __awaiter(void 0, void 0, void 0, function* () {
        let friendRequest = new SendFriendRequest_1.default;
        let acceptRequest = new AcceptRequest_1.default;
        let viewRequests = new ViewRequests_1.default;
        yield accountsPremade_1.default();
        yield friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        yield acceptRequest.AcceptRequest('johnhope123', 'dyllanhope123');
        yield friendRequest.FriendRequest('Mikey', 'johnhope123');
        yield acceptRequest.AcceptRequest('johnhope123', 'Mikey');
        yield friendRequest.FriendRequest('Sharkykzn', 'johnhope123');
        yield acceptRequest.AcceptRequest('johnhope123', 'Sharkykzn');
        yield friendRequest.FriendRequest('johnhope123', 'ChrisCross');
        yield acceptRequest.AcceptRequest('ChrisCross', 'johnhope123');
        yield Accounts_1.default.updateOne({ username: 'Mikey' }, { active: false });
        yield Accounts_1.default.updateOne({ username: 'ChrisCross' }, { active: false });
        let response = yield viewRequests.ViewFriends('johnhope123');
        assert_1.default.deepEqual(response, {
            response: 'Friends found',
            activeFriends: ['dyllanhope123', 'Sharkykzn'],
            status: true
        });
    }));
});
//# sourceMappingURL=ViewRequests.test.js.map
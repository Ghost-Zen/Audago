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
const RequestResponse_1 = __importDefault(require("../server/services/friends/RequestResponse"));
const ViewRequests_1 = __importDefault(require("../server/services/friends/ViewRequests"));
const accountsPremade_1 = __importDefault(require("./accountsPremade"));
const DeleteFriends_1 = __importDefault(require("../server/services/friends/DeleteFriends"));
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';
describe('Testing the DeletingFriends functionality', () => {
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
        yield accountsPremade_1.default();
    }));
    after(() => {
        mongoose_1.default.connection.close();
    });
    it('Should return that the friendship between john and dyllan was deleted', () => __awaiter(void 0, void 0, void 0, function* () {
        let friendRequest = new SendFriendRequest_1.default;
        let acceptRequest = new RequestResponse_1.default;
        let viewRequests = new ViewRequests_1.default;
        let deleteFriends = new DeleteFriends_1.default;
        yield friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        yield acceptRequest.AcceptRequest('johnhope123', 'dyllanhope123');
        yield friendRequest.FriendRequest('Mikey', 'johnhope123');
        yield acceptRequest.AcceptRequest('johnhope123', 'Mikey');
        yield friendRequest.FriendRequest('Sharkykzn', 'johnhope123');
        yield acceptRequest.AcceptRequest('johnhope123', 'Sharkykzn');
        yield friendRequest.FriendRequest('johnhope123', 'ChrisCross');
        yield acceptRequest.AcceptRequest('ChrisCross', 'johnhope123');
        yield Accounts_1.default.updateOne({ username: 'Mikey' }, { active: false });
        let response = yield viewRequests.ViewFriends('johnhope123');
        assert_1.default.deepEqual(response, {
            response: 'Friends found',
            data: ['ChrisCross', 'dyllanhope123', 'Sharkykzn'],
            status: true
        });
        yield deleteFriends.delete('johnhope123', 'dyllanhope123');
        response = yield viewRequests.ViewFriends('johnhope123');
        assert_1.default.deepEqual(response, {
            response: 'Friends found',
            data: ['ChrisCross', 'Sharkykzn'],
            status: true
        });
    }));
    it('Should return that there is no friendship between john and dyllan', () => __awaiter(void 0, void 0, void 0, function* () {
        let deleteFriends = new DeleteFriends_1.default;
        let response = yield deleteFriends.delete('johnhope123', 'dyllanhope123');
        assert_1.default.deepEqual(response, { response: 'There is no friendship between johnhope123 and dyllanhope123', status: false });
    }));
});
//# sourceMappingURL=DeleteFriend.test.js.map
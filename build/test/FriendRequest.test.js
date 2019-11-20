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
const Friends_1 = __importDefault(require("../server/services/models/Friends"));
const SendFriendRequest_1 = __importDefault(require("../server/services/friends/SendFriendRequest"));
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';
describe('Testing the FriendRequest functionality', () => {
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
    }));
    after(() => {
        mongoose_1.default.connection.close();
    });
    it('Should return that the same request combination already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        let friendRequest = new SendFriendRequest_1.default;
        let response = yield friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        assert_1.default.deepEqual(response, { response: 'Friend request sent', status: true });
    }));
    it('Should return that a request was sent from Dyllan to John', () => __awaiter(void 0, void 0, void 0, function* () {
        let friendRequest = new SendFriendRequest_1.default;
        yield friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        let response = yield friendRequest.FriendRequest('johnhope123', 'dyllanhope123');
        assert_1.default.deepEqual(response, { response: 'Friend request already exists', status: false });
    }));
});
//# sourceMappingURL=FriendRequest.test.js.map
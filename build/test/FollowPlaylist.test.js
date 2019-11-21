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
const Playlists_1 = __importDefault(require("../server/services/models/Playlists"));
const mongoose_1 = __importDefault(require("mongoose"));
const FollowPlaylist_1 = __importDefault(require("../server/services/playlists/FollowPlaylist"));
const CreatePlaylist_1 = require("../server/services/playlists/CreatePlaylist");
const accountsPremade_1 = __importDefault(require("./accountsPremade"));
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';
describe('Testing the following and unfollowing of playlists functionality', () => {
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
        yield Playlists_1.default.deleteMany({});
        yield accountsPremade_1.default();
    }));
    after(() => {
        mongoose_1.default.connection.close();
    });
    describe('Following playlist tests', () => {
        it('Should return that Dyllan is following the playlist "2019 rap"', () => __awaiter(void 0, void 0, void 0, function* () {
            const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
            const followPlaylist = new FollowPlaylist_1.default;
            yield createPlaylist.create('2019 Rap', 'danielminter123');
            let response = yield followPlaylist.follow('dyllanhope123', '2019 Rap');
            assert_1.default.strict.deepEqual(response, { response: 'dyllanhope123 is now following 2019 Rap', status: true });
        }));
        it('Should return that Dyllan is following the playlist "2019 rap"', () => __awaiter(void 0, void 0, void 0, function* () {
            const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
            const followPlaylist = new FollowPlaylist_1.default;
            yield createPlaylist.create('2019 Rap', 'danielminter123');
            yield followPlaylist.follow('dyllanhope123', '2019 Rap');
            let response = yield followPlaylist.follow('dyllanhope123', '2019 Rap');
            assert_1.default.strict.deepEqual(response, { response: 'dyllanhope123 is already following 2019 Rap', status: false });
        }));
        it('Should return that the username dyllanhope13 cannot be found', () => __awaiter(void 0, void 0, void 0, function* () {
            const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
            const followPlaylist = new FollowPlaylist_1.default;
            yield createPlaylist.create('2019 Rap', 'danielminter123');
            let response = yield followPlaylist.follow('dyllanhope13', '2019 Rap');
            assert_1.default.strict.deepEqual(response, { response: 'Username dyllanhope13 not found', status: false });
        }));
        it('Should return that the playlist 2019 House cannot be found', () => __awaiter(void 0, void 0, void 0, function* () {
            const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
            const followPlaylist = new FollowPlaylist_1.default;
            yield createPlaylist.create('2019 Rap', 'danielminter123');
            let response = yield followPlaylist.follow('dyllanhope123', '2019 House');
            assert_1.default.strict.deepEqual(response, { response: 'Playlist 2019 House not found', status: false });
        }));
    });
    describe('Unfollowing playlist tests', () => {
        it('Should return that danielminter123 has unfollowed the playlist "2019 Rap"', () => __awaiter(void 0, void 0, void 0, function* () {
            const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
            const followPlaylist = new FollowPlaylist_1.default;
            yield createPlaylist.create('2019 Rap', 'danielminter123');
            yield followPlaylist.follow('dyllanhope123', '2019 Rap');
            let response = yield followPlaylist.unfollow('danielminter123', '2019 Rap');
            assert_1.default.strict.deepEqual(response, { response: 'danielminter123 has unfollowed 2019 Rap', status: true });
        }));
        it('Should return that the username danielminter13 cannot be found', () => __awaiter(void 0, void 0, void 0, function* () {
            const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
            const followPlaylist = new FollowPlaylist_1.default;
            yield createPlaylist.create('2019 Rap', 'danielminter123');
            yield followPlaylist.follow('dyllanhope123', '2019 Rap');
            let response = yield followPlaylist.unfollow('danielminter13', '2019 Rap');
            assert_1.default.strict.deepEqual(response, { response: 'Username danielminter13 not found', status: false });
        }));
        it('Should return that the playlist 2019 House cannot be found', () => __awaiter(void 0, void 0, void 0, function* () {
            const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
            const followPlaylist = new FollowPlaylist_1.default;
            yield createPlaylist.create('2019 Rap', 'danielminter123');
            yield followPlaylist.follow('dyllanhope123', '2019 Rap');
            let response = yield followPlaylist.unfollow('danielminter123', '2019 House');
            assert_1.default.strict.deepEqual(response, { response: 'Playlist 2019 House not found', status: false });
        }));
    });
});
//# sourceMappingURL=FollowPlaylist.test.js.map
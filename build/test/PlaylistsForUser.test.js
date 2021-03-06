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
const CreatePlaylist_1 = require("../server/services/playlists/CreatePlaylist");
const PlaylistsForUser_1 = __importDefault(require("../server/services/playlists/PlaylistsForUser"));
const accountsPremade_1 = __importDefault(require("./accountsPremade"));
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';
describe('Testing the users playlists service functionality', () => {
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
    it('Should return that dyllanhope123 follows the playlists 2019 Rap and 2019 House', () => __awaiter(void 0, void 0, void 0, function* () {
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
        const playlistsForUser = new PlaylistsForUser_1.default;
        yield createPlaylist.create('2019 Rap', 'dyllanhope123');
        yield createPlaylist.create('2019 House', 'dyllanhope123');
        yield createPlaylist.create('2019 Pop', 'danielminter123');
        let response = yield playlistsForUser.playlistsFor('dyllanhope123');
        assert_1.default.deepEqual(response, {
            playlists: [{ name: '2019 Rap', creator: "dyllanhope123", follower_list: ['dyllanhope123'], followers: 1, song_count: 0, songs: [] }, { name: '2019 House', creator: "dyllanhope123", follower_list: ['dyllanhope123'], followers: 1, song_count: 0, songs: [] }],
            response: 'Playlists found',
            status: true
        });
    }));
    it('Should return that michaeldollman123 has no playlists', () => __awaiter(void 0, void 0, void 0, function* () {
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
        const playlistsForUser = new PlaylistsForUser_1.default;
        yield createPlaylist.create('2019 Rap', 'dyllanhope123');
        yield createPlaylist.create('2019 House', 'dyllanhope123');
        yield createPlaylist.create('2019 Pop', 'danielminter123');
        let response = yield playlistsForUser.playlistsFor('Mikey');
        assert_1.default.strict.deepEqual(response, { response: 'No playlists found, go follow or create some!', status: true });
    }));
});
//# sourceMappingURL=PlaylistsForUser.test.js.map
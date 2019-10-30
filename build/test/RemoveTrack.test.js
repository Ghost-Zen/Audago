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
const CreatePlaylist_1 = require("../server/services/playlists/CreatePlaylist");
const RemoveTrack_1 = __importDefault(require("../server/services/playlists/RemoveTrack"));
const Playlists_1 = __importDefault(require("../server/services/models/Playlists"));
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';
describe('Testing the "remove track" functionality', () => {
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
        yield Playlists_1.default.deleteMany({});
        yield Accounts_1.default.deleteMany({});
    }));
    after(() => {
        mongoose_1.default.connection.close();
    });
    it('Should return "The song Middle was not found in the playlist 2019 Rap"', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
        const removeTrack = new RemoveTrack_1.default;
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
        let playlist = {
            name: '2019 Rap',
            follower_count: 0,
            creator: 'dyllanhope123',
            song_count: 0
        };
        let track = { song: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap" };
        yield createPlaylist.create(playlist);
        yield createPlaylist.addToPlaylist(track);
        track = { song: "Midnight", artist: "Logic", playlist_name: "2019 Rap" };
        let response = yield removeTrack.remove(track);
        assert_1.default.strict.deepEqual(response, { response: 'The song Midnight was not found in the playlist 2019 Rap' });
    }));
    it('Should return "The song Middle Child was successfully removed from the playlist 2019 Rap"', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
        const removeTrack = new RemoveTrack_1.default;
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
        let playlist = {
            name: '2019 Rap',
            follower_count: 0,
            creator: 'dyllanhope123',
            song_count: 0
        };
        let track = { song: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap" };
        yield createPlaylist.create(playlist);
        yield createPlaylist.addToPlaylist(track);
        track = { song: "Midnight", artist: "Logic", playlist_name: "2019 Rap" };
        yield createPlaylist.addToPlaylist(track);
        track = { song: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap" };
        let response = yield removeTrack.remove(track);
        assert_1.default.strict.deepEqual(response, { response: 'The song Middle Child was successfully removed from the playlist 2019 Rap' });
    }));
});
//# sourceMappingURL=RemoveTrack.test.js.map
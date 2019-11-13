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
const Playlists_1 = __importDefault(require("../server/services/models/Playlists"));
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';
describe('Testing the "adding to playlist" functionality', () => {
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
    it('Should return that the playlist "2019 House" has been successfully created', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
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
        let response = yield createPlaylist.create('2019 House', 'dyllanhope123');
        assert_1.default.strict.deepEqual(response, { response: 'Playlist created!', status: true });
    }));
    it('Should return that the playlist "2019 House" already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
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
        yield createPlaylist.create('2019 House', 'dyllanhope123');
        let response = yield createPlaylist.create('2019 House', 'dyllanhope123');
        assert_1.default.strict.deepEqual(response, { response: 'Playlist 2019 House already exists', status: false });
    }));
    it('Should return an error message that says to select an existing playlist', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
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
        yield createPlaylist.create('2019 Rap', 'dyllanhope123');
        let response = yield createPlaylist.addToPlaylist("dyllanhope123", { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 House", song: '', album: 'music', artwork: '' });
        assert_1.default.strict.deepEqual(response, { response: 'Please select an existing playlist', status: false });
    }));
    it('Should return that the song "Middle Child" by "J. Cole" was added to the playlist "2019 rap" successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
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
        yield createPlaylist.create('2019 Rap', 'dyllanhope123');
        let response = yield createPlaylist.addToPlaylist("dyllanhope123", { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        assert_1.default.strict.deepEqual(response, { response: 'track added successfully', status: true });
    }));
    it('Should return that the song "Middle Child" by "J. Cole" was already in the playlist', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
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
        yield createPlaylist.create('2019 Rap', 'dyllanhope123');
        yield createPlaylist.addToPlaylist("dyllanhope123", { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        let response = yield createPlaylist.addToPlaylist("dyllanhope123", { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        assert_1.default.strict.deepEqual(response, { response: 'Middle Child is already in the playlist', status: false });
    }));
    it('Should return that Chris cannot add to a playlist he does not own', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
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
        user = {
            firstName: 'Chris',
            lastName: 'Green',
            username: 'chris123',
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
        yield createPlaylist.create('2019 Rap', 'dyllanhope123');
        yield createPlaylist.addToPlaylist("dyllanhope123", { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        let response = yield createPlaylist.addToPlaylist("chris123", { track: "We'll be fine", artist: "Drake", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        assert_1.default.strict.deepEqual(response, { response: 'You cannot add to a playlist you do not own', status: false });
    }));
    it('Should return that a name need to be entered to create a playlist', () => __awaiter(void 0, void 0, void 0, function* () {
        const createAccount = new CreateAccount_1.default;
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
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
        let response = yield createPlaylist.create('    ', 'dyllanhope123');
        assert_1.default.strict.deepEqual(response, { response: 'Please eneter a name for the playlist', status: false });
    }));
});
//# sourceMappingURL=CreatePlaylist.test.js.map
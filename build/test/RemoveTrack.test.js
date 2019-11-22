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
const CreatePlaylist_1 = require("../server/services/playlists/CreatePlaylist");
const RemoveTrack_1 = __importDefault(require("../server/services/playlists/RemoveTrack"));
const Playlists_1 = __importDefault(require("../server/services/models/Playlists"));
const accountsPremade_1 = __importDefault(require("./accountsPremade"));
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
        yield accountsPremade_1.default();
    }));
    after(() => {
        mongoose_1.default.connection.close();
    });
    it('Should return "The song Middle was not found in the playlist 2019 Rap"', () => __awaiter(void 0, void 0, void 0, function* () {
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
        const removeTrack = new RemoveTrack_1.default;
        let track = { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        yield createPlaylist.create('2019 Rap', 'dyllanhope123');
        yield createPlaylist.addToPlaylist("dyllanhope123", track);
        track = { track: "Midnight", artist: "Logic", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        let response = yield removeTrack.remove("dyllanhope123", track);
        assert_1.default.strict.deepEqual(response, { response: 'The song Midnight was not found in the playlist 2019 Rap', status: false });
    }));
    it('Should return "The song Middle Child was successfully removed from the playlist 2019 Rap"', () => __awaiter(void 0, void 0, void 0, function* () {
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
        const removeTrack = new RemoveTrack_1.default;
        let track = { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        yield createPlaylist.create('2019 Rap', 'dyllanhope123');
        yield createPlaylist.addToPlaylist("dyllanhope123", track);
        track = { track: "Midnight", artist: "Logic", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        yield createPlaylist.addToPlaylist("dyllanhope123", track);
        track = { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        let response = yield removeTrack.remove("dyllanhope123", track);
        assert_1.default.strict.deepEqual(response, { response: 'The song Middle Child was successfully removed from the playlist 2019 Rap', status: true });
    }));
    it('Should return that chris cannot remove a track from a playlist he does not own', () => __awaiter(void 0, void 0, void 0, function* () {
        const createPlaylist = new CreatePlaylist_1.CreatePlaylist;
        const removeTrack = new RemoveTrack_1.default;
        let track = { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        yield createPlaylist.create('2019 Rap', 'dyllanhope123');
        yield createPlaylist.addToPlaylist("dyllanhope123", track);
        track = { track: "Midnight", artist: "Logic", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        let response = yield removeTrack.remove("chris123", track);
        assert_1.default.strict.deepEqual(response, {
            response: "You cannot remove a track from a playlist you don't own",
            status: false
        });
    }));
});
//# sourceMappingURL=RemoveTrack.test.js.map
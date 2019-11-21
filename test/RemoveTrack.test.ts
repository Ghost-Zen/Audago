import assert from 'assert';
import Account from '../server/services/models/Accounts';
import mongoose from 'mongoose';
import { CreatePlaylist } from '../server/services/playlists/CreatePlaylist';
import RemoveTrack from '../server/services/playlists/RemoveTrack';
import Playlists, { TrackInfo } from '../server/services/models/Playlists';
import accountsPremade from './accountsPremade';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the "remove track" functionality', () => {
    before(function (done) {
        mongoose.Promise = global.Promise;
        mongoose.set('useCreateIndex', true)
        mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            done();
        });
    });
    beforeEach(async () => {
        await Playlists.deleteMany({});
        await Account.deleteMany({});
        await accountsPremade();
    });
    after(() => {
        mongoose.connection.close();
    });
    it('Should return "The song Middle was not found in the playlist 2019 Rap"', async () => {
        const createPlaylist = new CreatePlaylist;
        const removeTrack = new RemoveTrack;
        let track: TrackInfo = { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        await createPlaylist.create('2019 Rap', 'dyllanhope123');
        await createPlaylist.addToPlaylist("dyllanhope123", track);
        track = { track: "Midnight", artist: "Logic", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        let response = await removeTrack.remove("dyllanhope123", track);
        assert.strict.deepEqual(response, { response: 'The song Midnight was not found in the playlist 2019 Rap', status: false });
    })
    it('Should return "The song Middle Child was successfully removed from the playlist 2019 Rap"', async () => {
        const createPlaylist = new CreatePlaylist;
        const removeTrack = new RemoveTrack;
        let track: TrackInfo = { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        await createPlaylist.create('2019 Rap', 'dyllanhope123');
        await createPlaylist.addToPlaylist("dyllanhope123", track);
        track = { track: "Midnight", artist: "Logic", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        await createPlaylist.addToPlaylist("dyllanhope123", track);
        track = { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        let response = await removeTrack.remove("dyllanhope123", track);
        assert.strict.deepEqual(response, { response: 'The song Middle Child was successfully removed from the playlist 2019 Rap', status: true });
    })
    it('Should return that chris cannot remove a track from a playlist he does not own', async () => {
        const createPlaylist = new CreatePlaylist;
        const removeTrack = new RemoveTrack;
        let track: TrackInfo = { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        await createPlaylist.create('2019 Rap', 'dyllanhope123');
        await createPlaylist.addToPlaylist("dyllanhope123", track);
        track = { track: "Midnight", artist: "Logic", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' };
        let response = await removeTrack.remove("chris123", track);
        assert.strict.deepEqual(response, {
            response: "You cannot remove a track from a playlist you don't own",
            status: false
        });
    })
});
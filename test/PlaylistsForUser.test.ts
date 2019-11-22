import assert from 'assert';
import Account from '../server/services/models/Accounts';
import Playlist from '../server/services/models/Playlists';
import mongoose from 'mongoose';
import { CreatePlaylist } from '../server/services/playlists/CreatePlaylist';
import PlaylistsForUser from '../server/services/playlists/PlaylistsForUser';
import accountsPremade from './accountsPremade';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the users playlists service functionality', () => {
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
        await Account.deleteMany({});
        await Playlist.deleteMany({});
        await accountsPremade();
    });
    after(() => {
        mongoose.connection.close();
    })
    it('Should return that dyllanhope123 follows the playlists 2019 Rap and 2019 House', async () => {
        const createPlaylist = new CreatePlaylist;
        const playlistsForUser = new PlaylistsForUser;
        await createPlaylist.create('2019 Rap', 'dyllanhope123');
        await createPlaylist.create('2019 House', 'dyllanhope123');
        await createPlaylist.create('2019 Pop', 'danielminter123');
        let response = await playlistsForUser.playlistsFor('dyllanhope123');
        assert.deepEqual(response, {
            playlists:
                [{ name: '2019 Rap', creator: "dyllanhope123", follower_list: ['dyllanhope123'], followers: 1, song_count: 0, songs: [] }, { name: '2019 House', creator: "dyllanhope123", follower_list: ['dyllanhope123'], followers: 1, song_count: 0, songs: [] }],
            response: 'Playlists found',
            status: true
        });
    });
    it('Should return that michaeldollman123 has no playlists', async () => {
        const createPlaylist = new CreatePlaylist;
        const playlistsForUser = new PlaylistsForUser;
        await createPlaylist.create('2019 Rap', 'dyllanhope123');
        await createPlaylist.create('2019 House', 'dyllanhope123');
        await createPlaylist.create('2019 Pop', 'danielminter123');
        let response = await playlistsForUser.playlistsFor('Mikey');
        assert.strict.deepEqual(response, { response: 'No playlists found, go follow or create some!', status: true });
    });
});
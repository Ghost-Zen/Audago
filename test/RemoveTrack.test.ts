import assert from 'assert';
import Account, { Iaccounts } from '../server/services/models/Accounts';
import mongoose from 'mongoose';
import CreateAccount from '../server/services/accounts/CreateAccount';
import { CreatePlaylist } from '../server/services/playlists/CreatePlaylist';
import RemoveTrack from '../server/services/playlists/RemoveTrack';
import Playlists, { Iplaylist, TrackInfo } from '../server/services/models/Playlists';

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
    });
    after(() => {
        mongoose.connection.close();
    });
    it('Should return "The song Middle was not found in the playlist 2019 Rap"', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
        const removeTrack = new RemoveTrack;
        let user: Iaccounts = {
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
        }
        await createAccount.create(user);
        let playlist: Iplaylist = {
            name: '2019 Rap',
            follower_count: 0,
            creator: 'dyllanhope123',
            song_count: 0
        }
        let track: TrackInfo = { song: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap" };
        await createPlaylist.create(playlist);
        await createPlaylist.addToPlaylist(track);
        track = { song: "Midnight", artist: "Logic", playlist_name: "2019 Rap" };
        let response = await removeTrack.remove(track);
        assert.strict.deepEqual(response, { response: 'The song Midnight was not found in the playlist 2019 Rap', status: false });
    })
    it('Should return "The song Middle Child was successfully removed from the playlist 2019 Rap"', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
        const removeTrack = new RemoveTrack;
        let user: Iaccounts = {
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
        }
        await createAccount.create(user);
        let playlist: Iplaylist = {
            name: '2019 Rap',
            follower_count: 0,
            creator: 'dyllanhope123',
            song_count: 0
        }
        let track: TrackInfo = { song: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap" };
        await createPlaylist.create(playlist);
        await createPlaylist.addToPlaylist(track);
        track = { song: "Midnight", artist: "Logic", playlist_name: "2019 Rap" };
        await createPlaylist.addToPlaylist(track);
        track = { song: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap" };
        let response = await removeTrack.remove(track);
        assert.strict.deepEqual(response, { response: 'The song Middle Child was successfully removed from the playlist 2019 Rap', status: true });
    })
});
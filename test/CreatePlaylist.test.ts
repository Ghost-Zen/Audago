import assert from 'assert';
import Account, { Iaccounts } from '../server/services/models/Accounts';
import mongoose from 'mongoose';
import CreateAccount from '../server/services/accounts/CreateAccount';
import { CreatePlaylist } from '../server/services/playlists/CreatePlaylist';
import Playlists, { Iplaylist } from '../server/services/models/Playlists';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the "adding to playlist" functionality', () => {
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
    it('Should return that the playlist "2019 House" has been successfully created', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
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
            name: '2019 House',
            follower_count: 0,
            creator: 'dyllanhope123',
            song_count: 0
        }
        let response = await createPlaylist.create(playlist);
        assert.strict.deepEqual(response, { response: 'Playlist created!', status: true });
    })
    it('Should return that the playlist "2019 House" already exists', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
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
            name: '2019 House',
            follower_count: 0,
            creator: 'dyllanhope123',
            song_count: 0
        }
        await createPlaylist.create(playlist)
        playlist = {
            name: '2019 House',
            follower_count: 0,
            creator: 'dyllanhope123',
            song_count: 0
        }
        let response = await createPlaylist.create(playlist);
        assert.strict.deepEqual(response, { response: 'Playlist 2019 House already exists', status: false });
    })
    it('Should return that the playlist "2019 House" was not found', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
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
        await createPlaylist.create(playlist);
        let response = await createPlaylist.addToPlaylist({ track: "Middle Child", artist: "J. Cole", playlist_name: "2019 House", song: '', album: 'music', artwork: '' });
        assert.strict.deepEqual(response, { response: '2019 House not found', status: false });
    })
    it('Should return that the song "Middle Child" by "J. Cole" was added to the playlist "2019 rap" successfully', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
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
        await createPlaylist.create(playlist);
        let response = await createPlaylist.addToPlaylist({ track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        assert.strict.deepEqual(response, { response: 'track added successfully', status: true });
    })
    it('Should return that the song "Middle Child" by "J. Cole" was already in the playlist', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
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
        await createPlaylist.create(playlist);
        await createPlaylist.addToPlaylist({ track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        let response = await createPlaylist.addToPlaylist({ track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        assert.strict.deepEqual(response, { response: 'Middle Child is already in the playlist', status: false });
    })
});
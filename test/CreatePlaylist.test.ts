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
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        await createAccount.create(user);
        let response = await createPlaylist.create('2019 House', 'dyllanhope123');
        assert.strict.deepEqual(response, { response: 'Playlist created!', status: true });
    })
    it('Should return that the playlist "2019 House" already exists', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        await createAccount.create(user);
        await createPlaylist.create('2019 House', 'dyllanhope123')
        let response = await createPlaylist.create('2019 House', 'dyllanhope123');
        assert.strict.deepEqual(response, { response: 'Playlist 2019 House already exists', status: false });
    })
    it('Should return an error message that says to select an existing playlist', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        await createAccount.create(user);
        await createPlaylist.create('2019 Rap', 'dyllanhope123');
        let response = await createPlaylist.addToPlaylist("dyllanhope123", { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 House", song: '', album: 'music', artwork: '' });
        assert.strict.deepEqual(response, { response: 'Please select an existing playlist', status: false });
    })
    it('Should return that the song "Middle Child" by "J. Cole" was added to the playlist "2019 rap" successfully', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        await createAccount.create(user);
        await createPlaylist.create('2019 Rap', 'dyllanhope123');
        let response = await createPlaylist.addToPlaylist("dyllanhope123", { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        assert.strict.deepEqual(response, { response: 'track added successfully', status: true });
    })
    it('Should return that the song "Middle Child" by "J. Cole" was already in the playlist', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        await createAccount.create(user);
        await createPlaylist.create('2019 Rap', 'dyllanhope123');
        await createPlaylist.addToPlaylist("dyllanhope123", { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        let response = await createPlaylist.addToPlaylist("dyllanhope123", { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        assert.strict.deepEqual(response, { response: 'Middle Child is already in the playlist', status: false });
    })
    it('Should return that Chris cannot add to a playlist he does not own', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        await createAccount.create(user);
        user = {
            firstName: 'Chris',
            lastName: 'Green',
            username: 'chris123',
            password: 'Fwgr123#',
            email: 'chrisgreen@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        await createAccount.create(user);
        await createPlaylist.create('2019 Rap', 'dyllanhope123');
        await createPlaylist.addToPlaylist("dyllanhope123", { track: "Middle Child", artist: "J. Cole", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        let response = await createPlaylist.addToPlaylist("chris123", { track: "We'll be fine", artist: "Drake", playlist_name: "2019 Rap", song: '', album: 'music', artwork: '' });
        assert.strict.deepEqual(response, { response: 'You cannot add to a playlist you do not own', status: false });
    })
    it('Should return that a name need to be entered to create a playlist', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        await createAccount.create(user);
        let response = await createPlaylist.create('    ', 'dyllanhope123');
        assert.strict.deepEqual(response, { response: 'Please eneter a name for the playlist', status: false });
    })
});
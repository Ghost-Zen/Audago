import assert from 'assert';
import Account, { Iaccounts } from '../server/services/models/Accounts';
import Playlist, { Iplaylist } from '../server/services/models/Playlists';
import mongoose from 'mongoose';
import FollowPlaylist from '../server/services/playlists/FollowPlaylist';
import CreateAccount from '../server/services/accounts/CreateAccount';
import { CreatePlaylist } from '../server/services/playlists/CreatePlaylist';
import PlaylistsForUser from '../server/services/playlists/PlaylistsForUser';
import { stringify } from 'querystring';

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
    });
    after(() => {
        mongoose.connection.close();
    })
    it('Should return that dyllanhope123 follows the playlists 2019 Rap and 2019 House', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
        const playlistsForUser = new PlaylistsForUser;
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
        user = {
            firstName: 'Daniel',
            lastName: 'Minter',
            username: 'danielminter123',
            password: '12345',
            email: 'daniel@gmail.com',
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
            follower_count: 1,
            creator: 'dyllanhope123',
            song_count: 0
        }
        await createPlaylist.create(playlist);
        playlist = {
            name: '2019 House',
            follower_count: 1,
            creator: 'dyllanhope123',
            song_count: 0
        }
        await createPlaylist.create(playlist);
        playlist = {
            name: '2019 Pop',
            follower_count: 1,
            creator: 'danielminter123',
            song_count: 0
        }
        await createPlaylist.create(playlist);
        let response = await playlistsForUser.playlistsFor('dyllanhope123');
        assert.deepEqual(response, {
            playlists:
                [{ name: '2019 Rap', creator: "dyllanhope123", followers: 1, song_count: 0, songs: [] }, { name: '2019 House', creator: "dyllanhope123", followers: 1, song_count: 0, songs: [] }],
            response: 'Playlists found',
            status: true
        });
    });
    it('Should return that michaeldollman123 has no playlists', async () => {
        const createAccount = new CreateAccount;
        const createPlaylist = new CreatePlaylist;
        const playlistsForUser = new PlaylistsForUser;
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
        user = {
            firstName: 'Daniel',
            lastName: 'Minter',
            username: 'danielminter123',
            password: '12345',
            email: 'daniel@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        }
        await createAccount.create(user);
        user = {
            firstName: 'michael',
            lastName: 'dollman',
            username: 'michaeldollman123',
            password: '12345',
            email: 'michael@gmail.com',
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
            follower_count: 1,
            creator: 'dyllanhope123',
            song_count: 0
        }
        await createPlaylist.create(playlist);
        playlist = {
            name: '2019 House',
            follower_count: 1,
            creator: 'dyllanhope123',
            song_count: 0
        }
        await createPlaylist.create(playlist);
        playlist = {
            name: '2019 Pop',
            follower_count: 1,
            creator: 'danielminter123',
            song_count: 0
        }
        await createPlaylist.create(playlist);
        let response = await playlistsForUser.playlistsFor('michaeldollman123');
        assert.strict.deepEqual(response, { response: 'No playlists found, go follow or create some!', status: true });
    });
});
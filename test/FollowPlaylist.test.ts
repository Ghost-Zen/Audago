import assert from 'assert';
import Account, { Iaccounts } from '../server/services/models/Accounts';
import Playlist, { Iplaylist } from '../server/services/models/Playlists';
import mongoose from 'mongoose';
import FollowPlaylist from '../server/services/playlists/FollowPlaylist';
import CreateAccount from '../server/services/accounts/CreateAccount';
import { CreatePlaylist } from '../server/services/playlists/CreatePlaylist';
import Accounts from '../server/services/models/Accounts';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the following and unfollowing of playlists functionality', () => {
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
    describe('Following playlist tests', () => {
        it('Should return that Dyllan is following the playlist "2019 rap"', async () => {
            const createAccount = new CreateAccount;
            const createPlaylist = new CreatePlaylist;
            const followPlaylist = new FollowPlaylist;
            let user: Iaccounts = {
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
                follower_count: 1,
                creator: 'danielminter123',
                song_count: 0
            }
            await createPlaylist.create(playlist);
            let response = await followPlaylist.follow('dyllanhope123', '2019 Rap');
            assert.strict.deepEqual(response, { response: 'dyllanhope123 is now following 2019 Rap', status: true });
        })
        it('Should return that the username dyllanhope13 cannot be found', async () => {
            const createAccount = new CreateAccount;
            const createPlaylist = new CreatePlaylist;
            const followPlaylist = new FollowPlaylist;
            let user: Iaccounts = {
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
                follower_count: 1,
                creator: 'danielminter123',
                song_count: 0
            }
            await createPlaylist.create(playlist);
            let response = await followPlaylist.follow('dyllanhope13', '2019 Rap');
            assert.strict.deepEqual(response, { response: 'Username dyllanhope13 not found', status: false });
        })
        it('Should return that the playlist 2019 House cannot be found', async () => {
            const createAccount = new CreateAccount;
            const createPlaylist = new CreatePlaylist;
            const followPlaylist = new FollowPlaylist;
            let user: Iaccounts = {
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
                follower_count: 1,
                creator: 'danielminter123',
                song_count: 0
            }
            await createPlaylist.create(playlist);
            let response = await followPlaylist.follow('dyllanhope123', '2019 House');
            assert.strict.deepEqual(response, { response: 'Playlist 2019 House not found', status: false });
        })
    })
    describe('Unfollowing playlist tests', () => {
        it('Should return that danielminter123 has unfollowed the playlist "2019 Rap"', async () => {
            const createAccount = new CreateAccount;
            const createPlaylist = new CreatePlaylist;
            const followPlaylist = new FollowPlaylist;
            let user: Iaccounts = {
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
                follower_count: 1,
                creator: 'danielminter123',
                song_count: 0
            }
            await createPlaylist.create(playlist);
            await followPlaylist.follow('dyllanhope123', '2019 Rap');
            let response = await followPlaylist.unfollow('danielminter123', '2019 Rap');
            assert.strict.deepEqual(response, { response: 'danielminter123 has unfollowed 2019 Rap', status: true });
        })
        it('Should return that the username danielminter13 cannot be found', async () => {
            const createAccount = new CreateAccount;
            const createPlaylist = new CreatePlaylist;
            const followPlaylist = new FollowPlaylist;
            let user: Iaccounts = {
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
                follower_count: 1,
                creator: 'danielminter123',
                song_count: 0
            }
            await createPlaylist.create(playlist);
            await followPlaylist.follow('dyllanhope123', '2019 Rap');
            let response = await followPlaylist.unfollow('danielminter13', '2019 Rap');
            assert.strict.deepEqual(response, { response: 'Username danielminter13 not found', status: false });
        })
        it('Should return that the playlist 2019 House cannot be found', async () => {
            const createAccount = new CreateAccount;
            const createPlaylist = new CreatePlaylist;
            const followPlaylist = new FollowPlaylist;
            let user: Iaccounts = {
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
                follower_count: 1,
                creator: 'danielminter123',
                song_count: 0
            }
            await createPlaylist.create(playlist);
            await followPlaylist.follow('dyllanhope123', '2019 Rap');
            let response = await followPlaylist.unfollow('danielminter123', '2019 House');
            assert.strict.deepEqual(response, { response: 'Playlist 2019 House not found', status: false });
        })
    })
});
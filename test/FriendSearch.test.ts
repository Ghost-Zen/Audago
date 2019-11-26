import assert from 'assert';
import mongoose from 'mongoose';
import Account from '../server/services/models/Accounts';
import Friends from '../server/services/models/Friends';
import SendFriendRequest from '../server/services/friends/SendFriendRequest';
import AcceptRequest from '../server/services/friends/RequestResponse';
import accountsPremade from './accountsPremade';
import FriendSearch from '../server/services/friends/FriendSearch';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the FriendSearch functionality', () => {
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
        await Friends.deleteMany({});
        await Account.deleteMany({});
        await accountsPremade()
    });
    after(() => {
        mongoose.connection.close();
    });
    it('Should return all the available friends that havent been added', async () => {
        let friendRequest = new SendFriendRequest;
        let acceptRequest = new AcceptRequest;
        let search = new FriendSearch;

        await friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        await acceptRequest.AcceptRequest('johnhope123', 'dyllanhope123');

        await Account.updateOne({ username: 'Mikey' }, { active: false });
        await Account.updateOne({ username: 'ChrisCross' }, { active: false });

        let response = await search.search('johnhope123', '');
        assert.deepEqual(response,
            {
                response: 'Users found',
                data:
                    [{ friend: 'Sharkykzn', image: '' },
                    { friend: 'danielminter123', image: '' }],
                status: true
            });
    });
    it('Should return danielminter123', async () => {
        let friendRequest = new SendFriendRequest;
        let acceptRequest = new AcceptRequest;
        let search = new FriendSearch;

        await friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        await acceptRequest.AcceptRequest('johnhope123', 'dyllanhope123');

        await Account.updateOne({ username: 'Mikey' }, { active: false });
        await Account.updateOne({ username: 'ChrisCross' }, { active: false });

        let response = await search.search('johnhope123', 'danielminter123');
        assert.deepEqual(response,
            {
                response: 'Users found',
                data:
                    [{ friend: 'danielminter123', image: '' }],
                status: true
            });
    })
});

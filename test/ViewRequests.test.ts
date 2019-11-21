import assert from 'assert';
import mongoose from 'mongoose';
import Account from '../server/services/models/Accounts';
import Friends from '../server/services/models/Friends';
import SendFriendRequest from '../server/services/friends/SendFriendRequest';
import AcceptRequest from '../server/services/friends/AcceptRequest';
import ViewRequests from '../server/services/friends/ViewRequests';
import accountsPremade from './accountsPremade';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the ViewRequest functionality', () => {
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
    });
    after(() => {
        mongoose.connection.close();
    });
    it('Should return all the unconfirmed friend requests for johnhope123 (3 requests)', async () => {
        let friendRequest = new SendFriendRequest;
        let viewRequests = new ViewRequests;
        await friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        await friendRequest.FriendRequest('Mikey', 'johnhope123');
        await friendRequest.FriendRequest('Sharkykzn', 'johnhope123');
        await friendRequest.FriendRequest('johnhope123', 'ChrisCross');
        let response = await viewRequests.ViewRequests('johnhope123');
        assert.deepEqual(response, {
            response: 'Friends found',
            requesters: ['dyllanhope123', 'Mikey', 'Sharkykzn'],
            status: true
        })
    })
    it('Should return that Mikey has no requests', async () => {
        let friendRequest = new SendFriendRequest;
        let viewRequests = new ViewRequests;
        await friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        await friendRequest.FriendRequest('Mikey', 'johnhope123');
        await friendRequest.FriendRequest('Sharkykzn', 'johnhope123');
        await friendRequest.FriendRequest('johnhope123', 'ChrisCross');
        let response = await viewRequests.ViewRequests('Mikey');
        assert.deepEqual(response, { response: 'No requests', status: false })
    })

    it('Should return all the confirmed and active friends of John', async () => {
        let friendRequest = new SendFriendRequest;
        let acceptRequest = new AcceptRequest;
        let viewRequests = new ViewRequests;
        await accountsPremade();

        await friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        await acceptRequest.AcceptRequest('johnhope123', 'dyllanhope123');

        await friendRequest.FriendRequest('Mikey', 'johnhope123');
        await acceptRequest.AcceptRequest('johnhope123', 'Mikey');

        await friendRequest.FriendRequest('Sharkykzn', 'johnhope123');
        await acceptRequest.AcceptRequest('johnhope123', 'Sharkykzn');

        await friendRequest.FriendRequest('johnhope123', 'ChrisCross');
        await acceptRequest.AcceptRequest('ChrisCross', 'johnhope123');

        await Account.updateOne({ username: 'Mikey' }, { active: false });
        await Account.updateOne({ username: 'ChrisCross' }, { active: false });

        let response = await viewRequests.ViewFriends('johnhope123');

        assert.deepEqual(response, {
            response: 'Friends found',
            activeFriends: ['dyllanhope123', 'Sharkykzn'],
            status: true
        });
    })
});

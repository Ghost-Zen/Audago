import assert from 'assert';
import mongoose from 'mongoose';
import Account from '../server/services/models/Accounts';
import Friends from '../server/services/models/Friends';
import SendFriendRequest from '../server/services/friends/SendFriendRequest';
import AcceptRequest from '../server/services/friends/RequestResponse';
import ViewRequests from '../server/services/friends/ViewRequests';
import accountsPremade from './accountsPremade';
import DeletingFriends from '../server/services/friends/DeleteFriends';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the DeletingFriends functionality', () => {
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
        await accountsPremade();
    });
    after(() => {
        mongoose.connection.close();
    });
    it('Should return that the friendship between john and dyllan was deleted', async () => {
        let friendRequest = new SendFriendRequest;
        let acceptRequest = new AcceptRequest;
        let viewRequests = new ViewRequests;
        let deleteFriends = new DeletingFriends;

        await friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        await acceptRequest.AcceptRequest('johnhope123', 'dyllanhope123');

        await friendRequest.FriendRequest('Mikey', 'johnhope123');
        await acceptRequest.AcceptRequest('johnhope123', 'Mikey');

        await friendRequest.FriendRequest('Sharkykzn', 'johnhope123');
        await acceptRequest.AcceptRequest('johnhope123', 'Sharkykzn');

        await friendRequest.FriendRequest('johnhope123', 'ChrisCross');
        await acceptRequest.AcceptRequest('ChrisCross', 'johnhope123');

        await Account.updateOne({ username: 'Mikey' }, { active: false });

        let response = await viewRequests.ViewFriends('johnhope123');
        assert.deepEqual(response, {
            response: 'Friends found',
            activeFriends: ['ChrisCross', 'dyllanhope123', 'Sharkykzn'],
            status: true
        });

        await deleteFriends.delete('johnhope123', 'dyllanhope123');
        response = await viewRequests.ViewFriends('johnhope123');
        assert.deepEqual(response, {
            response: 'Friends found',
            activeFriends: ['ChrisCross', 'Sharkykzn'],
            status: true
        });
    })
    it('Should return that the friendship between john and dyllan was deleted', async () => {
        let deleteFriends = new DeletingFriends;

        let response = await deleteFriends.delete('johnhope123', 'dyllanhope123');
        assert.deepEqual(response, { response: 'There is no friendship bewtween johnhope123 and dyllanhope123', status: false });
    })
});

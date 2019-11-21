import assert from 'assert';
import mongoose from 'mongoose';
import Friends from '../server/services/models/Friends';
import SendFriendRequest from '../server/services/friends/SendFriendRequest';
import ViewRequests from '../server/services/friends/ViewRequests';

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
});

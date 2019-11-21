import assert from 'assert';
import mongoose from 'mongoose';
import Friends from '../server/services/models/Friends';
import SendFriendRequest from '../server/services/friends/SendFriendRequest';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the FriendRequest functionality', () => {
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
    it('Should return that the same request combination already exists', async () => {
        let friendRequest = new SendFriendRequest;
        let response = await friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        assert.deepEqual(response, { response: 'Friend request sent', status: true });
    })
    it('Should return that a request was sent from Dyllan to John', async () => {
        let friendRequest = new SendFriendRequest;
        await friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        let response = await friendRequest.FriendRequest('johnhope123','dyllanhope123');
        assert.deepEqual(response, { response: 'Friend request already exists', status: false });
    })
});

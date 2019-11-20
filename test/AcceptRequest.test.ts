import assert from 'assert';
import mongoose from 'mongoose';
import Friends from '../server/services/models/Friends';
import SendFriendRequest from '../server/services/friends/SendFriendRequest';
import AcceptRequest from '../server/services/friends/AcceptRequest';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the AcceptRequest functionality', () => {
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
    it('Should return that the request was succesfully accepted', async () => {
        let friendRequest = new SendFriendRequest;
        let accept = new AcceptRequest;
        await friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        let response = await accept.AcceptRequest('johnhope123', 'dyllanhope123');
        assert.deepEqual(response, { response: 'Successfully accepted friend request between johnhope123 & dyllanhope123', status: true }
        );
    })
    it('Should return that the request does not exist', async () => {
        let friendRequest = new SendFriendRequest;
        let accept = new AcceptRequest;
        await friendRequest.FriendRequest('dyllanhope123', 'johnhope123');
        let response = await accept.AcceptRequest('Mikey', 'dyllanhope123');
        assert.deepEqual(response, { response: 'Request not found', status: false });
    })
});

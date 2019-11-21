import assert from 'assert';
import Account from '../server/services/models/Accounts';
import mongoose from 'mongoose';
import DeleteAccount from '../server/services/accounts/DeletingAccount';
import accountsPremade from './accountsPremade';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the delete account functionality', () => {
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
        await accountsPremade();
    });
    after(() => {
        mongoose.connection.close();
    })
    it('Should return an empty array after using the "deleteAll" function', async () => {
        const deleteAccount = new DeleteAccount;
        await deleteAccount.deleteAll();
        Account.find({})
            .then((accounts) => {
                assert.strict.deepEqual(accounts, []);
            });
    });
    it('Should return an array with only "Daniel" as Dyllans account was deleted separately', async () => {
        const deleteAccount = new DeleteAccount;
        await deleteAccount.delete('dyllanhope123');
        let res = await Account.findOne({ username: 'dyllanhope123' });
        assert.strict.deepEqual(res, null);
    });
});
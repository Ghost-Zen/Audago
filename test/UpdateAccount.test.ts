import assert from 'assert';
import Account from '../server/services/models/Accounts';
import mongoose from 'mongoose';
import UpdateAccount from '../server/services/accounts/UpdateAccount';
import accountsPremade from './accountsPremade';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the update account functionality', () => {
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
    });
    describe('User data changing testing', () => {
        it("Should return that Chris's first and last name has been updated", async () => {
            const updateAccount = new UpdateAccount;
            let updatedUser: any = {
                firstName: 'Christopher',
                lastName: 'Greenings',
                email: 'chrisgreen@gmail.com',
            }
            await updateAccount.update('ChrisCross', updatedUser);

            let res = await Account.findOne({ username: 'ChrisCross' });
            let name = res.firstName + ' ' + res.lastName;
            assert.equal(name,'Christopher Greenings');
        });
        it("Should return that Chris's email has been changed successfully", async () => {
            const updateAccount = new UpdateAccount;
            let updatedUser: any = {
                firstName: 'Chris',
                lastName: 'Green',
                email: 'chris@gmail.com',
            }
            await updateAccount.update('ChrisCross', updatedUser);

            let res = await Account.findOne({ username: 'ChrisCross' })
            assert.equal(res.email, 'chris@gmail.com');
        });
    });
    describe('Password changing testing', () => {
        it("Should return that John's password was successfully changed", async () => {
            const updateAccount = new UpdateAccount;
            await updateAccount.updatePassword('johnhope123', 'Fwgr123#', 'Kill@manjar0', 'Kill@manjar0');
            let response = await updateAccount.updatePassword('johnhope123', 'Kill@manjar0', 'T3ch9%!(', 'T3ch9%!(');
            assert.strict.deepEqual(response, { response: 'Password updated', status: true });
        });
        it("Should return that vuyo_ma2 was not found", async () => {
            const updateAccount = new UpdateAccount;
            let response = await updateAccount.updatePassword('vuyo_ma2', 'Fwgr123#', 'T3ch9%!(', 'T3ch9%!(');
            assert.strict.deepEqual(response, { response: 'Username vuyo_ma2 not found', status: false });
        });
        it("Should return that the entered password was incorrect", async () => {
            const updateAccount = new UpdateAccount;
            let response = await updateAccount.updatePassword('johnhope123', 'car', 'T3ch9%!(', 'T3ch9%!(');
            assert.strict.deepEqual(response, { response: 'Password incorrect', status: false });
        });
        it("Should return that the confirmation and new passwords do not match", async () => {
            const updateAccount = new UpdateAccount;
            let response = await updateAccount.updatePassword('johnhope123', 'car', 'House123', 'Fwgr123#');
            assert.strict.deepEqual(response, {
                response: 'Your New and Confirmation passwords do not match',
                status: false
            }
            );
        });
        it("Should return that the new password is too weak", async () => {
            const updateAccount = new UpdateAccount;
            let response = await updateAccount.updatePassword('johnhope123', 'Fwgr123#', 'House123', 'House123');
            assert.strict.deepEqual(response, { response: 'The entered password is too weak', status: false });
        });
    });
});
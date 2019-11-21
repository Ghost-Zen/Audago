import assert from 'assert';
import Account from '../server/services/models/Accounts';
import mongoose from 'mongoose';
import UserData from '../server/services/accounts/UserData';
import accountsPremade from './accountsPremade';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the UserData functionality', () => {
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
    describe('Login service testing', () => {
        // it("Should return with that Michael has logged in successfully and returns a token with true status", async () => {
        //     const createAccount = new CreateAccount;
        //     const userData = new UserData;
        //     let user: Iaccounts = {
        //         firstName: 'Micheal',
        //         lastName: 'Dollman',
        //         username: 'michaeldollman123',
        //         password: 'Fwgr123#',
        //         email: 'michaeldollman@gmail.com',
        //         image: '',
        //         active: false,
        //         timestamp: {
        //             created: 'date',
        //             lastSeen: 'date'
        //         },
        //         status:''
        //     }
        //     await createAccount.create(user);
        //     let response = await userData.loginData('michaeldollman123', 'Fwgr123#')
        //     assert.strict.deepEqual(response.status, true);
        // });
        it("Should return with an error that Vuyo's data could not be found, as the account wasn't made", async () => {
            const userData = new UserData;
            assert.strict.deepEqual(await userData.loginData('vuyo_ma2', 'Fwgr123#'), { response: 'Username vuyo_ma2 not found', status: false });
        });
        it("Should return with an error that the entered password is  incorrect", async () => {
            const userData = new UserData;
            assert.strict.deepEqual(await userData.loginData('Mikey', '1245'), { response: 'Password incorrect', status: false });
        });
    });
    describe('User data return testing', () => {
        it("Should return all dyllanhope123's data from DB", async () => {
            const userData = new UserData;
            let response = await userData.userData('dyllanhope123');
            assert.equal(response.response, 'User found');
        });
        it("Should return that vuyo_ma2 wasn't found in the DB", async () => {
            const userData = new UserData;
            let response = await userData.userData('vuyo_ma2');
            assert.strict.deepEqual(response, {
                response: 'Username vuyo_ma2 not found',
                user: { firstName: '', lastName: '', email: '', image: '',timeStamp: { created: "", lastSeen: "" } },
                status: false
            });
        });
    });
});

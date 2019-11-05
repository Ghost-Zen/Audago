import assert from 'assert';
import Account, { Iaccounts } from '../server/services/models/Accounts';
import mongoose from 'mongoose';
import CreateAccount from '../server/services/accounts/CreateAccount';
import UserData from '../server/services/accounts/UserData';

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
    });
    after(() => {
        mongoose.connection.close();
    });
    describe('Login service testing', () => {
        it("Should return with that Michael has logged in successfully and returns a token with true status", async () => {
            const createAccount = new CreateAccount;
            const userData = new UserData;
            let user: Iaccounts = {
                firstName: 'Micheal',
                lastName: 'Dollman',
                username: 'michaeldollman123',
                password: '12345',
                email: 'michaeldollman@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            }
            await createAccount.create(user);
            let response = await userData.loginData('michaeldollman123', '12345', 'michaeldollman@gmail.com')
            assert.strict.deepEqual(response.status, true);
        });
        it("Should return with an error that John's data could not be found, as the account wasn't made", async () => {
            const createAccount = new CreateAccount;
            const userData = new UserData;
            let user: Iaccounts = {
                firstName: 'Michael',
                lastName: 'Dollman',
                username: 'michaeldollman123',
                password: '12345',
                email: 'michaeldollman@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            }
            await createAccount.create(user);
            assert.strict.deepEqual(await userData.loginData('johnhope123', '12345', 'johnhope@gmail.com'), { response: 'Username johnhope123 not found', status: false });
        });
        it("Should return with an error that the entered password is  incorrect", async () => {
            const createAccount = new CreateAccount;
            const userData = new UserData;
            let user: Iaccounts = {
                firstName: 'Michael',
                lastName: 'Dollman',
                username: 'michaeldollman123',
                password: '12345',
                email: 'michaeldollman@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            }
            await createAccount.create(user);
            assert.strict.deepEqual(await userData.loginData('michaeldollman123', '1245', 'michaeldollman@gmail.com'), { response: 'Password incorrect', status: false });
        });
    });
    describe('User data return testing', () => {
        it("Should return all dyllanhope123's data from DB", async () => {

            const createAccount = new CreateAccount;
            const userData = new UserData;
            let user: Iaccounts = {
                firstName: 'Dyllan',
                lastName: 'Hope',
                username: 'dyllanhope123',
                password: '12345',
                email: 'dyllan@gmail.com',
                image: 'image@picture.url',
                active: true,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            }
            await createAccount.create(user);
            let response = await userData.userData('dyllanhope123');
            assert.strict.deepEqual(response, {
                response: 'User found',
                user: { firstName: 'Dyllan', lastName: 'Hope', email: 'dyllan@gmail.com', image: 'image@picture.url' },
                status: true
            });
        });
        it("Should return that johnhope123 wasn't found in the DB", async () => {

            const createAccount = new CreateAccount;
            const userData = new UserData;
            let user: Iaccounts = {
                firstName: 'Dyllan',
                lastName: 'Hope',
                username: 'dyllanhope123',
                password: '12345',
                email: 'dyllan@gmail.com',
                image: 'image@picture.url',
                active: true,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            }
            await createAccount.create(user);
            let response = await userData.userData('johnhope123');
            assert.strict.deepEqual(response, {
                response: 'Username johnhope123 not found',
                user: { firstName: '', lastName: '', email: '', image: '' },
                status: false
            });
        });
    });
});
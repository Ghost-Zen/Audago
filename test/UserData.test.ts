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
    it("Should return with Michael's username, password and email", async () => {
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
        assert.strict.deepEqual(await userData.loginData('michaeldollman123'), {
            username: 'michaeldollman123',
            password: '12345',
            email: 'michaeldollman@gmail.com'
        }
        );
    });
    it("Should return with an error that John's data could not be found, as the account wasn't made", async () => {
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
        assert.strict.deepEqual(await userData.loginData('johnhope123'),'User "johnhope123" not found');
    });
});
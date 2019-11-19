import assert from 'assert';
import Account, { Iaccounts } from '../server/services/models/Accounts';
import mongoose from 'mongoose';
import CreateAccount from '../server/services/accounts/CreateAccount';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db_tests';

describe('Testing the create account functionality', () => {
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
    })
    it('Should return that "Dyllan" was added as a new account', async () => {
        const createAccount = new CreateAccount;
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        await createAccount.create(user);

        Account.find({}, { '_id': 0, 'username': 1 })
            .then((accounts) => {
                assert.strict.equal(accounts[0].username, 'dyllanhope123');
            });
    });
    it('Should return that "Dyllan & Daniel" were added as new accounts', async () => {
        const createAccount = new CreateAccount;
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        await createAccount.create(user);
        user = {
            firstName: 'Daniel',
            lastName: 'Minter',
            username: 'danielminter123',
            password: 'Fwgr123#',
            email: 'danielminter@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        await createAccount.create(user);

        Account.find({})
            .then((accounts) => {
                assert.strict.equal(accounts[0].username, 'dyllanhope123');
                assert.strict.equal(accounts[1].username, 'danielminter123');
            });
    });
    it('Should return that "Dyllan" is already an existing account', async () => {
        const createAccount = new CreateAccount;
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        let status = await createAccount.create(user);
        assert.strict.deepEqual(status, { response: `Account created`, status: true });

        user = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        status = await createAccount.create(user);
        assert.strict.deepEqual(status, { response: `Username dyllanhope123 already exists`, status: false });
    });
    it('Should return an error message that all the fields need to be filled out', async () => {
        const createAccount = new CreateAccount;
        let user: Iaccounts = {
            firstName: '',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr123#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        let status = await createAccount.create(user);
        assert.strict.deepEqual(status, { response: 'Please fill out all the fields', status: false });
    });
    it('Should return that the entered pasword is too weak', async () => {
        const createAccount = new CreateAccount;
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: 'Fwgr12#',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            status:''
        }
        let response = await createAccount.create(user);
        assert.strict.deepEqual(response, { response: 'Your password is too weak', status: false });
    });
});
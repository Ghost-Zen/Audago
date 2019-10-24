import assert from 'assert';
import Account, { Iaccounts } from '../server/services/models/Accounts';
import mongoose from 'mongoose';
import CreateAccount from '../server/services/accounts/CreateAccount';
import UpdateAccount from '../server/services/accounts/UpdateAccount';

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
    });
    after(() => {
        mongoose.connection.close();
    });
    it("Should return that Michael's password has been changed/updated", async () => {
        const createAccount = new CreateAccount;
        const updateAccount = new UpdateAccount;
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
        let updatedUser: Iaccounts = {
            firstName: 'Micheal',
            lastName: 'Dollman',
            username: 'michaeldollman123',
            password: 'passme',
            email: 'michaeldollman@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        }
        await updateAccount.update('michaeldollman123', updatedUser);

        Account.find({}, { '_id': 0, 'password': 1 })
            .then((accounts) => {
                assert.strict.equal(accounts[0].password, 'passme');
            });
    });
    it("Should return that Dyllan's email has been updated", async () => {
        const createAccount = new CreateAccount;
        const updateAccount = new UpdateAccount;
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: '12345',
            email: 'dyllanhope@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        }
        await createAccount.create(user);
        let updatedUser: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: '12345',
            email: 'dyllan@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        }
        await updateAccount.update('dyllanhope123', updatedUser);

        Account.find({}, { '_id': 0, 'email': 1 })
            .then((accounts) => {
                assert.strict.equal(accounts[0].email, 'dyllan@gmail.com');
            });
    });
    it("Should return that Daniel's status, timestamp and image has been updated", async () => {
        const createAccount = new CreateAccount;
        const updateAccount = new UpdateAccount;
        let user: Iaccounts = {
            firstName: 'Daniel',
            lastName: 'Minter',
            username: 'danielminter123',
            password: '12345',
            email: 'danielminter@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        }
        await createAccount.create(user);
        let updatedUser: Iaccounts = {
            firstName: 'Daniel',
            lastName: 'Miner',
            username: 'danielminter123',
            password: '12345',
            email: 'danielminter@gmail.com',
            image: 'https://incrediblejagur.github.io/media/me.jpg',
            active: true,
            timestamp: {
                created: 'yesterday',
                lastSeen: 'today'
            }
        }
        await updateAccount.update('danielminter123', updatedUser);

        Account.find({}, { '_id': 0, 'active': 1, 'timestamp': 1, 'image': 1 })
            .then((accounts) => {
                assert.strict.equal(accounts[0].active, true);
                assert.strict.deepEqual(accounts[0].timestamp.created, 'yesterday');
                assert.strict.deepEqual(accounts[0].timestamp.lastSeen, 'today');
                assert.strict.deepEqual(accounts[0].image, 'https://incrediblejagur.github.io/media/me.jpg');
            });
    });
    it("Should return that Chris's first and last name has been updated", async () => {
        const createAccount = new CreateAccount;
        const updateAccount = new UpdateAccount;
        let user: Iaccounts = {
            firstName: 'Chris',
            lastName: 'Green',
            username: 'chrisgreen123',
            password: '12345',
            email: 'chrisgreen@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        }
        await createAccount.create(user);
        let updatedUser: Iaccounts = {
            firstName: 'Christopher',
            lastName: 'Greenings',
            username: 'chrisgreen123',
            password: '12345',
            email: 'chrisgreen@gmail.com',
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        }
        await updateAccount.update('chrisgreen123', updatedUser);

        Account.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1 })
            .then((accounts) => {
                assert.strict.equal(accounts[0].firstName, 'Christopher');
                assert.strict.equal(accounts[0].lastName, 'Greenings');
            });
    });
});
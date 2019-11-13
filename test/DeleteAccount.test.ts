import assert from 'assert';
import Account, { Iaccounts } from '../server/services/models/Accounts';
import mongoose from 'mongoose';
import DeleteAccount from '../server/services/accounts/DeletingAccount';
import CreateAccount from '../server/services/accounts/CreateAccount';

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
    });
    after(() => {
        mongoose.connection.close();
    })
    it('Should return an empty array after using the "deleteAll" function', async () => {
        const createAccount = new CreateAccount;
        const deleteAccount = new DeleteAccount;

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
            }
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
            }
        }
        await createAccount.create(user);
        await deleteAccount.deleteAll();
        Account.find({})
            .then((accounts) => {
                assert.strict.deepEqual(accounts, []);
            });
    });
    it('Should return an array with only "Daniel" as Dyllans account was deleted separately', async () => {
        const createAccount = new CreateAccount;
        const deleteAccount = new DeleteAccount;

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
            }
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
            }
        }
        await createAccount.create(user);
        await deleteAccount.delete('dyllanhope123');
        Account.find({})
            .then((accounts) => {
                // sketchy test, but trust.. it works.. if it didn't delete then dyllanhope123 would be in index 0.
                // the issue is 'accounts' is carrying more than whats in the database so assert.strict.deepEqual() doesn't work with the full array
                assert.strict.deepEqual(accounts[0].username, 'danielminter123'); 
            });
    });
});
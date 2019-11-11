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
        let updatedUser: any = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            email: 'dyllan@gmail.com',
        }
        await updateAccount.update('dyllanhope123', updatedUser);

        Account.find({}, { '_id': 0, 'email': 1 })
            .then((accounts) => {
                assert.strict.equal(accounts[0].email, 'dyllan@gmail.com');
            });
    });
    describe('User data changing testing', () => {
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
            let updatedUser: any = {
                firstName: 'Christopher',
                lastName: 'Greenings',
                email: 'chrisgreen@gmail.com',
            }
            await updateAccount.update('chrisgreen123', updatedUser);

            Account.findOne({}, { '_id': 0, 'firstName': 1, 'lastName': 1 })
                .then((accounts) => {
                    assert.strict.equal(accounts.firstName, 'Christopher');
                    assert.strict.equal(accounts.lastName, 'Greenings');
                });
        });
        it("Should return that Chris's email has been changed successfully", async () => {
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
            let updatedUser: any = {
                firstName: 'Chris',
                lastName: 'Green',
                email: 'chris@gmail.com',
            }
            await updateAccount.update('chrisgreen123', updatedUser);

            Account.findOne({}, { '_id': 0, 'email': 1 })
                .then((accounts) => {
                    assert.strict.equal(accounts.email, 'chris@gmail.com');
                });
        });
    });
    describe('Password changing testing', () => {
        it("Should return that John's password was successfully changed", async () => {
            const createAccount = new CreateAccount;
            const updateAccount = new UpdateAccount;
            let user: Iaccounts = {
                firstName: 'John',
                lastName: 'Hope',
                username: 'johnhope123',
                password: '12345',
                email: 'johnhope@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            }
            await createAccount.create(user);
            await updateAccount.updatePassword('johnhope123', '12345', 'House123', 'House123');
            let response = await updateAccount.updatePassword('johnhope123', 'House123', '12345', '12345');
            assert.strict.deepEqual(response, { response: 'Password updated', status: true });
        });
        it("Should return that dyllanhope123 was not found", async () => {
            const createAccount = new CreateAccount;
            const updateAccount = new UpdateAccount;
            let user: Iaccounts = {
                firstName: 'John',
                lastName: 'Hope',
                username: 'johnhope123',
                password: '12345',
                email: 'johnhope@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            }
            await createAccount.create(user);
            let response = await updateAccount.updatePassword('dyllanhope123', '12345', 'House123', 'House123');
            assert.strict.deepEqual(response, { response: 'Username dyllanhope123 not found', status: false });
        });
        it("Should return that the entered password was incorrect", async () => {
            const createAccount = new CreateAccount;
            const updateAccount = new UpdateAccount;
            let user: Iaccounts = {
                firstName: 'John',
                lastName: 'Hope',
                username: 'johnhope123',
                password: '12345',
                email: 'johnhope@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            }
            await createAccount.create(user);
            let response = await updateAccount.updatePassword('johnhope123', 'car', 'House123', 'House123');
            assert.strict.deepEqual(response, { response: 'Password incorrect', status: false });
        });
        it("Should return that the confirmation and new passwords do not match", async () => {
            const createAccount = new CreateAccount;
            const updateAccount = new UpdateAccount;
            let user: Iaccounts = {
                firstName: 'John',
                lastName: 'Hope',
                username: 'johnhope123',
                password: '12345',
                email: 'johnhope@gmail.com',
                image: '',
                active: false,
                timestamp: {
                    created: 'date',
                    lastSeen: 'date'
                }
            }
            await createAccount.create(user);
            let response = await updateAccount.updatePassword('johnhope123', 'car', 'House123', '12345');
            assert.strict.deepEqual(response, {
                response: 'Your New and Confirmation passwords do not match',
                status: false
            }
            );
        });
    });
});
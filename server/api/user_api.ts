import CreateAccount from '../services/accounts/CreateAccount';
import DeletingAccount from '../services/accounts/DeletingAccount';
import UserData from '../services/accounts/UserData';
import UpdateAccount from '../services/accounts/UpdateAccount';
import { Iaccounts } from '../services/models/Accounts';
const createAccount = new CreateAccount;
const deleteAccount = new DeletingAccount;
const userData = new UserData;
const updateAccount = new UpdateAccount;
export default class UserApi {

    async userSignUp(req, res) {
        let { firstName, lastName, username, password, email } = req.body;
        let user: Iaccounts = {
            firstName,
            lastName,
            username,
            password,
            email,
            image: '',
            active: true,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        }
        res.json({
            staus: 'success',
            exists: await createAccount.create(user)
        });
    }

    deleteUser(req, res) {
        let { username } = req.body;
        deleteAccount.delete(username);
        res.json({
            status: 'success'
        });
    }

    userSignIn(req, res) {

    }

    async getUserData(req, res) {
        const username = req.params.user;
        res.json({
            status: 'success',
            response: await userData.loginData(username)
        })
    }

    async editUserData(req, res) {
        let user: Iaccounts = {
            firstName: 'Dyllan',
            lastName: 'Hope',
            username: 'dyllanhope123',
            password: '12345',
            email: 'dyllanjhope@gmail.com',
            image: '',
            active: true,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        }
        await updateAccount.update('danielminter123', user);
        res.json({
            status: 'success'
        });
    }


}
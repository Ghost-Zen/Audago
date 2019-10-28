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
                created: '',
                lastSeen: '',
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
        let { firstName, lastName, username, password, email, image, active, timestamp } = req.body;
        let user: Iaccounts = {
            firstName,
            lastName,
            username,
            password,
            email,
            image,
            active,
            timestamp
        }
        await updateAccount.update(username, user);
        res.json({
            status: 'success'
        });
    }


}
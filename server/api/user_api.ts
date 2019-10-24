import CreateAccount from '../services/accounts/CreateAccount';
import DeletingAccount from '../services/accounts/DeletingAccount';
import { Iaccounts } from '../services/models/Accounts';
const createAccount = new CreateAccount;
const deleteAccount = new DeletingAccount;
export default class UserApi {

    async userSignUp(req, res) {
        // let { firstName, lastName, username, password, email } = req.body;
        let user: Iaccounts = {
            firstName: 'Daniel',
            lastName: 'Minter',
            username: 'danielminter123',
            password: '12345',
            email: 'danielminter@gmail.com',
            image: '',
            active: true,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            }
        }
        await createAccount.create(user)
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

    getUserData(req, res) {
        res.json({
            status: 'Dummy Data',
            response: { firstname: 'John', lastname: 'Doe', username: 'johndoe123' }
        })
    }

    editUserData(req, res) {

    }


}
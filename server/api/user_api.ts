import CreateAccount from '../services/accounts/CreateAccount';
import DeletingAccount from '../services/accounts/DeletingAccount';
const createAccount = new CreateAccount;
const deleteAccount = new DeletingAccount;
export default class UserApi {

    userSignUp(req, res) {
        let { firstName, lastName, username, password, email } = req.body;
        let user = {
            firstName,
            lastName,
            username,
            password,
            email,
            image: '',
            active: false,
            timestamp: {
                created: 'date',
                lastSeen: 'date'
            },
            playlists: ['house']
        }
        createAccount.create(user)
    }

    deleteUser(req,res){
      let {username} = req.body;
      deleteAccount.delete(username);
      res.json({
        status:'success'
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
import CreateAccount from '../services/accounts/CreateAccount';
const createAccount = new CreateAccount
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
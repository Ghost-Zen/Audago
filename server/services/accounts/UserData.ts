import Account from '../models/Accounts';

export default class UserData {
    async loginData(username: string, password: string, email: string) {
        let found: boolean = false;
        let data: any = { username: '', password: '', email: '' };
        if (username.trim()) {
            await Account.findOne({ username: username }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1 })   // searching for user's data only want the username, password and email
                .then(res => {                                                                                      //if a record was found with that username then return the user's data
                    if (res) {
                        data.username = res.username;
                        data.password = res.password;
                        data.email = res.email;
                        found = true;
                    }
                })
            if (found) {
                if (password === data.password) {
                    return { response: `You logged in successfully!`, status: true };
                } else {
                    return { response: `Password incorrect`, status: false };
                }
            } else {
                return { response: `Username ${username} not found`, status: false };                                                             //if the user's data isn't found then return an error
            }
        } else {
            return {response: `Please enter a username`, status: false};
        }
    };
}
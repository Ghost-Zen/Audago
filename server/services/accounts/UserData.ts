import Account from '../models/Accounts';

export default class UserData {
    async loginData(username: string) {
        let found: boolean = false;
        let data: any = { username: '', password: '', email: '' };
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
            return data;
        } else {
            return `User "${username}" not found`;                                                              //if the user's data isn't found then return an error
        }
    };
}
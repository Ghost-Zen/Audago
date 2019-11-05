import Account from '../models/Accounts';

export default class UserData {
    async loginData(username: string, password: string, email: string) {
        let found: boolean = false;
        let data: any = { username: '', password: '', email: '' };
        if (username.trim()) {
            await Account.findOne({ username: username }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1 })   // searching for user's data only want the username, password and email
                .then(async (res) => {
                    if (res) {      //if a document is found with the user name, load data for check
                        data.username = res.username;
                        data.password = res.password;
                        data.email = res.email;
                        found = true;
                    } else {        //if no document is found for username, check if an email was entered
                        await Account.findOne({ email: email }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1 })
                            .then(res => {
                                if (res) {      //if a document is found for email, load data for check
                                    data.username = res.username;
                                    data.password = res.password;
                                    data.email = res.email;
                                    found = true;
                                }
                            });
                    }
                })
            // Returning separate from code as returns don't work in a promise
            if (found) {
                if (password === data.password) {
                    return { response: `You logged in successfully!`, status: true };
                } else {
                    return { response: `Password incorrect`, status: false };
                }
            } else {
                return { response: `Username ${username} not found`, status: false };
            }
        } else {
            return { response: `Please enter a username`, status: false };
        }
    };
}
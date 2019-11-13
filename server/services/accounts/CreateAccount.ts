import Accounts, { Iaccounts } from '../models/Accounts';
import bcrypt from 'bcrypt';
const saltRounds = 10;
export default class CreateAccount {

    async create(account: Iaccounts) {
        let strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        if (account.firstName && account.lastName && account.password && account.email && account.username) {
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let date = new Date();
            let created = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            let exists = false;
            account.timestamp = { created: "", lastSeen: "" }
            account.timestamp.created = created;
            account.timestamp.lastSeen = created;
            let passTest = strongPassRegex.test(account.password);
            if (passTest) {
                await bcrypt.hash(account.password, saltRounds).then(function (hash) {
                    account.password = hash
                });
                let user = new Accounts(account)
                await Accounts.findOne({ username: user.username })     //search for username (unique field) in DB
                    .then(res => {
                        if (res) {      //checking if there was a response for the user (if that account doesn't exists)
                            exists = true;
                        }
                    });
                // Returning separate from code as returns don't work in a promise
                if (!exists) {
                    await user.save();
                    return { response: `Account created`, status: true };       //if account created successfully return this message 
                } else {
                    return { response: `Username ${account.username} already exists`, status: false };  //return whether the account exists or not
                }
            } else {
                return { response: 'Your password is too weak', status: false };
            }
        } else {
            return { response: 'Please fill out all the fields', status: false };
        }
    }
}

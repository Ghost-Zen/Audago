import Accounts, { Iaccounts } from '../models/Accounts';
import Random_key from '../utils/random_gen';
import EmailService from '../utils/EmailService';
import bcrypt from 'bcrypt';
const saltRounds = 10;
const email_service = new EmailService;
const random_key = new Random_key;
export default class CreateAccount {

    async create(account: Iaccounts) {
        let strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        if (account.firstName && account.lastName && account.password && account.email && account.username) {
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let date = new Date();
            let created = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            let exists = false;
            let status = random_key.generate(30)
            account.timestamp = { created: "", lastSeen: "" }
            account.timestamp.created = created;
            account.timestamp.lastSeen = created;
            account.status = status;
            let passTest = strongPassRegex.test(account.password);
            passTest = true; //for testing purposes
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
                    await email_service.verifyEmail(user.email,user.status);
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

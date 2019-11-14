import Accounts, { Iaccounts } from '../models/Accounts';
import Random_key from '../utils/random_gen';
import bcrypt from 'bcrypt';
import EmailService from '../utils/EmailService';
const saltRounds = 10;
const email_service = new EmailService;
const random_key = new Random_key;
export default class CreateAccount {

    async create(account: Iaccounts) {
        if (account.firstName && account.lastName && account.password && account.email && account.username) {
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let date = new Date();
            let created = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            let exists = false;
            let status = random_key.generate(10)
            account.timestamp = { created: "", lastSeen: "" }
            account.timestamp.created = created;
            account.timestamp.lastSeen = created;
            account.status = status;
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
                await email_service.verifyEmail()
                return { response: `Account created`, status: true };       //if account created successfully return this message
            } else {
                return { response: `Username ${account.username} already exists`, status: false };  //return whether the account exists or not
            }
        } else {
            return {response: 'Please fill out all the fields', status: false};
        }
    }
}

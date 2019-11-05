import Accounts, { Iaccounts } from '../models/Accounts';

export default class CreateAccount {

    async create(account: Iaccounts) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = new Date();
        let created = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        let exists = false;
        account.timestamp = {created:"",lastSeen:""}
        account.timestamp.created = created;
        account.timestamp.lastSeen = created;
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
            return { response: `Username ${account.username} already exists`, status:false }  //return whether the account exists or not
        }
    }
}

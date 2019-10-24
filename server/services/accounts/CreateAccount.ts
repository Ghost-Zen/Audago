import Accounts, { Iaccounts } from '../models/Accounts';

export default class CreateAccount {

    async create(account: Iaccounts) {
        let exists = false;
        let user = new Accounts(account)
        //search for username (unique field) in DB
        await Accounts.find({ username: user.username })
        //returns array, if empty then the record doesn't exist else the username is already in use
            .then(res => {
                //checking if their was a response for the user (if that account doesn't exists)
                if (res.length > 0) {
                    exists = true;
                }
            });
        if (!exists) {
            //if account is new, add it
            await user.save();
        }
        //return whether the account exists or not, reference for when we want to return an error
        return exists;
    }
}

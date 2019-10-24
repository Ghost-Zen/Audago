import Accounts, { Iaccounts } from '../models/Accounts';

export default class CreateAccount {

    async create(account: Iaccounts) {
        let exists = false;
        let user = new Accounts(account)
        await Accounts.find({ username: user.username })    //search for username (unique field) in DB
            .then(res => {                                  //returns array, if empty then the record doesn't exist else the username is already in use
                if (res.length > 0) {                       //checking if their was a response for the user (if that account doesn't exists)
                    exists = true;
                }
            });
        if (!exists) {
            await user.save();                              //if account is new, add it
        }
        return exists;                                      //return whether the acocunt exists or not, reference for when we want to return an error.
    }
}

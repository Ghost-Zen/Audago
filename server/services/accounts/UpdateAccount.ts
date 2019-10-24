import Account, { Iaccounts } from '../models/Accounts';

// *** NEEDS WORK or DISCUSSION ON HOW WE WANT THIS TO WORK ***

export default class UpdateAccount {
    async update(username: string, account: Iaccounts) {    //parameters will all be loaded in together so original info stays while new info updates
        await Account.updateOne({username}, account);       //use the username as a primary key
    }
}
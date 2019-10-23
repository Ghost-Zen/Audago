import Accounts, { Iaccounts } from '../models/Accounts';

export default class CreateAccount {

    async create(account: Iaccounts) {
           let user = new Accounts(account)
            await user.save()
            console.log(`${account.username} has been added!`)
        }
}

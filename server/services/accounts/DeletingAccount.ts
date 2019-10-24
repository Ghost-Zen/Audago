import Account from '../models/Accounts';

export default class DeleteAccount {
    //deleting specific users
    async delete(username: string) {
        await Account.deleteOne({ username: username });
    }
    //deleting all users
    async deleteAll() {
        await Account.deleteMany({});
    }
}


import Account from '../models/Accounts';

export default class DeleteAccount {
    async delete(username: string) {
        await Account.deleteOne({ username: username });
    }
    async deleteAll() {
        await Account.deleteMany({});
    }
}


import Account from '../models/Accounts';

export default class DeleteAccount {
    async delete(username: string) {
        await Account.deleteOne({ username: username });
        console.log(`${username} was deleted!`);
    }
    async deleteAll() {
        await Account.deleteMany({});
        console.log('All accounts deleted!')
    }
}


import Account from '../models/Accounts';

export default class DeleteAccount {
    //deleting specific users
    async delete(username: string) {
        await Account.deleteOne({ username: username });
        return { response: `User ${username} deleted successfully`, status: true }
    }
    //deleting all users
    async deleteAll() {
        await Account.deleteMany({});
        return { response: `All users deleted!`, status: true };
    }
}


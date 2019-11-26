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
    async deactivateAccount(username: string) {
        let res = await Account.findOne({ username });
        if (res) {
            await Account.updateOne({ username }, { active: false });
            return { response: 'Account deactivated', status: true };
        } else {
            return { response: 'Account not found', status: false };
        }
    }
    async activateAccount(username: string) {
        let res = await Account.findOne({ username });
        if (res) {
            await Account.updateOne({ username }, { active: true });
            return { response: 'Account activated', status: true };
        } else {
            return { response: 'Account not found', status: false };
        }
    }
}


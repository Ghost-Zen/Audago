import Account, { UpdateData } from '../models/Accounts';
import bcrypt from 'bcrypt';

// *** NEEDS WORK or DISCUSSION ON HOW WE WANT THIS TO WORK ***

export default class UpdateAccount {
    async update(username: string, updateData: UpdateData) {    //parameters will all be loaded in together so original info stays while new info updates
        await Account.updateOne({ username }, { firstName: updateData.firstName, lastName: updateData.lastName, email: updateData.email });
        return { response: `Account updated successfully!`, status: true };
    }
    async updatePassword(username: string, currentPass: string, newPass: string) {
        let password: string = ''
        let found: boolean = false;
        let matched: boolean = false;
        await Account.findOne({ username })
            .then(async (res) => {
                if (res) {
                    found = true
                    const match = await bcrypt.compare(currentPass, res.password);
                    if (match) {
                        matched = true;
                        await bcrypt.hash(newPass, 10).then(function (hash) {
                            password = hash
                        });
                        await Account.updateOne({ username }, { password });
                    }
                }
            });
        if (!found) {
            return { response: `Username ${username} not found`, status: false };
        } else if (!matched) {
            return { response: `Password incorrect`, status: false };
        } else {
            return {response: `Password updated`, status: true};
        }
    }
}
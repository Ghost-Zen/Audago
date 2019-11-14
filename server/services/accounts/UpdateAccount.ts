import Account, { UpdateData } from '../models/Accounts';
import bcrypt from 'bcrypt';

export default class UpdateAccount {
    async update(username: string, updateData: UpdateData) {    //parameters will all be loaded in together so original info stays while new info updates
        await Account.findOne({ username })
            .then(res => {
                for (const item in updateData) {
                    if (!updateData[item]) {
                        updateData[item] = res[item];
                    }
                }
            })
        await Account.updateOne({ username }, { firstName: updateData.firstName, lastName: updateData.lastName, email: updateData.email });
        return { response: `Account updated successfully!`, status: true };
    }
    async updatePassword(username: string, currentPass: string, newPass: string, testPass: string) {
        let strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        let password: string = ''
        let found: boolean = false;
        let matched: boolean = false;
        if (testPass === newPass) {
            if (strongPassRegex.test(newPass)) {
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
            } else {
                return {response: 'The entered password is too weak', status: false}
            }
        } else {
            return { response: 'Your New and Confirmation passwords do not match', status: false }
        }
        if (!found) {
            return { response: `Username ${username} not found`, status: false };
        } else if (!matched) {
            return { response: `Password incorrect`, status: false };
        } else {
            return { response: `Password updated`, status: true };
        }
    }
}
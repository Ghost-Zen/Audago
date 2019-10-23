import mongoose from 'mongoose';
import Accounts, { Iaccounts } from '../models/Accounts';

export default class CreateAccount {

    create(account: Iaccounts) {
           let user = new Accounts(account)
            user.save()
        }
}

import mongoose from 'mongoose';
import Account, { Iaccounts } from '../models/Accounts';

export default class DeleteAccount{
    async delete(username: string){
        await Account.deleteOne({username: username});
    }
}


    //   const account: Iaccounts = new Accounts({
    //     firstName: 'Dyllan',
    //     lastName: 'Hope',
    //     username: 'dyllanhope123',
    //     password: '12345',
    //     email: 'dyllanjhope@gmail.com',
    //     image: '',
    //     active: true,
    //     timestamp: {
    //         created: 'date',
    //         lastSeen: 'date'
    //     },
    //     playlists: ['trance','chill','rap']
    // });
    //   await account.save();
    //   console.log("done!");

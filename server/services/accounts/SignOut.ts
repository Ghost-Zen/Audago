import Account from '../models/Accounts';

export default class SignOut {

    async signOut(username, date){
        let res = await Account.findOne({username});
        let timestamp = res.timestamp;
        timestamp.lastSeen = date;
        await Account.updateOne({username},{timestamp});
        return{response:'Signed out successfully'};
    }

    async signIn(username){
        let res = await Account.findOne({username});
        let timestamp = res.timestamp;
        timestamp.lastSeen = 'online';
        await Account.updateOne({username},{timestamp});
        return{response:'Signed in successfully'};
    }

}


import Account from '../models/Accounts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import EmailService from '../utils/EmailService';
const email_service = new EmailService;

export default class UserData {

    async verifyAccount(email: string, token: string) {
        await Account.findOne({ email: email }, { '_id': 0, 'status': 1 })
            .then(async (res) => {
                if (res) {
                    if (res.status === token) {
                        await Account.updateOne({ email }, { status: 'verified' })
                    }
                } else {
                    return { response: `User by email ${email} not found`, status: '404' }
                }
            })
    }

    async userData(username: string) {
        let found: boolean = false;
        let data = { firstName: '', lastName: '', email: '', image: '', active: false, timeStamp: { created: '', lastSeen: '' } };
        await Account.findOne({ username })
            .then(res => {
                if (res) {        //check if account is in document
                    data.firstName = res.firstName;
                    data.lastName = res.lastName;
                    data.email = res.email;
                    data.image = res.image;
                    data.active = res.active;
                    data.timeStamp = res.timestamp;
                    found = true;
                }
            });
        if (found) {
            return { response: 'User found', user: data, status: true };
        } else {
            return { response: `Username ${username} not found`, user: data, status: false }
        }
    }

    async loginData(username: string, password: string) {
        let found: boolean = false;
        let timestamp: any;
        let hash;
        let data: any = { username: '' };
        if (username.trim()) {
            await Account.findOne({ username: username }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1, 'status': 1, 'timestamp': 1 })   // searching for user's data only want the username, password and email
                .then(async (res) => {
                    if (res) {      //if a document is found with the user name, load data for check
                        data.username = res.username;
                        data.status = res.status;
                        hash = res.password;
                        timestamp = res.timestamp;
                        found = true;
                    } else {        //if no document is found for username, check if an email was entered
                        await Account.findOne({ email: username }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1, 'status': 1, 'timestamp': 1 })
                            .then(res => {
                                if (res) {      //if a document is found for email, load data for check
                                    data.username = res.username;
                                    data.status = res.status;
                                    hash = res.password;
                                    timestamp = res.timestamp;
                                    found = true;
                                }
                            });
                    }
                })
            // Returning separate from code as returns don't work in a promise
            if (found) {
                const match = await bcrypt.compare(password, hash);
                if (match) {
                    // if(data.status === 'verified'){
                    let token = jwt.sign({ data }, process.env.JWT_SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    timestamp.lastSeen = 'online';
                    await Account.updateOne({ username: data.username }, { timestamp });
                    return { response: token, username: data.username, status: true };
                    // }else{
                    //   let emailUserAgain = email_service.verifyEmail(data.email,data.status) //email user everytime he forgets to verify and tries to login.
                    //   return { response: `Account not verified, check your emails`, status: false }; //added email verification link just for dev purposes
                    // }
                }
            }
            return { response: 'Please enter the correct username and password', status: false };
        } else {
            return { response: `Please enter a username`, status: false };
        }
    };
}

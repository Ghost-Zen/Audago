import Account from '../models/Accounts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Config } from './config';

export default class UserData {
    async userData(username: string) {
        let found: boolean = false;
        let data = { firstName: '', lastName: '', email: '', image: '' };
        await Account.findOne({ username })
            .then(res => {
                if (res) {        //check if account is in document
                    data.firstName = res.firstName;
                    data.lastName = res.lastName;
                    data.email = res.email;
                    data.image = res.image;
                    found = true
                }
            });
        if (found) {
            return { response: 'User found', user: data, status: true };
        } else {
            return {response:`Username ${username} not found`, user: data, status: false}
        }
    }

    async loginData(username: string, password: string, email: string) {
        let found: boolean = false;
        let data: any = { username: '', password: '', email: '' };
        if (username.trim()) {
            await Account.findOne({ username: username }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1 })   // searching for user's data only want the username, password and email
                .then(async (res) => {
                    if (res) {      //if a document is found with the user name, load data for check
                        data.username = res.username;
                        data.password = res.password;
                        data.email = res.email;
                        found = true;
                    } else {        //if no document is found for username, check if an email was entered
                        await Account.findOne({ email: email }, { '_id': 0, 'username': 1, 'password': 1, 'email': 1 })
                            .then(res => {
                                if (res) {      //if a document is found for email, load data for check
                                    data.username = res.username;
                                    data.password = res.password;
                                    data.email = res.email;
                                    found = true;
                                }
                            });
                    }
                })
            const match = await bcrypt.compare(password, data.password);
            // Returning separate from code as returns don't work in a promise
            if (found) {
                if (match) {
                    let token = jwt.sign({ data }, Config.SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    return { response: token, status: true };
                } else {
                    return { response: `Password incorrect`, status: false };
                }
            } else {
                return { response: `Username ${username} not found`, status: false };
            }
        } else {
            return { response: `Please enter a username`, status: false };
        }
    };
}
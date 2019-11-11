import mongoose, { Schema, Document } from 'mongoose';

export interface Iaccounts{
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    image: string;
    active: boolean;
    timestamp: {
        created: any;
        lastSeen: string;
    };
}

export interface UpdateData {
    firstName: string,
    lastName: string
    email: string
}

interface UserModel extends Iaccounts, Document {}

const AccountSchema: Schema = new Schema({
    "firstName": { "type": String, "required": true, "unique": false },
    "lastName": { "type": String, "required": true, "unique": false },
    "username": { "type": String, "required": true, "unique": true },
    "password": { "type": String, "required": true, "bcrypt": true },
    "email": { "type": String, "required": true, "unique": true },
    "image": { "type": String, "required": false },
    "active": { "type": Boolean, "required": true },
    "timestamp": {
        "created": { "type": String, "required": true, "unique": false },
        "lastSeen": { "type": String, "required": true, "unique": false },
    }
});

export default mongoose.model<UserModel>('Accounts', AccountSchema);

// sample data for this schema
// {
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
//     }
// }
import mongoose, { Schema, Document } from 'mongoose';

export interface Iaccounts {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    image: string;
    active: boolean;
    timestamp: {
        created: string;
        lastSeen: string;
    };
    playlists: Array<string>;
}

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
    },
    "playlists": {"type": [String], "required":false, "unique": false}
});

export default mongoose.model('Accounts', AccountSchema);

// sample data for this schema
// {
//     firstName: 'John',
//     lastName: 'Doe',
//     username: 'johndoe123',
//     password; '12345',
//     email: 'johndoe@gmail.com',
//     image: '',
//     active: false,
//     timestamp: {
//         created: 'date',
//         lastSeen: 'date'
//     },
//     playlists: ['house','chill','rap']
// }
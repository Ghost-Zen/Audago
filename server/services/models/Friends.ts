import mongoose, { Schema, Document } from 'mongoose';

export interface Ifriends{
  requester: string;
  receiver: string;
  confirmed: boolean;
}

interface friendModel extends Ifriends, Document {}
// linking table between 2 usernames
const FriendSchema: Schema = new Schema({
    "requester": { "type": String, "required": true, "unique": false },
    "receiver": {"type": String, "required":true, "unique":false},
    "confirmed": {"type": Boolean, "require": true, "unique": false }
});

export default mongoose.model<friendModel>('Friends', FriendSchema);

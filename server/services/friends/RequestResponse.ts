import Friends from '../models/Friends';
export default class AcceptRequest {

    async AcceptRequest(username: string, friend: string) {
        let found: boolean = false;
        let check = await Friends.findOne({ requester: username, receiver: friend });
        if (!check) {
            check = await Friends.findOne({ requester: friend, receiver: username });
            if (check) {
                found = true;
            }
        } else {
            found = true
        }

        if (!found) {
            return { response: 'Request not found', status: false }
        } else {
            await Friends.updateOne({ _id: check._id }, { confirmed: true });
            return { response: `Successfully accepted friend request between ${username} & ${friend}`, status: true };
        }
    }

    async DenyRequest(username: string, friend: string) {
        let found: boolean = false;
        let check = await Friends.findOne({ requester: username, receiver: friend });
        if (!check) {
            check = await Friends.findOne({ requester: friend, receiver: username });
            if (check) {
                await Friends.deleteOne({ requester: friend, receiver: username });
                found = true;
            }
        } else {
            await Friends.deleteOne({ requester: username, receiver: friend });
            found = true;
        }
        if (!found) {
            return { response: 'Request not found', status: false }
        } else {
            return { response: `The request from ${friend} was denied`, status: true };
        }
    }
}

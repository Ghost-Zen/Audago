import Friends from '../models/Friends';

export default class DeleteFriend {
    async delete(username: string, friend: string) {
        let res = await Friends.findOne({ requester: friend, receiver: username });
        if (!res) {
            res = await Friends.findOne({ requester: username, receiver: friend });
            if (!res) {
                return { response: `There is no friendship bewtween ${username} and ${friend}`, status: false }
            } else {
                await Friends.deleteOne({ requester: username, receiver: friend });
            }
        } else {
            await Friends.deleteOne({ requester: friend, receiver: username });
        }

        return { response: `${friend} has been removed from your friends list`, status: true };
    }
}
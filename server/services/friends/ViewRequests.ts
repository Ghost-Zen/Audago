import Friends from '../models/Friends';
import Accounts from '../models/Accounts';
export default class ViewRequests {

    async ViewRequests(username: string) {
        let requesters = [];
        let res = await Friends.find({ receiver: username, confirmed: false });
        if (res.length > 0) {
            for (const request of res) {
                let image = await Accounts.findOne({ username });
                let item = { friend: request.requester, image: image.image };
                requesters.push(item);
            }
            return { response: 'Friends found', data: requesters, status: true }
        } else {
            return { response: 'No requests', status: false }
        };
    }

    async ViewFriends(username: string) {
        let friendList = [];
        let res = await Friends.find({ requester: username, confirmed: true });
        if (res.length === 0) {
            res = await Friends.find({ receiver: username, confirmed: true });
            if (res.length === 0) {
                return { response: 'No friends found', status: false };
            } else {
                for (const friend of res) {
                    friendList.push(friend.requester);
                }
            }
        } else {
            for (const friend of res) {
                friendList.push(friend.receiver);
            }
            res = await Friends.find({ receiver: username, confirmed: true });
            if (res.length > 0) {
                for (const friend of res) {
                    friendList.push(friend.requester);
                }
            }
        }
        let activeFriends = [];
        for (const friend of friendList) {
            let result = await Accounts.findOne({ username: friend, active: true });
            if (result) {
                activeFriends.push({ friend, image: result.image });
            }
        }
        if (activeFriends.length === 0) {
            return { response: 'No friends found', status: false };
        } else {
            return { response: 'Friends found', data: activeFriends, status: true };
        }
    }
}

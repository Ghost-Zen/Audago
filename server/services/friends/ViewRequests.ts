import Friends from '../models/Friends';
export default class ViewRequests {

    async ViewRequests(username: string) {
        let requesters = [];
        let res = await Friends.find({ receiver: username });
        if (res.length > 0) {
            for (const request of res) {
                requesters.push(request.requester);
            }
            return { response: 'Friends found', requesters, status: true }
        } else {
            return { response: 'No requests', status: false }
        };
    }

    async ViewFriends(username: string) {
        let friendList = [];
        
    }
}

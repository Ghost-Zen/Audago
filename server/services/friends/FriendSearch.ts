import Accounts from '../models/Accounts';
import ViewRequests from './ViewRequests';
const viewRequests = new ViewRequests;

export default class FriendSearch {
    async search(username: string, search: string) {
        let activeFriends = await viewRequests.ViewFriends(username);
        let searchResult = [];
         if (search.trim() === '') {
            let res = await Accounts.find({ active: true });
            for (const account of res) {
                let found = false;
                if (username !== account.username) {
                  if(activeFriends.data){
                    for (const user of activeFriends.data) {
                        if (user.friend === account.username) {
                            found = true;
                        }
                    }
                  }
                    if (!found) {
                        let item = { friend: account.username, image: account.image };
                        searchResult.push(item);
                    }
                }
            }
        } else {
            let res = await Accounts.findOne({ username: search, active: true });
            if (res) {
                let item = { friend: res.username, image: res.image };
                searchResult.push(item);
            }
        }

        if (searchResult.length > 0) {
            return { response: 'Users found', data: searchResult, status: true }
        } else {
            return { response: 'No users found', status: false }
        }
    }
}

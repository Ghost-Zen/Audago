import Friends from '../models/Friends';
export default class SendRequest {

  async FriendRequest(requester: string, receiver: string) {
    let res = await Friends.findOne({ requester, receiver });
    let exists: boolean = false;
    if (!res) {   //check if the current request exists
      let check = await Friends.findOne({ requester: receiver, receiver: requester });
      if (!check) {   //check if the invers of the request exists
        let request = new Friends({ requester, receiver, confirmed: false });
        await request.save();
        return { response: 'Friend request sent', status: true };
      } else {
        exists = true;
      }
    } else {
      exists = true;
    }

    if (exists) {
      return { response: 'Friend request already exists', status: false }
    }
  }
}

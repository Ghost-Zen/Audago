import CreateAccount from '../services/accounts/CreateAccount';
import DeletingAccount from '../services/accounts/DeletingAccount';
import UserData from '../services/accounts/UserData';
import UpdateAccount from '../services/accounts/UpdateAccount';
import { Iaccounts } from '../services/models/Accounts';
import { Iplaylist } from '../services/models/Playlists';
import { CreatePlaylist } from '../services/playlists/CreatePlaylist';
const createAccount = new CreateAccount;
const deleteAccount = new DeletingAccount;
const userData = new UserData;
const updateAccount = new UpdateAccount;
const createPlaylist = new CreatePlaylist;
export default class UserApi {

    async userSignUp(req, res) {
        let { firstName, lastName, username, password, email } = req.body;
        let user: Iaccounts = {
            firstName,
            lastName,
            username,
            password,
            email,
            image: '',
            active: true,
            timestamp: {
                created: '',
                lastSeen: '',
            }
        }
        res.json({
            staus: 'success',
            exists: await createAccount.create(user)
        });
    }

    deleteUser(req, res) {
        let { username } = req.body;
        deleteAccount.delete(username);
        res.json({
            status: 'success'
        });
    }

    userSignIn(req, res) {

    }

    // async getUserData(req, res) {
    //     const username = req.params.user;
    //     res.json({
    //         status: 'success',
    //         response: await userData.loginData(username)
    //     })
    // }

    async editUserData(req, res) {
        let { firstName, lastName, username, password, email, image, active, timestamp } = req.body;
        let user: Iaccounts = {
            firstName,
            lastName,
            username,
            password,
            email,
            image,
            active,
            timestamp
        }
        await updateAccount.update(username, user);
        res.json({
            status: 'success'
        });
    }

    async createPlaylist(req, res) {
        let playlist: Iplaylist = {
            name: '2019 House',
            follower_count: 0,
            creator: 'dyllanhope123',
            song_count: 0
        }
        // await createPlaylist.create(playlist);
        await createPlaylist.addToPlaylist({song:'Middle Child', artist:'J. Cole', playlist_name:'2019 Rap'});
    }


}
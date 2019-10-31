import CreateAccount from '../services/accounts/CreateAccount';
import DeleteAccount from '../services/accounts/DeletingAccount';
import UpdateAccount from '../services/accounts/UpdateAccount';
import UserData from '../services/accounts/UserData';
import SearchSong from '../services/songsearch';
import { CreatePlaylist } from '../services/playlists/CreatePlaylist';
import RemoveTrack from '../services/playlists/RemoveTrack';
const userData = new UserData();
const createAccount = new CreateAccount;
const searchSong = new SearchSong()
const deleteAccount = new DeleteAccount;
const updateAccount = new UpdateAccount;

const Query = {
    hello: () => 'Hello World',
    test: () => 'Test Success, GraphQL server is up & running !!',
    createAccount: async (input) => {
        return await createAccount.create(input)
    },
    searchSong: async (input) => {
        let result = await searchSong.getFromItunesAPI(input)
        return {response: result}
    },
    loginCheck: async (input) => {
        return await userData.loginData(input.username, input.password, input.email);
    },
    deleteUser: async (input) => {
        return await deleteAccount.delete(input.username);
    },
    deleteAll: async () => {
        return await deleteAccount.deleteAll();
    },
    updateUser: async (input) => {
        return await updateAccount.update(input.username, input.account);
    }
}
export default Query
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
const createPlaylist = new CreatePlaylist;
const removeTrack = new RemoveTrack;

const Query = {
    hello: () => 'Hello World',
    test: () => 'Test Success, GraphQL server is up & running !!',
    createAccount: async (input) => {
        return await createAccount.create(input)
    },
    searchSong: async (input) => {
        console.log(input)
        let result = await searchSong.getFromItunesAPI(input)
        return { search: result }
    },
    loginCheck: async (input) => {
        return await userData.loginData(input.username, input.password, input.email);
    },
    deleteUser: async (input) => {
        return await deleteAccount.delete(input.username);
    },
    updateUser: async (input) => {
        return await updateAccount.update(input.username, input.account); //input.account needs to match Iaccounts interface in ../server/services.models/Accounts.ts
    },
    newPlaylist: async (input) => {
        return await createPlaylist.create(input.playlist);     //input.playlist needs to match Iplaylist interface in ../server/services/models/Playlists.ts
    },
    newTrack: async (input) => {
        return await createPlaylist.addToPlaylist(input.track); //input.track needs to match TrackInfo interface in ../server/services/models/Playlists.ts
    },
    deleteTrack: async (input) => {
        return await removeTrack.remove(input.track);           //input.track needs to match TrackInfo interface in ../server/services/models/Playlists.ts
    },
    deleteAll: async () => {
        return await deleteAccount.deleteAll();
    }
}
export default Query
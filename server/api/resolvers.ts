import CreateAccount from '../services/accounts/CreateAccount';
import SearchSong from '../services/songsearch';
import UserData from '../services/accounts/UserData';
const userData = new UserData();
const Query = {
    hello: () => 'Hello World',
    test: () => 'Test Success, GraphQL server is up & running !!',
    createAccount: async (input) => {
        const createAccount = new CreateAccount;
        return await createAccount.create(input)
    },
    searchSong: async (input) => {
        console.log(input)
        const searchSong = new SearchSong()
        let result = await searchSong.getFromItunesAPI(input)
        // console.log(result)
        return {search: result}
    },
    
    loginCheck: async (input) => {
        return await userData.loginData(input.username, input.password, input.email);
    }
}
export default Query
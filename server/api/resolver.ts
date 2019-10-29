import CreateAccount from '../services/accounts/CreateAccount';
import SearchSong from '../services/songsearch';
import UserData from '../services/accounts/UserData';
const userData = new UserData();
const Query = {
    hello: () => 'Hello World',
    test: () => 'Test Success, GraphQL server is up & running !!',
    createAccount: async (input) => {
        console.log(input)
        const createAccount = new CreateAccount;
        // await createAccount.create(input) commented out must fix schema for graphql *timestamp
    },
    searchSong: (input) => {
        console.log(input)
        const searchSong = new SearchSong()
        searchSong.getFromItunesAPI(input)
    },
    loginCheck: async (input) => {
        let response = await userData.loginData(input.username);
        if (response) {
            if (response.password === input.password) {
                console.log('You logged in successfully!');
            } else {
                console.log('Password incorrect');
            }
        } else {
            console.log('User not found');
        }
    }
}
export default Query
import CreateAccount from '../services/accounts/CreateAccount';
import SearchSong from '../services/songsearch';
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
    }
}
export default Query
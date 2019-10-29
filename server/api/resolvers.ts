import CreateAccount from '../services/accounts/CreateAccount';
import SearchSong from '../services/songsearch';
import UserData from '../services/accounts/UserData';
const userData = new UserData();
const Query = {
    hello: () => 'Hello World',
    test: () => 'Test Success, GraphQL server is up & running !!',
    createAccount: async (input) => {
        // console.log(input)
        const createAccount = new CreateAccount;
        let response = await createAccount.create(input)
        if(!response){
        return {response:`Account created`}
        }else{
            return {response:`Username ${input.username} already exists`}
        }
        // commented out must fix schema for graphql *timestamp
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
                return {response:`You logged in successfully!`};
            } else {
               return {response:`Password incorrect`};
            }
        } else {
           return {response:`Username ${input.username} not found`};
        }
    }
}
export default Query
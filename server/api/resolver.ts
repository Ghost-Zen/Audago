import CreateAccount from '../services/accounts/CreateAccount';
const createAccount = new CreateAccount;
const Query = {
    hello: () => 'Hello World',
    test: () => 'Test Success, GraphQL server is up & running !!',
    createAccount: async (input) => {
        console.log(input)
        // await createAccount.create(input) commented out must fix schema for graphql *timestamp
 }
}
export default Query
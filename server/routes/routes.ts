import UserApi from '../api/user_api';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
const userApi = new UserApi();
export default class AppRoutes {
    private app: any;
    constructor(app: any) {
        this.app = app;
    }


    router() {

        var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
        var root = { hello: () => 'Hello world!' };

        // this.app.get('/', (req, res) => {

        // })

        this.app.use('/graphql', graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true,
        }));

        this.app.get('/api/signup', userApi.userSignUp)
        this.app.post('/api/signin', userApi.userSignIn)
        this.app.post('/api/delete/user', userApi.deleteUser)
        this.app.get('/api/edit/user', userApi.editUserData)
        this.app.get('/api/user/data/:user', userApi.getUserData)
    }

}
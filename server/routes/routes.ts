import UserApi from '../api/user_api';
import graphqlHTTP from 'express-graphql';
import Query from '../api/resolver';
import schema from '../api/schema';
const userApi = new UserApi();
export default class AppRoutes {
    private app: any;
    constructor(app: any) {
        this.app = app;
    }


    router() {

        this.app.use('/graphql', graphqlHTTP({
            schema: schema,
            rootValue: Query,
            graphiql: true,
        }));

        this.app.get('/api/signup', userApi.userSignUp)
        this.app.post('/api/signin', userApi.userSignIn)
        this.app.post('/api/delete/user', userApi.deleteUser)
        this.app.get('/api/edit/user', userApi.editUserData)
        this.app.get('/api/user/data/:user', userApi.getUserData)
        this.app.get('/api/create/playlist', userApi.createPlaylist)
    }

}
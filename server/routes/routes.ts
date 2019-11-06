import graphqlHTTP from 'express-graphql';
import Resolvers from '../api/resolvers';
import typeDefs from '../api/typeDefs';
import Auth from '../api/auth';
const authuser = new Auth()
export default class AppRoutes {
    private app: any;
    constructor(app: any) {
        this.app = app;
    }


    router() {
        this.app.post('/verify', authuser.verifyToken)

        this.app.use('/graphql', graphqlHTTP({
            schema: typeDefs,
            rootValue: Resolvers,
            graphiql: true,
        }));
        //add extra routes below here
    }

}
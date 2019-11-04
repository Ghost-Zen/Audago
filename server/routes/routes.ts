import graphqlHTTP from 'express-graphql';
import Query from '../api/resolvers';
import schema from '../api/typeDefs';
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
        //add extra routes below here
    }

}
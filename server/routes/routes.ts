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

        this.app.get('/verify_signup/:userToken', async (req,res) => {
          let user_token = req.params.userToken.split('$')
          await Resolvers.verifyAccount(user_token[0],user_token[1])
          res.redirect('/')
        })

        this.app.post('/verify', authuser.verifyToken)

        this.app.use('/graphql', graphqlHTTP({
            schema: typeDefs,
            rootValue: Resolvers,
            graphiql: true,
        }));
        //add extra routes below here
    }

}

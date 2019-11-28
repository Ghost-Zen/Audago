import graphqlHTTP from 'express-graphql';
import Resolvers from '../api/resolvers';
import typeDefs from '../api/typeDefs';
import Auth from '../api/auth';
import Signing from '../services/accounts/SignOut';
const authuser = new Auth()
const signing = new Signing;
export default class AppRoutes {
    private app: any;
    constructor(app: any) {
        this.app = app;
    }


    router() {

        this.app.get('/verify_signup/:userToken', async (req, res) => {
            let user_token = req.params.userToken.split('$')
            await Resolvers.verifyAccount(user_token[0], user_token[1])
            res.redirect('/')
        })

        this.app.post('/signOut', async (req, res) => {
            await signing.signOut(req.body.user, req.body.date);
            res.json({
                status:'success'
            });
        })

        this.app.post('/signIn', async (req, res) => {
            await signing.signIn(req.body.user);
            res.json({
                status:'success'
            });
        })

        this.app.post('/verify', authuser.check)

        this.app.use('/graphql', authuser.graphqlAuth, graphqlHTTP({
            schema: typeDefs,
            rootValue: Resolvers,
            graphiql: true,
        }));
    }

}

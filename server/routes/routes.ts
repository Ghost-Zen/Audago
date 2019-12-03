import graphqlHTTP from 'express-graphql';
import Resolvers from '../api/resolvers';
import typeDefs from '../api/typeDefs';
import Auth from '../api/auth';
import Signing from '../services/accounts/SignOut';
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
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

        this.app.post('/upload',authuser.graphqlAuth, upload.single('avatar'), (req, res) => {
            let {user, file} = req
            let data = { user,file }
            Resolvers.updateProfilePic(data)
            // req.body will hold the text fields, if there were any
            res.json({'response':'Profile picture updated'})
        })

        this.app.post('/api/profile', authuser.graphqlAuth, async (req,res) => {
            let input = {username :req.body.username}
            let userData = await Resolvers.userData(input)
            res.sendFile(`/${userData.user.image}`, { root: 'uploads' })
        })
           

        this.app.post('/signOut', async (req, res) => {
            await signing.signOut(req.body.username, req.body.date);
            res.json({
                status:'success'
            });
        })

        this.app.post('/signIn', async (req, res) => {
            await signing.signIn(req.body.username);
            res.json({
                status:'success'
            });
        })

        this.app.post('/login', async (req,res) => {
             let response = await Resolvers.loginCheck(req.body.input)
             res.json({response})
            })
        this.app.post('/signup', async (req,res) => {
            let response = await Resolvers.createAccount(req.body.input)
            res.json({response})
        })

        this.app.post('/verify', authuser.check)

        this.app.use('/graphql', authuser.graphqlAuth, graphqlHTTP({
            schema: typeDefs,
            rootValue: Resolvers,
            graphiql: true,
        }));
    }

}

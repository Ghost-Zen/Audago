import UserApi from '../api/user_api';
const userApi = new UserApi();
export default class AppRoutes {
    private app: any;
    constructor(app: any) {
        this.app = app;
    }


    router() {
        this.app.get('/', (req, res) => {

        })

        this.app.get('/api/signup', userApi.userSignUp)
        this.app.post('/api/signin', userApi.userSignIn)
        this.app.post('/api/delete/user', userApi.deleteUser)
        this.app.post('/api/edit/user', userApi.editUserData)
        this.app.get('/api/user', userApi.getUserData)
    }

}
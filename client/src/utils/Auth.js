import axios from 'axios';

const Auth = {
    isAuthenticated: false,
    isUsername: "",
    token: "",
    async check() {
        let jwt = {
            token: "",
        }
        jwt.token = localStorage.getItem('sudo')
        if (jwt !== "") {

        }
    },
    getToken() {
        return this.token
    },
    getAuth() {
    return true; //uncomment this for dev, to bypass authentication
        // return this.isAuthenticated;
    },
    getUserName() {
        return this.isUsername
    },
   signOutUser(){
        localStorage.removeItem('sudo')
        return false;
    }

};

export default Auth;

// await axios.post(`/verify`, jwt)
// .then(res => {
//     this.isAuthenticated = res.data.response
//     this.isUsername = res.data.client_id
//     this.token = jwt.token
// })
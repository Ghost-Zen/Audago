import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
            await axios.post(`/verify`, jwt)
            .then(res => {
                this.isAuthenticated = res.data.response
                this.isUsername = res.data.client_id
                this.token = jwt.token
            })
        }
    },
    userLogin(status){
        this.isAuthenticated = status
    },
    getToken() {
        return this.token
    },
    getAuth() {
    // return true; //uncomment this for dev, to bypass authentication, most services wont work if this is uncommented.
        return this.isAuthenticated;
    },
    getUserName() {
        return this.isUsername
    },
   signOutUser(){
        localStorage.removeItem('sudo')
        window.location.reload();
        // return false;
    }

};

export default Auth;
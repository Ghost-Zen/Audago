import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import HomePage from './pages/Homepage';
import Webplayer from './pages/Webplayer';
import Auth from './utils/Auth';
import { Redirect } from 'react-router-dom';
import Profile from './pages/Profile';

const Router = (props) => (

  <HashRouter>
    <Switch>
    <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/" component={HomePage} />
      <PrivateRoute exact path="/webplayer" component={Webplayer} />
      <PrivateRoute exact path="/profile" component={Profile} />
      {/* <PrivateRoute exact path="/edit-user" component={Edit_User} /> */}
    </Switch>
  </HashRouter>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
    }
  />
);


export default Router;
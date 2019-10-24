import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Auth from './Auth';
import Test from './components/graphqltest'

const Router = (props) => (

  <HashRouter>
    <Switch>
      <Route exact path="/" component={Test} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      {/* <PrivateRoute exact path="/edit-user" component={Edit_User} /> */}
    </Switch>
  </HashRouter>

)

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       Auth.getAuth() ? (
//         <Component {...props} />
//       ) : (
//           <Redirect
//             to={{
//               pathname: "/login"
//             }}
//           />
//         )
//     }
//   />
// );


export default Router;
import React, { Component } from 'react';
import './styling/App.css';
import Router from './Router.jsx';
import { ApolloProvider } from '@apollo/react-hooks';
// import Auth from './Auth'


class App extends Component {
  state = {
    auth: false,
    loading: false
  }

  
  // async componentDidMount() {
  //   this.setState({ auth: await Auth.check(), loading: false })
  // }
  render() {
      return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

export default App;
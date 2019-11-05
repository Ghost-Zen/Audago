import React, { Component } from 'react';
import './styling/App.css';
import Router from './Router.jsx';
import { Container } from 'semantic-ui-react';
import Navbar from './components/navbar';
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
        <Container>
        <Navbar />
        <Router />
        </Container>
      </div>
    );
  }
}

export default App;
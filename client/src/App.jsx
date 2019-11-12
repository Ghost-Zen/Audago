import React, { Component } from 'react';
import './styling/App.css';
import Router from './Router.jsx';
import Auth from './utils/Auth';
import Loading from './components/loader';

class App extends Component {
  state = {
    auth: false,
    loading: true
  }

  async componentDidMount() {
    this.setState({ auth: await Auth.check(), loading: false })
  }

  render() {
    if(this.state.loading){
      return(
        <Loading />
        )
    }else{
      return (
      <div className="App">
        <Router />
      </div>
    );
  }
}
}

export default App;
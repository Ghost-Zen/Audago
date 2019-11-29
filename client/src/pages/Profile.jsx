import React from 'react';
import ProfileDisplay from '../components/profileDisplay';
import Auth from '../utils/Auth';
import Navbar from '../components/navbar';
import moment from 'moment';
import axios from 'axios';


export default class Profile extends React.Component {
  state = {
    username: Auth.getUserName()
  }


  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunload.bind(this));
    axios
      .post('/signIn', { username: Auth.getUserName() })
      .then(res => { });
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload.bind(this));
  }

  beforeunload() {
    axios
      .post('/signOut', { username: Auth.getUserName(), date: moment().format() })
      .then(res => { });
  }


  render() {
    let { username } = this.state;
    return (
      <div className="profile" style={{ backgroundColor: 'black' }}>
        <Navbar />

        <ProfileDisplay username={username} />
      </div>
    )
  }
}

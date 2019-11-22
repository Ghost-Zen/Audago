import React from 'react';
import ProfileDisplay from '../components/profileDisplay';
import Auth from '../utils/Auth';
import Navbar from '../components/navbar';


export default class Profile extends React.Component {
  state = {
    username :Auth.getUserName()
  }

  render(){
    let {username} = this.state;
    return(
      <div className="profile" style={{ backgroundColor: 'black' }}>
      <Navbar />

      <ProfileDisplay username={username} />
      </div>
    )
  }
}

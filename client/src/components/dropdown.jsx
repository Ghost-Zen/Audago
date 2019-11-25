import React from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import Auth from '../utils/Auth';

export default class NavBarDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
  let options = [
    { key: 'profile', text: 'Profile', icon: 'user', href: '/#profile' },
    { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: () => this.props.test() }
  ]

  let trigger = (
    <span>
      <Image avatar src={'https://randomuser.me/api/portraits/lego/1.jpg'} /> {Auth.getUserName()}
    </span>
  )

    return (
      <Dropdown
        trigger={trigger}
        options={options}
        pointing='top right'
        icon={null}
      />
    )
  }
}



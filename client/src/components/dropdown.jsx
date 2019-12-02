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
      <Image id="nav-profile" avatar /> {Auth.getUserName()}
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



  import React from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import Auth from '../utils/Auth';
const trigger = (
  <span>
    <Image avatar src={'https://randomuser.me/api/portraits/lego/1.jpg'} /> {Auth.getUserName()}
  </span>
)

const options = [
  { key: 'profile', text: 'Profile', icon: 'user', href:'/#profile' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: () => Auth.signOutUser() }
]

const NavBarDropDown = () => (
  <Dropdown
    trigger={trigger}
    options={options}
    pointing='top right'
    icon={null}
  />
)

export default NavBarDropDown

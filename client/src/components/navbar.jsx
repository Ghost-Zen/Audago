import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import Auth from '../utils/Auth'
import OnChangeSearch from './onChangeSearch';
import NavBarDropDown from './dropdown';

export default class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  userStatus = () => {
    const { activeItem } = this.state
    if (Auth.getAuth() === true) {
      return (
        <Menu.Item>
          <NavBarDropDown />
        </Menu.Item>
      )
    } else {
      return <Menu.Item
        name='not logged in'
        active={activeItem === 'login'}
        onClick={this.handleItemClick}
        href='/#login'
      />
    }
  }

  logo = () => {
    return (
      <Image src="/audago.png" size='small'></Image>
    )
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted  secondary className="navbar">
        <Menu.Header
          style={{ margin: 10, color: 'teal' }}
          content={this.logo()}
        />
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          href="#"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          content={<s>Explore</s>}
          active={activeItem === 'explore'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          content={<s>About</s>}
          active={activeItem === 'about'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <OnChangeSearch />
          </Menu.Item>
          {this.userStatus()}
        </Menu.Menu>
      </Menu>
    )
  }
}

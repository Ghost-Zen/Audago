import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import Auth from '../utils/Auth'
import OnChangeSearch from './onChangeSearch';
import NavBarDropDown from './dropdown';
import { SIGNOUT } from '../api/queries';
import { Query } from 'react-apollo';
import moment from 'moment';

export default class Navbar extends Component {
  state = {
    activeItem: 'home',
    signOut: false
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleSignout = () => {
    this.setState({
      signOut: true
    });
  }

  renderSignOut = () => {
    if (this.state.signOut) {
      return (
        <Query query={SIGNOUT} variables={{ username: Auth.getUserName(), date: moment().format() }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            console.log(data)
            Auth.signOutUser()
            return (
              <div>
              </div>
            )
          }}
        </Query>
      )
    }
  }

  userStatus = () => {
    const { activeItem } = this.state
    if (Auth.getAuth() === true) {
      return (
        <Menu.Item>
          <NavBarDropDown test={this.handleSignout} />
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
      <Menu inverted secondary className="navbar">
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
          name='about'
          href='#/about'
          active={activeItem === 'about'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          {this.userStatus()}
          {this.renderSignOut()}
        </Menu.Menu>
      </Menu>
    )
  }
}

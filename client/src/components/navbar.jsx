import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import Auth from '../utils/Auth'
import OnChangeSearch from './onChangeSearch';

export default class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
    }

    userStatus = () => {
        const { activeItem } = this.state
        if(Auth.getAuth() === true){
           return <Menu.Item
            name={`Welcome ${Auth.getUserName()}`}
            active={activeItem === 'greet'}
            onClick={this.handleItemClick}
          />
        }else{
           return <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          />
        }
    }

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary
      style={{ margin: 5 }} 
      >
          <Menu.Header
          style={{margin:5, color:'teal'}}
          as="h2"
          children="Audago"
          />

        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          link="/"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='playlist'
          active={activeItem === 'playlist'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='about'
          active={activeItem === 'about'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <OnChangeSearch />
            {/* <Input icon='search' placeholder='Search...' /> */}
          </Menu.Item>
          {this.userStatus()}
        </Menu.Menu>
      </Menu>
    )
  }
}

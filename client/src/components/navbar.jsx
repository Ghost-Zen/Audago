import React, { Component } from 'react'
import { Input, Menu, Image } from 'semantic-ui-react'
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

    logo = () => {
      return(
        <Image src="/audago.png" size='small' style={{margin:2}}></Image>
      )
    }

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary
      style={{ margin: 5 }} 
      >
          <Menu.Header
          style={{margin:5, color:'teal'}}
          content={this.logo()}
          />

        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          href="#"
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

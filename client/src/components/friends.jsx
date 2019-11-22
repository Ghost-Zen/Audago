import React from 'react';
import { Card, Menu, Label, Header, Grid, Container } from 'semantic-ui-react';
import {  } from '../api/queries';
import '../styling/App.css';
import { Query, Mutation } from 'react-apollo';
import FriendSearch from './friendSearch';

export default class Friends extends React.Component {
  state = {
    activeItem: 'search'
  }

  handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name });
  };

  renderItem = () => {
      if (this.state.activeItem === 'search') {
          return (
            <FriendSearch show={this.props.show}/>
          )
      } else if (this.state.activeItem === 'friends') {
          return (
            <Header as='h3' inverted>Friends</Header>
          )
      } else if(this.state.activeItem === 'requests'){
        return (
          <Header as='h3' inverted>Requests</Header>
        )
      }
  };

render(){
  return(
    <Grid.Row>
    <Grid.Column width={16}>
      <Menu pointing inverted>
        <Menu.Item
          name='search'
          active={this.state.activeItem === 'search'}
          onClick={this.handleItemClick}
        >
          Search
        </Menu.Item>

        <Menu.Item
          name='friends'
          active={this.state.activeItem === 'friends'}
          onClick={this.handleItemClick}
        >
          Friend List
        </Menu.Item>

        <Menu.Item
          name='requests'
          active={this.state.activeItem === 'requests'}
          onClick={this.handleItemClick}
        >
        Requests
          <Label color='teal'>0</Label>
        </Menu.Item>
      </Menu>
      {this.renderItem()}
      </Grid.Column>
      </Grid.Row>
  )
}
}

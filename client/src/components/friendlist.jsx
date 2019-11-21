import React from 'react';
import { Card, Menu, Label, Header, Grid, Container } from 'semantic-ui-react';
import {  } from '../api/queries';
import '../styling/App.css';
import { Query, Mutation } from 'react-apollo';

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
            <Header as='h3' inverted>Search</Header>
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
    <Grid.Column width='4'>
      <Menu pointing secondary vertical inverted>
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
          <Label color='teal'>0</Label>
          Requests
        </Menu.Item>
      </Menu>
      </Grid.Column>
      <Grid.Column width='12'>
      {this.renderItem()}
      </Grid.Column>
      </Grid.Row>
  )
}
}

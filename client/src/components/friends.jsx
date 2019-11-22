import React from 'react';
import { Card, Menu, Label, Header, Grid, Container } from 'semantic-ui-react';
import { VIEW_FRIEND_REQUESTS } from '../api/queries';
import '../styling/App.css';
import { Query, Mutation } from 'react-apollo';
import FriendSearch from './friendSearch';
import FriendRequest from './friendRequests';
import FriendList from './friendList';
import Auth from '../utils/Auth';

export default class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'search'
    }
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
            <FriendList show={this.props.show} />
          )
      } else if(this.state.activeItem === 'requests'){
        return (
          <FriendRequest show={this.props.show}/>
        )
      }
  };

  renderRequests =()=>(
            <Query query={VIEW_FRIEND_REQUESTS} pollInterval={500} variables={{ username:Auth.getUserName() }}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                let requests = data.viewFriendRequests.data;
                let count = 0;
                if(requests){
                  count = requests.length;
                }
                return(
                  <Menu.Item
                    name='requests'
                    active={this.state.activeItem === 'requests'}
                    onClick={this.handleItemClick}
                  >
                  Requests
                  <Label color='teal'>{count}</Label>
                  </Menu.Item>
                )
              }}
            </Query>
  )

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
        {this.renderRequests()}

      </Menu>
      {this.renderItem()}
      </Grid.Column>
      </Grid.Row>
  )
}
}

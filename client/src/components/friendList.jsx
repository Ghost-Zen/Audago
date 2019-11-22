import React from 'react';
import { Card, Button, Header, Grid, Input, Image } from 'semantic-ui-react';
import '../styling/App.css';
import { Query, Mutation } from 'react-apollo';
import { VIEW_FRIEND_LIST, DELETE_FRIEND } from '../api/queries';
import Auth from '../utils/Auth';

export default class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : Auth.getUserName()
    }
  }


renderFriends= () =>(
  <Query query={VIEW_FRIEND_LIST} pollInterval={500} variables={{ username:this.state.username }}>
    {({ loading, error, data, refetch }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      let friends = data.viewFriendsList.data
      let friendsList = [];
      if(friends){
        let index =0;
      for(const account of friends){
        friendsList.push(
          <Card key={index}>
            <Image className='friendImage' onClick={()=>this.props.show(account.friend)} src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
              <Card.Content extra>
                <Card.Description>{account.friend}</Card.Description>
                  <Mutation mutation={DELETE_FRIEND} variables={{ username:this.state.username, friend:account.friend }}
                    update={(cache, { refetch }) => {
                      refetch()
                    }
                    }
                  >
                    {removeFriend => (
                      <Button type='submit' onClick={removeFriend} color='red'>
                      Remove
                      </Button>
                    )}
                  </Mutation>
              </Card.Content>
          </Card>
        );
        index ++;
      }
      return (
            <Grid.Column>
            <Card.Group itemsPerRow={6}>
              {friendsList}
            </Card.Group>
            </Grid.Column>
      )
      } else {
      return(
        <Header style={{marginTop:10}} inverted as='h3'> No Friends yet</Header>
      )
    }
    }}
  </Query>
)

  render(){
    return(
      <Grid>
        <Grid.Row>
          {this.renderFriends()}
        </Grid.Row>
      </Grid>
    )
  }
}

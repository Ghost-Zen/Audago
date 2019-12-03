import React from 'react';
import { Card, Button, Header, Grid, Input, Image } from 'semantic-ui-react';
import { } from '../api/queries';
import '../styling/App.css';
import { Query, Mutation } from 'react-apollo';
import { FRIEND_SEARCH,SEND_FRIEND_REQUEST } from '../api/queries';
import Auth from '../utils/Auth';
import ProfileDisplay from './profileDisplay';

export default class FriendSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        search:'',
        username:Auth.getUserName(),
        displayProfile: false,
        chosenUser: ''
      }
    }

    renderDisplay = () => {
      if (this.state.displayProfile){
        return <ProfileDisplay username={this.state.chosenUser} />
      } else {
        return (
          <Grid>
          <Grid.Row>
            <Grid.Column>
                <Input name="search" placeholder='Search...' onChange={this.handleChange} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Grid.Column>
            {this.renderSearch()}
            </Grid.Column>
            </Grid.Row>
            </Grid>
        )
      }
    }

    renderProfile = (username) => {
      this.setState({
        displayProfile : true,
        chosenUser: username
      });
    }

    renderSearch = () => {
      let {username, search} = this.state;
      return(
      <Query query={FRIEND_SEARCH} pollInterval={500} variables={{ username, search }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          let accounts = data.accountSearch.data;
          let accountList = [];
          let index = 0;
          if(accounts){
          for(const account of accounts){
            accountList.push(
              <Card key={index}>
                  <Card.Content>
                    <Card.Header className='friendImage' onClick={()=>this.props.show(account.friend)}>{account.friend}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Mutation mutation={SEND_FRIEND_REQUEST} variables={{ requester: username, receiver:account.friend }}
                        update={(cache, { refetch }) => {
                          refetch()
                        }
                        }
                      >
                        {sendRequest => (
                          <Button type='submit' onClick={sendRequest} color='blue'>
                          Add Friend
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
                {accountList}
              </Card.Group>
              </Grid.Column>
            )
        } else {
          return <Header as="h3" inverted>No Results</Header>
        }
        }}
      </Query>
    )
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    render() {
        return (
          <div>
          {this.renderDisplay()}
          </div>
        )
    }
}

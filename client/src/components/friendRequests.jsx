import React from 'react';
import { Card, Button, Header, Grid, Input, Image } from 'semantic-ui-react';
import '../styling/App.css';
import { Query, Mutation } from 'react-apollo';
import { VIEW_FRIEND_REQUESTS, ACCEPT_FRIEND_REQUEST, DENY_FRIEND_REQUEST } from '../api/queries';
import Auth from '../utils/Auth';

export default class FriendRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: Auth.getUserName()
    }
  }

  renderRequests = () => (
              <Query query={VIEW_FRIEND_REQUESTS} pollInterval={500} variables={{ username:Auth.getUserName() }}>
                {({ loading, error, data, refetch }) => {
                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;
                  let requests = data.viewFriendRequests.data;
                  let requestList =[]
                  if(requests){
                    let index = 0;
                  for(const account of requests){
                    requestList.push(
                      <Card key={index}>
                        <Image className='friendImage' onClick={()=>this.props.show(account.friend)} src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                          <Card.Content extra>
                            <Card.Description>{account.friend}</Card.Description>
                            <div className='ui two buttons'>
                              <Mutation mutation={ACCEPT_FRIEND_REQUEST} variables={{ username: this.state.username, friend:account.friend }}
                                update={(cache, { refetch }) => {
                                  refetch()
                                }
                                }
                              >
                                {acceptRequest => (
                                  <Button type='submit' onClick={acceptRequest} inverted color='green'>
                                  Accept
                                  </Button>
                                )}
                              </Mutation>
                              <Mutation mutation={DENY_FRIEND_REQUEST} variables={{ username: this.state.username, friend:account.friend }}
                                update={(cache, { data }) => {
                                  refetch()
                                }
                                }
                              >
                                {denyRequest => (
                                  <Button type='submit' onClick={denyRequest} inverted color='red'>
                                  Deny
                                  </Button>
                                )}
                              </Mutation>
                              </div>
                          </Card.Content>
                      </Card>
                    );
                    index ++;
                  }
                  return(
                      <Grid.Column>
                      <Card.Group itemsPerRow={6}>
                        {requestList}
                      </Card.Group>
                      </Grid.Column>
                  )
                } else {
                  return <Header as='h3' inverted style={{marginTop:10}}> No friend requests</Header>
                }
                }}
              </Query>
  )

  render(){
    return(
      <Grid>
        <Grid.Row>
          {this.renderRequests()}
        </Grid.Row>
      </Grid>
    )
  }
}

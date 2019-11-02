import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment,Container } from 'semantic-ui-react'
import { SEARCH_SONG } from '../typedefs';
import { Mutation } from 'react-apollo'
import Webplayer from './Webplayer';
export default class Search extends React.Component {
  state = {
    search: "",
    gql_res: "",
    loading: false
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  render() {
    let { search } = this.state
    if(this.state.gql_res !== ""){
      return(
        <Webplayer data={this.state.gql_res} />
        )
    }
    return (
      <Container>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Search from over 30 million songs
      </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='music' iconPosition='left' placeholder='Search Song' onChange={this.handleChange} />

              <Mutation mutation={SEARCH_SONG} variables={{ search }}
              update={(cache, { data }) => {
                data = JSON.parse(data.searchSong.response)
              this.setState({ gql_res: data,
                              loading:true
              })
                }
                }>
                {runSearch => (
                  <Button type="submit" color='teal' fluid size='large' onClick={runSearch}>
                    Search
          </Button>
                )}
              </Mutation>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      </Container>
    )
  }

}
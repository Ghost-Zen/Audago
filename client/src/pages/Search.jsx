import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { SEARCH_SONG } from '../typedefs';
import { Mutation } from 'react-apollo'
export default class Search extends React.Component {
  state = {
    search: ""
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  render() {
    let { search } = this.state
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Search from over 30 million songs
      </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='music' iconPosition='left' placeholder='Search Song' onChange={this.handleChange} />

              <Mutation mutation={SEARCH_SONG} variables={{ search }}>
                {createAccount => (
                  <Button type="submit" color='teal' fluid size='large' onClick={createAccount}>
                    Search
          </Button>
                )}
              </Mutation>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }

}
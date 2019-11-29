import React from 'react';
import { Button, Form, Grid, Header, Segment,Container } from 'semantic-ui-react'
import { SEARCH_SONG } from '../api/queries';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo'
import Navbar from '../components/navbar';
import moment from 'moment';
import axios from 'axios';
import Auth from '../utils/Auth';

export default class Search extends React.Component {
  state = {
    search: "",
    gql_res: "",
    loading: false
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunload.bind(this));
    axios
      .post('/signIn', { username: Auth.getUserName() })
      .then(res => { });
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload.bind(this));
  }

  beforeunload() {
    axios
      .post('/signOut', { username: Auth.getUserName(), date: moment().format() })
      .then(res => { });
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  render() {
    let { search } = this.state
    if(this.state.gql_res !== ""){
      console.log(this.state.gql_res)
      return(
        <Redirect to={{pathname: '/webplayer',
                  state: { data: this.state.gql_res }}} />
        )
    }
    return (
      <Container>
        <Navbar />
      <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Search from over 30 million songs
      </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='music' iconPosition='left' placeholder='Search Song' onChange={this.handleChange} />

              <Mutation mutation={SEARCH_SONG} variables={{ search }}
              update={(cache, { data }) => {
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
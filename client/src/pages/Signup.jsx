import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { ADD_USER } from '../api/typedefs';
import { Mutation } from 'react-apollo';


export default class Signup extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
    image: "",
    active: true,
    gql_res: {},
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  renderError = () => {
    let { gql_res } = this.state
    if (!gql_res.status && gql_res.response) {
      return (<Message negative>
        <Message.Header>{gql_res.response}</Message.Header>
      </Message>)
    }
  }


  render() {
    let { firstName, lastName, username, email, password, image, active } = this.state
    let account = {
      firstName,
      lastName,
      username,
      email,
      password,
      image,
      active
    }
    if (this.state.gql_res.status) {
      return <Redirect to="/" />
    }
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Create an account
      </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input name='firstName' fluid icon='user' iconPosition='left' placeholder='Firstname' onChange={this.handleChange} />
              <Form.Input name='lastName' fluid icon='user' iconPosition='left' placeholder='Lastname' onChange={this.handleChange} />
              <Form.Input name='username' fluid icon='user' iconPosition='left' placeholder='Username' onChange={this.handleChange} />
              <Form.Input name='email' fluid icon='mail' iconPosition='left' placeholder='E-mail address' onChange={this.handleChange} />
              <Form.Input name='password' fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange} />
              <Form.Input name='confirm' fluid icon='lock' iconPosition='left' placeholder='Confirm Password' type='password' onChange={this.handleChange} />
              <Mutation mutation={ADD_USER} variables={{ account }}
                update={(cache, { data }) => {
                  console.log(data)
                  this.setState({ gql_res: data.createAccount })
                }
                }
              >
                {createAccount => (
                  <Button type="submit" color='teal' fluid size='large' onClick={createAccount}>
                    Signup
                  </Button>
                )}
              </Mutation>
              {this.renderError()}
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }

}
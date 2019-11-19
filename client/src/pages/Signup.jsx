import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment, Message, Popup, List } from 'semantic-ui-react';
import { ADD_USER } from '../api/queries';
import { Mutation } from 'react-apollo';
import Navbar from '../components/navbar';


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
      <div className="bg" style={{ height: '100vh' }}>
        <Navbar />
        <Grid style={{ margin: 50 + 'px' }} textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' inverted textAlign='center'>
              Create an account
      </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input name='firstName' fluid icon='user' iconPosition='left' placeholder='Firstname' onChange={this.handleChange} />
                <Form.Input name='lastName' fluid icon='user' iconPosition='left' placeholder='Lastname' onChange={this.handleChange} />
                <Form.Input name='username' fluid icon='user' iconPosition='left' placeholder='Username' onChange={this.handleChange} />
                <Form.Input name='email' fluid icon='mail' iconPosition='left' placeholder='E-mail address' onChange={this.handleChange} />
                <Popup trigger={
                  <Form.Input name='password' fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange} />} wide>
                  <Header as='h2'>
                    A strong password requires:
                    </Header>
                  <List bulleted>
                    <List.Item>More than 8 Characters</List.Item>
                    <List.Item>Atleast 1 Uppercase letter</List.Item>
                    <List.Item>Atleast 1 Lowercase letter</List.Item>
                    <List.Item>Atleast 1 Special character (!@#$%^&*)</List.Item>
                    <List.Item>Atleast 1 Number</List.Item>
                  </List>
                </Popup>
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
      </div>
    )
  }

}
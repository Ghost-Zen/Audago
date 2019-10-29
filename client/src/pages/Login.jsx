import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { LOGIN_CHECK } from '../typedefs';
import { Mutation } from 'react-apollo'

export default class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    let {username, password} = this.state
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {/* <Image src='/logo.png' /> */}
            Log-in to your account
      </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' name='username' iconPosition='left' placeholder='E-mail address' onChange={this.handleChange} />
              <Form.Input
                fluid
                icon='lock'
                name='password'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={this.handleChange}
              />

              <Mutation mutation={LOGIN_CHECK} variables={{ username, password }}>
                {loginCheck => (
                  <Button type="submit" color='teal' fluid size='large' onClick={loginCheck}>
                    Login
                  </Button>
                )}
              </Mutation>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='#signup'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }

}
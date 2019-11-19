import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { LOGIN_CHECK } from '../api/queries';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Auth from '../utils/Auth';
import Navbar from '../components/navbar';

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    status: Auth.getAuth(),
    message: '',
  }

  setClientToken = (token) => {
    localStorage.setItem('sudo', token)
  }

  renderError = () => {
    if (!this.state.status && this.state.message) {
      return (<Message negative>
        <Message.Header>{this.state.message}</Message.Header>
      </Message>)
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    let { username, password, status } = this.state
    if (status) {
      Auth.userLogin(status)
      return <Redirect to='/' />
    }
    return (
      <div className="bg">
        <Navbar />
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' inverted textAlign='center'>
              {/* <Image src='/logo.png' /> */}
              Log-in to your account
      </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' name='username' iconPosition='left' placeholder='E-mail address' onChange={this.handleChange} />
                <Form.Input fluid icon='lock' name='password' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange} />
                {this.renderError()}
                <Mutation mutation={LOGIN_CHECK} variables={{ username, password }}
                  update={(cache, { data }) => {
                    this.setState({
                      status: data.loginCheck.status,
                      message: data.loginCheck.response
                    });
                    this.setClientToken(data.loginCheck.response)
                  }
                  }
                >
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
      </div>
    )
  }

}
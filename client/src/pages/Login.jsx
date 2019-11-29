import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { LOGIN_CHECK } from '../api/queries';
import { Mutation } from 'react-apollo';
import axios from 'axios';
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

  loginUser = async () => {
    let { username, password } = this.state
    let post_Data = {
      input:
        { username, password }
    }
    await axios.post(`/login`, post_Data)
      .then(res => {
        let postRes = res.data.response
        if (postRes.status) {
          this.setClientToken(postRes.response)
          this.setState({ status: postRes.status })
        } else {
          this.setState({ message: postRes.response, status: postRes.status })
        }
      })
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
    let { username, status } = this.state
    if (status) {
      Auth.userLogin(status, username)
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
            <Form size='large' onSubmit={this.loginUser}>
              <Segment stacked>
                <Form.Input required fluid icon='user' name='username' iconPosition='left' placeholder='E-mail address' onChange={this.handleChange} />
                <Form.Input required fluid icon='lock' name='password' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange} />
                {this.renderError()}
                <Button type="submit" color='teal' fluid size='large'>
                  Login
                  </Button>
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
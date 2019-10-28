import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import {ADD_USER} from '../queries';
import { Mutation } from 'react-apollo'


export default class Signup extends React.Component {
  state = {
    firstName: "",
    lastName:"",
    username:"",
    email: "",
    password: "",
    confirm:"",
    image:"",
    active:true,
  //   timestamp: {
  //     created: 'date',
  //     lastSeen: 'date'
  // }
  timestamp:""
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  handleSubmit = () => {
    // let { firstName,lastName,username,email,password,confirm } = this.state
    // if(password === confirm){
      ///must still add code
  // }else{
      ///display message, passwords dont match
    // }
  }

    render(){
      let { firstName,lastName,username,email,password,image,active,timestamp } = this.state
        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
      {/* <Image src='/logo.png' /> */}
         Create an account
      </Header>
      <Form size='large'>
        <Segment stacked>
        <Form.Input  name='firstName' fluid icon='user' iconPosition='left' placeholder='Firstname' onChange={this.handleChange} />
        <Form.Input name='lastName' fluid icon='user' iconPosition='left' placeholder='Lastname' onChange={this.handleChange} />
        <Form.Input name='username' fluid icon='user' iconPosition='left' placeholder='Username' onChange={this.handleChange} />
          <Form.Input name='email' fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.handleChange} />
          <Form.Input
            name='password'
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />
            <Form.Input
            name='confirm'
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Confirm Password'
            type='password'
            onChange={this.handleChange}
          />
<Mutation mutation={ADD_USER} variables={{ firstName,lastName,username,email,password,image,active,timestamp }}>
  {createAccount => (
     <Button type="submit" color='teal' fluid size='large' onClick={createAccount}>
     Signup
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
import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {ADD_USER} from '../Queries';
// import { Mutation } from '@apollo/react-components'
import { Mutation } from 'react-apollo'
import { useQuery } from '@apollo/react-hooks';


export default class Signup extends React.Component {
  state = {
    firstname: "",
    lastname:"",
    username:"",
    email: "",
    password: "",
    confirm:""
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  handleSubmit = () => {
    let { firstname,lastname,username,email,password,confirm } = this.state
    console.log('test1')
    if(password === confirm){
      console.log('test2')
    // const createMutation = useQuery(ADD_USER, { variables: { firstname,lastname,username,email,password }});
    // return createMutation  
  }else{
      ///display message
    }
  }

    render(){
      let { firstname,lastname,username,email,password,confirm } = this.state
        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
      {/* <Image src='/logo.png' /> */}
         Create an account
      </Header>
      <Form size='large'>
        <Segment stacked>
        <Form.Input  name='firstname' fluid icon='user' iconPosition='left' placeholder='Firstname' onChange={this.handleChange} />
        <Form.Input name='lastname' fluid icon='user' iconPosition='left' placeholder='Lastname' onChange={this.handleChange} />
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
<Mutation mutation={ADD_USER} variables={{ firstname,lastname,username,email,password,confirm }}>
  {() => (
     <Button type="submit" color='teal' fluid size='large' onClick={this.handleSubmit}>
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
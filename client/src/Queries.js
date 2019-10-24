import { gql } from 'apollo-boost';

export const ADD_USER = gql`
  mutation($firstname: String, $lastname: String, $username: String, $email:String, $password:String) {
    createUser (firstname:$firstname, lastname:$lastname, username:$username, email:$email, passowrd:$password){
        firstname,
        lastname,
        username,
        email,
        password
    }
  }
`;
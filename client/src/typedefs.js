import { gql } from 'apollo-boost';

export const ADD_USER = gql`
  mutation($firstName: String, $lastName: String, $username: String, $email:String, $password:String,$image:String,$active:Boolean) {
   createAccount (firstName:$firstName, lastName:$lastName, username:$username, email:$email, password:$password,image:$image,active:$active){
        firstName,
        lastName,
        username,
        email,
        password,
        image,
<<<<<<< HEAD
        active
=======
        active,
>>>>>>> 618388f51ee2a1ca5952d35f214217a7eba571f7
}
    }
`;

export const SEARCH_SONG = gql`
  mutation($search:String) {
   searchSong (search:$search){
        search
}
    }
`;
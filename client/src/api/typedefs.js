import { gql } from 'apollo-boost';

export const ADD_USER = gql`
<<<<<<< HEAD:client/src/api/typedefs.js
  mutation($account:Account) {
   createAccount (account:$account){
        response,
        status
}
=======
  mutation($firstName: String, $lastName: String, $username: String, $email:String, $password:String,$image:String,$active:Boolean) {
   createAccount (firstName:$firstName, lastName:$lastName, username:$username, email:$email, password:$password,image:$image,active:$active){
        response
>>>>>>> 43371a51014cd2c87895f92b2ab23d7009ace3f1:client/src/typedefs.js
    }
  }
`;

export const SEARCH_SONG = gql`
  mutation($search:String) {
   searchSong (search:$search){
    response
    }
  }
`;

export const LOGIN_CHECK = gql`
    mutation($username:String, $password:String) {
      loginCheck (username:$username, password:$password){
        response,
        username,
        status
      }
    }
`;

export const USER_DATA = gql`
    mutation($username:String){
      userData(username:$username){
        response,
        user,
        status
      }
    }
`;

export const DELETE_USER = gql`
    mutation($username:String){
      deleteUser (username:$username){
        response,
        status
      }
    }
`;

export const UPDATE_USER = gql`  
    mutation($username:String, $updateData:UpdateData){
      updateUser(username:$username, updateData: $updateData){
        response,
        status
      }
    }
`;

export const UPDATE_PASSWORD = gql`  
    mutation($username:String, $currentPass:String, $newPass: String){
      updatePassword(username:$username, currentPass:$currentPass, newPass:$newPass){
        response,
        status
      }
    }
`;

export const NEW_PLAYLIST = gql`  
    mutation($playlist:Playlist){
      updateUser(playlist:$playlist){
        response,
        status
      }
    }
`;

export const NEW_TRACK = gql`  
    mutation($track:PlaylistTrack){
      updateUser(track:$track){
        response,
        status
      }
    }
`;

export const DELETE_TRACK = gql`  
    mutation($track:PlaylistTrack){
      updateUser(track:$track){
        response,
        status
      }
    }
`;

export const FOLLOW_PLAYLIST = gql`  
    mutation($username:String, $playlistName: String){
      updateUser(username:$username, playlistName:$playlistName){
        response,
        status
      }
    }
`;

export const UNFOLLOW_PLAYLIST = gql`  
    mutation($username:String, $playlistName: String){
      updateUser(username:$username, playlistName:$playlistName){
        response,
        status
      }
    }
`;

export const USERS_PLAYLIST = gql`  
    mutation($username:String){
      updateUser(username:$username){
        response,
        list,
        status
      }
    }
`;

export const VERIFY_USER = gql`
    mutation($jwt:String){
      verifytoken(jwt:$jwt){
        response
      }
    }

`;
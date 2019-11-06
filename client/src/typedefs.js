import { gql } from 'apollo-boost';

export const ADD_USER = gql`
  mutation($firstName: String, $lastName: String, $username: String, $email:String, $password:String,$image:String,$active:Boolean) {
   createAccount (firstName:$firstName, lastName:$lastName, username:$username, email:$email, password:$password,image:$image,active:$active){
        response
    }
  }
`;

export const SEARCH_SONG = gql`
  query($search:String) {
   searchSong (search:$search)
  }
`;

export const LOGIN_CHECK = gql`
  query($username:String, $password:String) {
    loginCheck (username:$username, password:$password) {
      response
      username
      status
    }
  }
`;

export const USER_DATA = gql`
query($username:String){
  userData(username:$username){
    response,
    user {
      firstName
      lastName
      email
      image
    },
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
  query($username:String) {
    playlistsForUser(username:$username) {
      playlists {
        name
        followers
        song_count
      }
      response
      status
    }
  }
`;
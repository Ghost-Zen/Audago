import { gql } from 'apollo-boost';

export const ADD_USER = gql`
  mutation($account:Account) {
   createAccount (account:$account){
        response,
        status
}
    }
`;

export const SEARCH_SONG = gql`
  mutation($search:String) {
   searchSong (search:$search){
    track
    artist
    song
    album
    artwork
   }
  }
`;

export const ONCHANGE_SEARCH = gql`
  query($search:String) {
  onChangeSearch(search:$search){

      track
      artist
      song
      album
      artwork
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
    mutation($username:String, $currentPass:String, $newPass: String, $testPass:String){
      updatePassword(username:$username, currentPass:$currentPass, newPass:$newPass, testPass:$testPass){
        response,
        status
      }
    }
`;

export const NEW_PLAYLIST = gql`  
    mutation($playlist:Playlist){
      newPlaylist(playlist:$playlist){
        response,
        status
      }
    }
`;

export const NEW_TRACK = gql`  
    mutation($username:String, $track:PlaylistTrack){
      newTrack(username:$username, track:$track){
        response,
        status
      }
    }
`;

export const DELETE_TRACK = gql`  
    mutation($username:String,$track:TrackInfo){
      deleteTrack(username:$username,track:$track){
        response,
        status
      }
    }
`;

export const FOLLOW_PLAYLIST = gql`  
    mutation($username:String, $playlistName: String){
      followPlaylist(username:$username, playlistName:$playlistName){
        response,
        status
      }
    }
`;

export const UNFOLLOW_PLAYLIST = gql`  
    mutation($username:String, $playlistName: String){
      unfollowPlaylist(username:$username, playlistName:$playlistName){
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
        songs {
          track
          artist
          song
          album
          artwork
        }
      }
      response
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
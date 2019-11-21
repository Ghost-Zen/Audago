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
      timeStamp{
        created
        lastSeen
      }
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
    mutation($name:String, $creator:String){
      newPlaylist(name:$name, creator:$creator){
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
    query($username:String,$trackInfo:TrackInfo){
      deleteTrack(username:$username,trackInfo:$trackInfo){
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
        creator
        followers
        song_count
        songs {
          track
          artist
          song
          album
          artwork
        }
        follower_list
      }
      response
      status
    }
  }
`;

export const ALL_PLAYLISTS = gql`
  query {
    allPlaylists {
      playlists {
        name
        creator
        followers
        song_count
        songs {
          track
          artist
          song
          album
          artwork
        }
        follower_list
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

export const SEND_FRIEND_REQUEST = gql`
  mutation ($requester:String, $receiver:String){
    sendRequest(requester:$requester, receiver:$receiver){
      response,
      status
    }
  }
`;

export const DENY_FRIEND_REQUEST = gql`
  mutation ($username:String, $friend:String){
    denyRequest(username:$username, friend:$friend){
      response,
      status
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation ($username:String, $friend:String){
    acceptRequest(username:$username, friend:$friend){
      response,
      status
    }
  }
`;

export const VIEW_FRIEND_REQUESTS = gql`
  query($username:String){
    viewFriendRequests(username:$username){
      response,
      status,
      data {
        friend,
        image
      }
    }
  }
`;

export const VIEW_FRIEND_LIST = gql`
  query($username:String){
    viewFriendsList(username:$username){
      response,
      status,
      data {
        friend,
        image
      }
    }
  }
`;

export const DELETE_FRIEND = gql`
  mutation($username:String, $friend:String){
    deleteFriend(username:$username, friend:$friend){
      response,
      status
    }
  }
`;

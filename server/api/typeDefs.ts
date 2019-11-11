import { buildSchema } from 'graphql';
const schema = buildSchema(`

input Account {
  firstName: String
  lastName: String
  username: String
  password: String
  email: String
  image: String
  active: Boolean
}
input Playlist {
  name: String
  creator: String
  follower_count: Int
  song_count: Int
  songs: [Track]
  users: [String]
}
input Track {
  song: String
  artist: String
}

input TrackInfo {
  track: String
  artist: String
  playlist: String
}

type PlaylistInfo {
  name: String,
  followers: Int,
  song_count: Int,
  songs: [Songs]
}

type Songs {
  track: String,
  artist: String,
  song: String,
  album: String,
  artwork: String
}

type UserData {
  firstName:String,
  lastName:String
  email: String,
  image: String
}
input UpdateData {
  firstName:String,
  lastName:String
  email: String
}
input PlaylistTrack {
  track: String,
  artist: String,
  song: String,
  album: String,
  artwork: String,
  playlist_name: String
}
type PlaylistResponse {
  playlists: [PlaylistInfo]
  response: String
  status: Boolean
}
type Response {
  response: String
  username:String
  status: Boolean
  user: UserData
}

type basicResponse {
  result:String
}
type Query {
  test(item:String): basicResponse
  onChangeSearch(search:String): [Songs]
  username: String
  response: String
  playlistsForUser(username: String): PlaylistResponse
  userData(username:String):Response
  status: Boolean
  search:[String]
}
type Mutation {
   createAccount(account:Account):Query
  searchSong(search:String):[Songs]
   deleteUser(username:String):Query
   deleteAll:Query
  loginCheck(username:String,password:String): Query
   updateUser(username:String,updateData:UpdateData):Query
   updatePassword(username:String,currentPass:String,newPass:String):Query
   newPlaylist(playlist:Playlist ):Query
   newTrack(username:String,track:PlaylistTrack):Query
   deleteTrack(username:String,track:TrackInfo):Query
   followPlaylist(username: String, playlistName: String):Query
   unfollowPlaylist(username: String, playlistName: String):Query
  }
`);
export default schema
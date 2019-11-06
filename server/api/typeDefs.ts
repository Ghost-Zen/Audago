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
type PlaylistInfo {
  name: String,
  followers: Int,
  song_count: Int
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
  song: String
  artist: String
  playlist_name: String
}
type Query {
  user: UserData
  response: String,
  list: [PlaylistInfo]
  status: Boolean
  search:[String]
}
type Mutation {
   createAccount(account:Account):Query
   searchSong(search:String):Query
   loginCheck(username:String,password:String):Query
   userData(username:String):Query
   deleteUser(username:String):Query
   deleteAll:Query
   updateUser(username:String,updateData:UpdateData):Query
   updatePassword(username:String,currentPass:String,newPass:String):Query
   newPlaylist(playlist:Playlist ):Query
   newTrack(track:PlaylistTrack):Query
   deleteTrack(track:PlaylistTrack):Query
   followPlaylist(username: String, playlistName: String):Query
   unfollowPlaylist(username: String, playlistName: String):Query
   playlistsForUser(username: String):Query
  }
`);
export default schema
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`

input Account {
  firstName: String
  lastName: String
  username: String
  password: String
  email: String
  image: String
  active: Boolean
}

input Track {
  song: String
  artist: String
}

input TrackInfo {
  track: String
  artist: String
  playlist_name: String
}
 
type PlaylistInfo {
  name: String,
  creator:String,
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
  deleteTrack(username:String,trackInfo:TrackInfo):Response
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
   updatePassword(username:String,currentPass:String,newPass:String,testPass:String):Query
   newPlaylist(name:String, creator:String ):Query
   newTrack(username:String,track:PlaylistTrack):Query
   followPlaylist(username: String, playlistName: String):Query
   unfollowPlaylist(username: String, playlistName: String):Query
  }
`);
exports.default = schema;
//# sourceMappingURL=typeDefs.js.map
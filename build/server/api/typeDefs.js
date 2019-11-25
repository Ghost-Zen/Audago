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
  songs: [Songs],
  follower_list: [String]
}

type Songs {
  track: String,
  artist: String,
  song: String,
  album: String,
  artwork: String
}

type TimeStamp {
  created: String,
  lastSeen: String
}

type Friend {
  friend: String,
  image: String
}

type UserData {
  firstName:String,
  lastName:String
  email: String,
  image: String,
  timeStamp: TimeStamp
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
  data: [Friend]
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
  allPlaylists: PlaylistResponse
  deleteTrack(username:String,trackInfo:TrackInfo):Response
  userData(username:String):Response
  status: Boolean
  search:[String]
  viewFriendRequests(username: String):Response
  viewFriendsList(username:String):Response
  accountSearch(username:String, search:String):Response
  signOut(username:String, date:String):Response
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
   sendRequest(requester:String, receiver:String):Query
   acceptRequest(username:String, friend:String):Query
   denyRequest(username:String, friend:String):Query
   deleteFriend(username:String, friend:String):Query
  }
`);
exports.default = schema;
//# sourceMappingURL=typeDefs.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`
input TimeStamp {
  created: String
  lastSeen: String
}
input Account {
  firstName: String
  lastName: String
  username: String
  password: String
  email: String
  image: String
  active: Boolean
  timestamp: TimeStamp
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
input PlaylistTrack {
  song: String
  artist: String
  playlist_name: String
}
type Query {
  response: String,
  list: [PlaylistInfo]
  status: Boolean
  search:[String]
}
type Mutation {
   createAccount(account:Account):Query
   searchSong(search:String):Query
   loginCheck(username:String,password:String):Query
   deleteUser(username:String):Query
   deleteAll:Query
   updateUser(username:String,account:Account!):Query
   newPlaylist(playlist:Playlist ):Query
   newTrack(track:PlaylistTrack):Query
   deleteTrack(track:PlaylistTrack):Query
   followPlaylist(username: String, playlistName: String):Query
   unfollowPlaylist(username: String, playlistName: String):Query
   playlistsForUser(username: String):Query
  }
`);
exports.default = schema;
// {
// 	"playlist":  {
//   "name": "2019 Rap",
//   "creator": "dyllanhope123",
//   "follower_count": 1,
//   "song_count": 0,
//   "songs": [],
//   "users": []
//   }
// }
//# sourceMappingURL=typeDefs.js.map
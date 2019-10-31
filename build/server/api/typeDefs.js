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

input Playlist = {
  name: String
  creator: String
  follower_count: Number
  song_count: Number
  songs: [Track]
  users: [String]
}

input Track = {
  song: String
  artist: String
}

input PlaylistTrack = {
  song: String
  artist: String
  playlist_name: String
}

type Query {
  response: String
  status: Boolean
  search:[String]
}

type Mutation {
   createAccount(firstName:String,lastName:String,username:String,email:String,password:String,image:String,active:Boolean):Query
   searchSong(search:String):Query
   loginCheck(username:String,password:String):Query
   deleteUser(username:String):Query
   deleteAll:Query
   updateUser(username:String,account:Account!):Query
   newPlaylist(playlist:Playlist ):Query
   newTrack(track:PlaylistTrack):Query
   deleteTrack(track:PlaylistTrack):Query
  }
`);
exports.default = schema;
//# sourceMappingURL=typeDefs.js.map
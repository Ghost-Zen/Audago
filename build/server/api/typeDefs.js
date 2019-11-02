"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`

type Query {
  response: String
  search:String
}

type Search {
  artist: String
  track: String
  song: String
  album: String
  artwork: String
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

input PlaylistTrack {
  song: String
  album: String
  artwork:String
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
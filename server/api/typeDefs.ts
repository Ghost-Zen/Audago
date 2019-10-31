import { buildSchema } from 'graphql';
const schema = buildSchema(`

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
  }
`);
export default schema
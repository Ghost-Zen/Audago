import { buildSchema } from 'graphql';
const schema = buildSchema(`

type Query {
  response: String
  status: Boolean
  search:[String]
}

type Playlist {
  name: String
  creator: String
  follower_count: Number
  song_count: Number
}

type Track {
  song: String,
  artist: String,
  playlist_name:String
}

type Account {
  firstName: String
    lastName: String
    username: String
    password: String
    email: String
    image: String
    active: boolean
    timestamp: {
        created: any
        lastSeen: String
    }
}

type Mutation {
   createAccount(firstName:String,lastName:String,username:String,email:String,password:String,image:String,active:Boolean):Query
   searchSong(search:String):Query
   loginCheck(username:String,password:String):Query
   deleteUser(username:String):Query
   deleteAll:Query
   updateUser(username:String,account:Account):Query
   newPlaylist(playlist:Playlist ):Query
   newTrack(track:Track):Query
   deleteTrack(track:Track):Query
  }
`);
export default schema
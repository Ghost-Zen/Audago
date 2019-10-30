import { buildSchema } from 'graphql';
const schema = buildSchema(`

type Query {
  response: String
  search:[String]
}

type Mutation {
   createAccount(firstName:String,lastName:String,username:String,email:String,password:String,image:String,active:Boolean):Query
   searchSong(search:String):Query
   loginCheck(username:String,password:String):Query
  }
`);
export default schema
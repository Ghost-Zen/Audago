import { buildSchema } from 'graphql';
const schema = buildSchema(`

type Query {
  test: String
}

type userSchema {
   firstName:String
   lastName:String
   username:String
   email:String
   password:String
   image:String
   active:Boolean
 }

 type searchSchema{
  search:String
 }

 type loginSchema{
   username:String
   password:String
 }


type Mutation {
   createAccount(firstName:String,lastName:String,username:String,email:String,password:String,image:String,active:Boolean):Query
   searchSong(search:String):searchSchema
   loginCheck(username:String,password:String):loginSchema
  }
`);
export default schema
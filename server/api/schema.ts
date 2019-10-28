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


type Mutation {
   createAccount(firstName:String,lastName:String,username:String,email:String,password:String,image:String,active:Boolean):userSchema
   searchSong(search:String):searchSchema
  }
`);
export default schema
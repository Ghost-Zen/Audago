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
   timestamp:String
 }
type Mutation {
   createAccount(firstName:String,lastName:String,username:String,email:String,password:String,image:String,active:Boolean,timestamp:String):userSchema
}
`);
export default schema
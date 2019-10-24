import { buildSchema } from 'graphql';
const schema = buildSchema(`
type Query {
  test: String
}
type userSchema {
   firstname:String
   lastname:String
   username:String
   email:String
   password:String
 }
type Mutation {
   createAccount(firstname:String,lastname:String,username:String,email:String,password:String):userSchema
}
`);
export default schema
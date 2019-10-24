import { buildSchema } from 'graphql';
const schema = buildSchema(`
type Query {
  test: String
}
type userSchema {
   descript:String
 }
type Mutation {
   createAccount(input: String):userSchema
}
`);
export default schema
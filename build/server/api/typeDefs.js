"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`
type Query {
  response: String
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
exports.default = schema;
//# sourceMappingURL=typeDefs.js.map
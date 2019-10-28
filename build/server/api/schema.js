"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`
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
exports.default = schema;
//# sourceMappingURL=schema.js.map
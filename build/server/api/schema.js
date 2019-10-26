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
   timestamp:String
 }
type Mutation {
   createAccount(firstName:String,lastName:String,username:String,email:String,password:String,image:String,active:Boolean,timestamp:String):userSchema
}
`);
exports.default = schema;
//# sourceMappingURL=schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`
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
exports.default = schema;
//# sourceMappingURL=schema.js.map
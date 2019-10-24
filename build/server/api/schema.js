"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`
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
exports.default = schema;
//# sourceMappingURL=schema.js.map
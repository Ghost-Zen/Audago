"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`
type Query {
  test: String
}
`);
exports.default = schema;
//# sourceMappingURL=schema.js.map
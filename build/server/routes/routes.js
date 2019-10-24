"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_api_1 = __importDefault(require("../api/user_api"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_1 = require("graphql");
const userApi = new user_api_1.default();
class AppRoutes {
    constructor(app) {
        this.app = app;
    }
    router() {
        var schema = graphql_1.buildSchema(`
  type Query {
    hello: String
  }
`);
        var root = { hello: () => 'Hello world!' };
        // this.app.get('/', (req, res) => {
        // })
        this.app.use('/graphql', express_graphql_1.default({
            schema: schema,
            rootValue: root,
            graphiql: true,
        }));
        this.app.get('/api/signup', userApi.userSignUp);
        this.app.post('/api/signin', userApi.userSignIn);
        this.app.post('/api/delete/user', userApi.deleteUser);
        this.app.post('/api/edit/user', userApi.editUserData);
        this.app.get('/api/user', userApi.getUserData);
    }
}
exports.default = AppRoutes;
//# sourceMappingURL=routes.js.map
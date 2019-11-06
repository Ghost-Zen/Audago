"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_graphql_1 = __importDefault(require("express-graphql"));
const resolvers_1 = __importDefault(require("../api/resolvers"));
const typeDefs_1 = __importDefault(require("../api/typeDefs"));
const auth_1 = __importDefault(require("../api/auth"));
const authuser = new auth_1.default();
class AppRoutes {
    constructor(app) {
        this.app = app;
    }
    router() {
        this.app.post('/verify', authuser.verifyToken);
        this.app.use('/graphql', express_graphql_1.default({
            schema: typeDefs_1.default,
            rootValue: resolvers_1.default,
            graphiql: true,
        }));
        //add extra routes below here
    }
}
exports.default = AppRoutes;
//# sourceMappingURL=routes.js.map
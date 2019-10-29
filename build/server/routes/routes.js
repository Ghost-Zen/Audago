"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_api_1 = __importDefault(require("../api/user_api"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const resolver_1 = __importDefault(require("../api/resolver"));
const schema_1 = __importDefault(require("../api/schema"));
const userApi = new user_api_1.default();
class AppRoutes {
    constructor(app) {
        this.app = app;
    }
    router() {
        this.app.use('/graphql', express_graphql_1.default({
            schema: schema_1.default,
            rootValue: resolver_1.default,
            graphiql: true,
        }));
        this.app.get('/api/signup', userApi.userSignUp);
        this.app.post('/api/signin', userApi.userSignIn);
        this.app.post('/api/delete/user', userApi.deleteUser);
        this.app.get('/api/edit/user', userApi.editUserData);
        this.app.get('/api/user/data/:user', userApi.getUserData);
        this.app.get('/api/create/playlist', userApi.createPlaylist);
    }
}
exports.default = AppRoutes;
//# sourceMappingURL=routes.js.map
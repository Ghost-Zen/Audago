"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        this.app.get('/verify_signup/:userToken', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let user_token = req.params.userToken.split('$');
            yield resolvers_1.default.verifyAccount(user_token[0], user_token[1]);
            res.send('Verified Account');
        }));
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
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_api_1 = __importDefault(require("../api/user_api"));
const userApi = new user_api_1.default();
class AppRoutes {
    constructor(app) {
        this.app = app;
    }
    router() {
        this.app.get('/', (req, res) => {
        });
        this.app.post('/api/signup', userApi.userSignUp);
        this.app.post('/api/signin', userApi.userSignIn);
        this.app.post('/api/edituser', userApi.editUserData);
        this.app.get('/api/user', userApi.getUserData);
    }
}
exports.default = AppRoutes;
//# sourceMappingURL=routes.js.map
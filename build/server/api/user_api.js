"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserApi {
    userSignUp(req, res) {
    }
    userSignIn(req, res) {
    }
    getUserData(req, res) {
        res.json({
            status: 'Dummy Data',
            response: { firstname: 'John', lastname: 'Doe', username: 'johndoe123' }
        });
    }
    editUserData(req, res) {
    }
}
exports.default = UserApi;
//# sourceMappingURL=user_api.js.map
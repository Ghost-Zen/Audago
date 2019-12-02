"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../services/accounts/config");
class Auth {
    constructor() {
        this.check = (req, res, next) => {
            try { //will remove soon, redundant will use graphqlAuth only in the future
                let token = req.body.token;
                let { data } = jsonwebtoken_1.default.verify(token, config_1.Config.SECRET);
                res.json({
                    status: "Token Verified",
                    response: true,
                    client_id: data.username,
                    token: data.token
                });
            }
            catch (err) {
                res.send(err);
            }
        };
        this.graphqlAuth = (req, res, next) => {
            try {
                let header = req.headers.authorization;
                let token = header.split(':');
                let { data } = jsonwebtoken_1.default.verify(token[1], config_1.Config.SECRET);
                req.user = data.username;
                next();
            }
            catch (err) {
                res.json({ response: 'api requires valid token' });
            }
        };
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map
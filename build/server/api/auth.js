"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../services/accounts/config");
class Auth {
    constructor() {
        this.verifyToken = (req, res, next) => {
            let token = req.body.token;
            try {
                if (typeof token !== 'undefined') {
                    let { data } = jsonwebtoken_1.default.verify(token, config_1.Config.SECRET);
                    res.json({
                        status: "Token Verified",
                        response: true,
                        client_id: data.username,
                        token: data.token
                    });
                }
                else {
                    res.json({
                        status: 'Token error',
                        response: false,
                        client_id: "Problem with token",
                        token: "Please login again"
                    });
                }
            }
            catch (_a) {
                res.json({
                    status: 'No Token',
                    response: false,
                    client_id: "No Token stored",
                    token: "Please login again"
                });
            }
        };
        this.graphqlAuth = (req, res, next) => {
            try {
                let header = req.headers.authorization;
                let token = header.split(':');
                let { data } = jsonwebtoken_1.default.verify(token[1], config_1.Config.SECRET);
                next();
            }
            catch (err) {
                res.send('No, dont try.');
            }
        };
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map
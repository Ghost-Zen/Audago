import jwt from 'jsonwebtoken';
import { Config } from '../services/accounts/config'

export default class Auth {

    verifyToken = (req, res, next) => {
        let token = req.body.token
        if (typeof token !== 'undefined') {
            let { data } = jwt.verify(token, Config.SECRET)
            res.json({
                status: "Token Verified",
                response: true,
                client_id: data.username,
                token: data.token
            })
        } else {
            res.json({
                status: 'Token error',
                response: false,
                client_id: "Problem with token",
                token: "Please login again"
            })
        }
    }


}
import jwt from 'jsonwebtoken';
import { Config } from '../services/accounts/config'

export default class Auth {

    check = (req, res, next) => {
        try {  //will remove soon, redundant will use graphqlAuth only in the future
                let token = req.body.token
                let { data } = jwt.verify(token, Config.SECRET)
                res.json({
                    status: "Token Verified",
                    response: true,
                    client_id: data.username,
                    token: data.token
                })
        }
        catch(err){
            res.send(err)
        }
    }

    graphqlAuth = (req,res,next) => {
      try{
        let header = req.headers.authorization
        let token = header.split(':')
        jwt.verify(token[1], Config.SECRET)
        next();
      }
      catch(err){
        res.json({response:'api requires valid token'})
      }
    }


}

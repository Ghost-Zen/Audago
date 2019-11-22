import jwt from 'jsonwebtoken';
import { Config } from '../services/accounts/config'

export default class Auth {

    check = (req, res, next) => {
        try {
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
        let { data } = jwt.verify(token[1], Config.SECRET)
        next();
      }
      catch(err){
        next(); //for now till i stop login resolver from being blocked
        // res.json({response:'No, dont try.'})
      }
    }


}

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require("request")
/* Models */
const Auth = mongoose.model('Auth')

/* Const Library */
const logger = require('./../libs/loggerLib')
const responseLib = require('./../libs/responseLib')
const check = require('./../libs/checkLib')
const tokenLib = require('./../libs/timeLib')

let isAuthenticated = (req, res, next) => {
  console.log(`------------ inside isAuthenticated function-----------------`)
  let token =req.params.authToken || req.query.authToken || req.body.authToken || req.header('Authorization');
   if (token) {
    token = token.split("\"").join("");
    Auth.findOne({'authToken': token }, (err, authDetails) => {
      //console.log('authdetails',authDetails)
      if (err) {
        console.log(err)
        logger.error(err.message, 'Authentication Middleware', 10)
        let apiResponse = responseLib.generate(true, 'Failed To Authenticate', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(authDetails)) {
        logger.error('No Authentication Key Is Present', 'Authentication Middleware', 10)
        let apiResponse = responseLib.generate(true, 'Invalid Or Expired Authentication Key', 404, null)
        res.send(apiResponse)
      } else {
        console.log(tokenLib.secretKey);
        jwt.verify(authDetails.authToken, tokenLib.secretKey, (err, decoded) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              logger.error(err.message, 'Authorization Middleware', 10)
              let apiResponse = responseLib.generate(true, 'Token Is Expired. Login Again to Generate New Token', 500, null)
              res.send(apiResponse)
            } else if (err.name === 'JsonWebTokenError') {
              logger.error(err.message, 'Authorization Middleware', 500)
              let apiResponse = responseLib.generate(true, 'Invalid or Malformed Token. Regenerate Token')
              res.send(apiResponse)
            } else {
              logger.error(err.message, 'Authorization Middleware', 10)
              let apiResponse = responseLib.generate(true, 'Failed To Authenticate', 500, null)
              res.send(apiResponse)
            }
          } else if (check.isEmpty(decoded)) {
            let apiResponse = responseLib.generate(true, 'Failed To Authenticate', 500, null)
            res.send(apiResponse)
          } else {
            //console.log('--------------------')
            //console.log(decoded.data)

            req.user = {userId: decoded.data.userId}

            next()
          }
        })
        //next()
      }
    })
  } else {
    logger.error('Authentication Token Missing', 'Authentication Middleware', 5)
    let apiResponse = responseLib.generate(true, 'Authentication Token Is Missing In Request', 400, null)
    res.send(apiResponse)
  }
}

module.exports = {
  isAuthenticated: isAuthenticated
}

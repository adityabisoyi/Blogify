const jwt =  require('jsonwebtoken')
const HttpError = require('../models/error.model')
// require('dotenv').config()

const authMiddleware = async (req, res, next) => {
    const Authorization = req.headers.Authorization || req.headers.authorization

    if(Authorization && Authorization.startsWith("Bearer")) {
        const token = Authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (error, info) => {
            if(error) {
                return next(new HttpError("Unauthorized, invalid token", 403))
            }

            req.user = info
            next()
        })
    } else {
        // console.log(error)
        return next(new HttpError("Unauthorized. No token", 402))
    }
}


module.exports = authMiddleware
const jwt = require("jsonwebtoken")
const User = require('../models/users')

// the name of the cookie value should be 'cookie'
const verifyToken = (req, res, next) => {
    const authCookie = req.headers.token
    if (authCookie) {
        jwt.verify(authCookie, process.env.JWT_SECRET, (error, user)=>{
            if (error) return res.status(200).json({"message": "token is invalid"})
            req.user = user
            next()
        })
    } else {
        return res.status(200).json({"message": "unauthorized"})
    }
}

module.exports = {
    verifyToken,
}
const expresss = require('express')
const router = expresss.Router()
const {createNewUser, logInUser, logInUserWithGoogle, googleFailure, googleSuccess} = require('../controllers/auth')
const passport = require('passport')
const passportSetup = require('../config/passport-setup')


router.route('/register').post(createNewUser)
router.route('/login').post(logInUser)
router.route('/google').get(passport.authenticate('google',{scope:['profile', 'email'], session: false}))
router.route('/google/redirect').get(passport.authenticate('google', {
    session: false,
    // successRedirect: '/api/v1/auth/google/success',
    failureRedirect: '/api/v1/auth/google/failure',
}), logInUserWithGoogle)
router.route('/google/success').get(googleSuccess)
router.route('/google/failure').get(googleFailure)

module.exports = router
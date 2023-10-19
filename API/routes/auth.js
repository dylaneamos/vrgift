const expresss = require('express')
const router = expresss.Router()
const {createNewUser, logInUser} = require('../controllers/auth')


router.route('/register').post(createNewUser)
router.route('/login').post(logInUser)

module.exports = router
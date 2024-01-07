const expresss = require('express')
const {verifyToken} = require('../controllers/jwt')
const router = expresss.Router()
const {uploadAnswers, getAllUsersAnswers, getSingleUserAnswer} = require('../controllers/answers')


router.route('/').post(verifyToken, uploadAnswers).get(verifyToken, getAllUsersAnswers)
router.route('/:id').get(getSingleUserAnswer)

module.exports = router
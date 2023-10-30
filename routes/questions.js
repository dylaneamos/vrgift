const expresss = require('express')
const {verifyToken} = require('../controllers/jwt')
const router = expresss.Router()
const {getAllQuestions, createQuestion,} = require('../controllers/questions')


router.route('/').get(getAllQuestions).post(verifyToken, createQuestion)
// router.route('/:id').get(giftInfo).patch(editGifts).delete(deleteGift)

module.exports = router
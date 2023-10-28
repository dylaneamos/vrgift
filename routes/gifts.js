const expresss = require('express')
const router = expresss.Router()
const {getAllGifts,createGift,giftInfo,editGifts,deleteGift} = require('../controllers/gifts')


router.route('/').get(getAllGifts).post(createGift)
router.route('/:id').get(giftInfo).patch(editGifts).delete(deleteGift)

module.exports = router
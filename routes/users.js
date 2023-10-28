const expresss = require('express')
const router = expresss.Router()
const {verifyToken} = require('../controllers/jwt')
const {getAllUsers,SingleUser,updateUser,deleteUser,} = require('../controllers/users')


router.route('/').get(verifyToken, getAllUsers)
router.route('/:id').get(verifyToken, SingleUser).put(verifyToken, updateUser).delete(verifyToken, deleteUser)

module.exports = router
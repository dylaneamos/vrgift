const expresss = require('express')
const router = expresss.Router()
const {getAllUsers,loginUser, createNewUser,SingleUser,updateUser,deleteUSer,} = require('../controllers/users')


router.route('/').get(getAllUsers).post(createNewUser)
router.route('/login').post(loginUser)
router.route('/:id').get(SingleUser).patch(updateUser).delete(deleteUSer)

module.exports = router
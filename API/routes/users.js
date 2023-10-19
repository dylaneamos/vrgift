const expresss = require('express')
const router = expresss.Router()
const {getAllUsers,loginUser,SingleUser,updateUser,deleteUSer,} = require('../controllers/users')


router.route('/').get(getAllUsers)
router.route('/login').post(loginUser)
router.route('/:id').get(SingleUser).patch(updateUser).delete(deleteUSer)

module.exports = router
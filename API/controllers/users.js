const User = require('../models/users')

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json({ users })
    } catch(error){
        return res.json({'value':'all users'})
    }
}

const loginUser = (req, res) => {
    res.json(req.body)
}


const SingleUser = (req, res) => {
    res.json(req.params.id)
}

const updateUser = (req, res) => {
    res.json(req.params.id)
}

const deleteUSer = (req, res) => {
    res.json({'value':'user deleted'})
}

module.exports = {
    getAllUsers,
    loginUser,
    SingleUser,
    updateUser,
    deleteUSer,
}
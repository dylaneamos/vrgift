const User = require('../models/users')

const getAllUsers = async (req, res) => {
    // const users = await User.
    res.json({'value':'all users'})
}

const createNewUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({ user })   
    } catch (error) {
        const {message} = error
        return res.status(403).json({ message })
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
    createNewUser,
    loginUser,
    SingleUser,
    updateUser,
    deleteUSer,
}
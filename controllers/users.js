const User = require('../models/users')
const bcrypt = require("bcrypt");

// get all users(used admin)
const getAllUsers = async (req, res) => {
// console.log(req.user.id);
    try{
        if (req.user.isAdmin) {
            const users = await User.find();
            const usersWithoutPassword = users.map(user => {
                const { password, ...userWithoutPassword } = user.toObject();
                return userWithoutPassword;
            });
            res.status(200).json(usersWithoutPassword);
        } else {
            return res.status(200).json({'message':'unauthorized'})
        }
    } catch(error){
        return res.json({'message':'an error occurred'})
    }
}

// get a single user
const SingleUser = async (req, res) => {
    if (req.params.id === req.user.id || req.user.isAdmin === true) {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(200).json({"message":"unauthorized"})
            }
            const {password, ...others} = user._doc
            return res.status(200).json(others)
        } catch (error) {
            res.status(200).json({"message":"an error occurred"})
        }
    }else{
        return res.status(200).json({"message": "unauthorized"})
    }
}

// update the user profile
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if(user && req.params.id === req.user.id || req.user.isAdmin){
            user.fullname = req.body.fullname || user.fullname
            if (req.body.password) {
                try {
                    // generate salt and hash the password using the salt created
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(req.body.password, salt);
                    user.password = hashedPassword
                } catch (error) {
                    return res.status(200).json({"message":"an error occured"})
                }
            }   
            const updatedUser = await user.save()
            const { password, ...others } = updatedUser._doc;
            return res.status(200).json(others)
        }else{
            return res.status(200).json({"message":"user not found"})
        }
    } catch (error) {
        return res.status(200).json({"message":"user not found"})
    }
}

// delete user account
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if(user && req.params.id === req.user.id || req.user.isAdmin){
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            return res.status(200).json({"message": "user account deleted successfully"})
        }else{
            return res.status(200).json({"message": "user not found"})
        }
    } catch(error){
        console.log(error);
        return res.status(200).json({"message":"user not found"})
    }
}

module.exports = {
    getAllUsers,
    SingleUser,
    updateUser,
    deleteUser,
}
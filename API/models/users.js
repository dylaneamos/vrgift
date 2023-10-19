const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'fullname must be provided'],
        trim: true,
        min: 3,
        max: 40
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
        trim: true,
        unique: [true, 'email is already registered'],
        max: 50
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
        trim: true,
        min: 6
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},
{timestamps:true}
)

module.exports = mongoose.model('User', UserSchema)
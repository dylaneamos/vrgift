const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
        min: 3,
        max: 40
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'email is already registered'],
        max: 50
    },
    password: {
        type: String,
        trim: true,
        min: 6
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    googleID: {
        type: String,
    },
},
{timestamps:true}
)

module.exports = mongoose.model('User', UserSchema)
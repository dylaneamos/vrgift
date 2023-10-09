const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'fullname must be provided'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
        trim: true
    }
})

module.exports = mongoose.model('User', UserSchema)
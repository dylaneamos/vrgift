const mongoose = require('mongoose')
const { Schema } = mongoose;

const choiceSchema = new Schema({
    choice: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    }
});

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    choices: {
        type: [choiceSchema],
        required: true
    }
});

module.exports = mongoose.model('Question', questionSchema);
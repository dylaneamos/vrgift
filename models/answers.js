const mongoose = require('mongoose');
const {Schema} = mongoose;

const AnswerSchema = new Schema({
 questionId: {
    type: String,
    required: true,
},
 selectedChoiceId: {
    type: String,
    required: true,
},
});

const UserSchema = new Schema({
 _id: {
    type: String,
    required: true,
},
 userAnswers: [AnswerSchema]
});

const UserModel = mongoose.model("answer", UserSchema);

module.exports = UserModel;

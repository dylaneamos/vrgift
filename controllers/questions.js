const Question = require('../models/questions')

const getAllQuestions = async (req, res) => {
    try{
        const questions = await Question.find()
        if (questions.length === 0) {
            return res.json({'message':'nothing to show right now!'})
        }else{
            res.status(200).json(questions);
        }
    } catch(error){
        return res.json({'message':'an error occurred'})
    }
}

const createQuestion = async (req, res) => {
    try{
        if (req.user.isAdmin) {
            const question = new Question({
                question: req.body.question,
                choices: req.body.choices,
                answer_id: req.body.answer_id
            });
            await question.save();
            res.json(question);
        } else {
            return res.status(200).json({'message':'unauthorized'})
        }
    } catch(error){
        return res.json({'message':'an error occurred' + error})
    }
}

module.exports = {
    getAllQuestions,
    createQuestion,
}
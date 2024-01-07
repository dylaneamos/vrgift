const Answer = require("../models/answers");
const User = require("../models/users");

const uploadAnswers = async (req, res) => {
  try {
    const answerData = req.body;
    // console.log(answerData);

    // deletes the user_id from the user provided data
    if (answerData._id) {
      delete answerData._id;
    }
    if (answerData.fullname) {
      delete answerData.fullname;
    }
    // add new id
    answerData._id = req.user.id;
    const user = await User.findById(req.user.id);
    answerData.fullname = user.fullname;
    // console.log(user.fullname);

    const answer = new Answer(answerData);
    await answer.save();

    res.status(200).json(answer);
  } catch (error) {
    return res.status(400).json({ message: "an error occurred" });
  }
};

const getAllUsersAnswers = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const answers = await Answer.find();
      if (answers.length === 0) {
        return res.json({ message: "nothing to show right now!" });
      } else {
        res.status(200).json(answers);
      }
    } else {
      return res.status(200).json({ message: "unauthorized" });
    }
  } catch (error) {
    return res.json({ message: "an error occurred" });
  }
};

const getSingleUserAnswer = async (req, res) => {
  console.log(req.user.id);
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(200).json({ message: "User not found" });
    }
    // console.log(answer);
    const { _id, ...others } = answer._doc;
    return res.status(200).json(others);
  } catch (error) {
    // console.log("object");
    res.status(200).json({ message: "an error occurred" });
  }
};

module.exports = {
  uploadAnswers,
  getAllUsersAnswers,
  getSingleUserAnswer,
};

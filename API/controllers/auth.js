const User = require("../models/users");
const bcrypt = require("bcrypt");
const validator = require("validator");

// register
const createNewUser = async (req, res) => {
  if (validator.isEmail(req.body.email)) {
    const checkUser = await User.findOne({ email: req.body.email });
    if (!checkUser) {
      try {
        // generate salt and hash the password using the salt created
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedPassword,
          });
          try {
            const user = await newUser.save();
            const {password, ...others} = user._doc
            res.status(201).json({ others });
          } catch (error) {
            const { message } = error;
            res.status(403).json({ message });
          }
      } catch (error) {
        res.status(201).json({ message: "failed to create user" });
      }
    } else {
      return res.status(200).json({ message: "email already registered" });
    }
  } else {
    return res.status(200).json({ message: "email not valid" });
  }
};

// login
const logInUser = async (req, res) => {
    if (validator.isEmail(req.body.email)) {
    try {
        const user =  await User.findOne({email: req.body.email})
        if(!user){
            return res.status(200).json({"message": "wrong credentials"})
        }
        comparePassword = await bcrypt.compare(req.body.password, user.password)
        if(!comparePassword){
            return res.status(200).json({"message": "wrong credentials"})
        }
        const {password, ...others} = user._doc
        res.status(200).json({ others })
    } catch (error) {
        res.status(500).json(error)
    }}else{
        return res.status(200).json({"message": "wrong credentials"})
    }
}

module.exports = {
  createNewUser,
  logInUser,
};

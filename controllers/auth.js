const User = require("../models/users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// register user
const createNewUser = async (req, res) => {
  if (!req.body.email === null || !req.body.password || !req.body.fullname) {
    return res.status(200).json({ message: "all the fields are required" });
  }
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
          const { password, ...others } = user._doc;
          res.status(201).json(others);
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

// login user
const logInUser = async (req, res) => {
  if (!req.body.email === null || !req.body.password) {
    return res.status(200).json({ message: "all the fields are required" });
  }
  if (validator.isEmail(req.body.email)) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(200).json({ message: "wrong credentials" });
      }
      comparePassword = await bcrypt.compare(req.body.password, user.password);
      if (!comparePassword) {
        return res.status(200).json({ message: "wrong credentials" });
      }
      const { password, ...others } = user._doc;
      const token = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
      }, process.env.JWT_SECRET,
      { expiresIn: '5m' });
      res.status(200).json({...others, token});
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(200).json({ message: "wrong credentials" });
  }
};

// callback route to google to redirect to
const logInUserWithGoogle = async (req, res) => {
  const { user, token } = req.user;
  console.log(user, token);
  res.json({ ...user._doc, token });
}
// google success
const googleSuccess = async (req,res) => {
  res.json({"message":"done"})
}
// google failure
const googleFailure = async (req, res) => {
  res.json({"message":"something went wrong"})
}
module.exports = {
  googleFailure,
  createNewUser,
  logInUser,
  logInUserWithGoogle,
  googleSuccess,
};
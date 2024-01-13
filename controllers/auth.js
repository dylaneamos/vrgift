const User = require("../models/users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const passportSetup = require("../config/passport-setup");

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
          const token = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30m" }
          );
          const data = {
            id: others["_id"],
            fullname: others["fullname"],
            token: token,
          };
          res.status(201).json(data);
        } catch (error) {
          const { message } = error;
          res.status(403).json({ message });
        }
      } catch (error) {
        res.status(201).json({ message: "failed to create user" });
      }
    } else {
      return res.status(200).json({ message: "user already registered" });
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
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
      );
      const data = {
        id: others["_id"],
        fullname: others["fullname"],
        token: token,
      };

      res.status(200).json(data);
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
  res.cookie("userData", JSON.stringify({ ...user._doc, token }), {
    httpOnly: true,
  });
  // redirect to the frontend with cookie
  return res.redirect("https://kindaki.onrender.com/");
};

// google success
const googleSuccess = async (req, res) => {
  if (!req.cookies.userData) {
    res.status(500).json({ error: "No user data found" });
    return;
  }
  const userData = JSON.parse(req.cookies.userData);
  // console.log(userData);
  res.json({
    status: "success",
    data: userData,
  });
};

// google failure
const googleFailure = async (req, res) => {
  res.json({ message: "something went wrong" });
};
module.exports = {
  googleFailure,
  createNewUser,
  logInUser,
  logInUserWithGoogle,
  googleSuccess,
};

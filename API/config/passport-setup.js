const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config()
const User = require("../models/users");
const jwt = require("jsonwebtoken");

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID:     process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/redirect',
        // passReqToCallback   : true
    }, async (accessToken, refreshToken, profile, email, done)=>{
        const googleID = email._json.sub;

        // Find a user with the same Google ID in your database
        const existingUser = await User.findOne({ googleID: googleID });

        if (existingUser) {
            // If a user with the same Google ID exists, then the user is a returning user
            const token = jwt.sign({
                id: existingUser._id,
                isAdmin: existingUser.isAdmin,
            }, process.env.JWT_SECRET,
            { expiresIn: '5m' });
            const userWithToken = { user: existingUser, token: token };
            return done(null, userWithToken)
            // console.log(existingUser);
        } else {
            // If no user with the same Google ID exists, then the user is a new user
            const newUser = new User({
                fullname: email._json.name,
                email: email._json.email,
                googleID: email._json.sub,
            });

            try {
                const user = await newUser.save();
                const token = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin,
                }, process.env.JWT_SECRET,
                { expiresIn: '5m' });
                const userWithToken = { user: user, token: token };
                return done(null, userWithToken)
            } catch (error) {
                return done(error, null);
            }
        }
    })
)
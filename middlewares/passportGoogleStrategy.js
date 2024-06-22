
import dotenv from "dotenv"
dotenv.config();

import passport from "passport";
import passportGoogle from "passport-google-oauth2";

import GoogleUserModel from "../src/models/schemas/googleUser.schema.js";

// storing strategy used for authentication
const GoogleStrategy = passportGoogle.Strategy;

// authentication using passport
export default passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    passReqToCallback: true,
},
    async function (req, accessToken, refreshToken, profile, done) {
        let findUser;

        try {
            findUser = await GoogleUserModel.findOne({ googleId: profile.id });
        } catch (err) {
            return done(err, null);
        }

        try {
            if (!findUser) {
                const newUser = new GoogleUserModel({
                    name: profile.displayName,
                    email: profile.email,
                    googleId: profile.id,
                });
                const newSavedUser = await newUser.save();
                return done(null, newSavedUser);
            }
            return done(null, findUser);
        } catch (err) {
            return done(err, null);
        }
    }
));


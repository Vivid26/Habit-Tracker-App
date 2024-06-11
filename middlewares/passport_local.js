
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";

import { findUser, findUserById } from "../src/models/repositories/user.repository.js";
// storing strategy used for authentication
const LocalStrategy = passportLocal.Strategy;

// authentication using passport
export default passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function (email, password, done) {
        // find a user and establish the identity
        let user = await findUser(email);
        if (!user) {
            return done(null, false, { message: 'No user with this email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    let user = await findUserById(id);
    if (!user) {
        console.log("Error in passport_local/deserializeUser");
        return;
    }
    return done(null, user);
});

// Checking authentication
export const checkAuthenticated = function (req, res, next) {
    // if user is signed in , then pass on the request ot the next fucntion (controller's action)
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not signed in
    return res.redirect('/api/user/sign-in');
}

// Checking authentication
export const ensureAuthentication = function (req, res, next) {
    // if user is signed in , then pass on the request to home page
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    next();
}

// Setting authentication
export const setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // sending current signed in user to the locals for views
        res.locals.user = req.user
    }
    next();
}


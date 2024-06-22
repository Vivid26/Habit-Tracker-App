import passport from "passport";
import GoogleUserModel from "../src/models/schemas/googleUser.schema.js";
import { findUser, findUserById } from "../src/models/repositories/user.repository.js";

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {

    let googleUser = await GoogleUserModel.findById(id);
    let localUser = await findUserById(id);
    if (googleUser && !localUser) {
        return done(null, googleUser);
    } else if (localUser && !googleUser) {
        return done(null, localUser);
    } else {
        console.log("Error in deserializeUser");
        return;
    }
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


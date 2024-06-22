
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

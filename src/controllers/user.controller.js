import bcrypt from "bcrypt";
import { findUser, createNewUser, findUserWithToken, findUserWithValidToken } from "../models/repositories/user.repository.js";
import { sendPasswordResetEmail } from "../../utils/emails/passwordReset.js"
import crypto from "crypto";



// redirects the user to sign up page
export const signUp = async (req, res) => {
    try {
        return res.render('user_sign_up', {
            title: "Sign Up"
        });
    } catch (error) {
        console.log('Error in usersController/signUp: ', error);
        return res.redirect('back');
    }
}

// redirects the user to sign in page
export const signIn = async (req, res) => {
    try {
        return res.render('user_sign_in', {
            title: "Sign In"
        });
    } catch (error) {
        console.log('Error in usersController/signIn: ', error);
        return res.redirect('back');
    }
}

// creates a new user
export const create = async (req, res) => {
    try {
        if (req.body.password != req.body.confirmPassword) {
            req.flash('error', 'Password mismatch');
            return res.redirect('back');
        }

        const user = await findUser(req.body.email);
        if (!user) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            const newUser = await createNewUser(req.body, hashedPassword);
            return res.redirect("/api/user/sign-in");
        }
        req.flash('error', 'User is already present');
        return res.redirect('back');

    } catch (error) {
        console.log('Error in creating the user ', error);
        return res.redirect('back');
    }
}

// signs in existing user
export const createSession = async (req, res) => {
    req.flash('success', 'You are logged in!');
    return res.redirect('/');
}

// signs out the user
export const destroySession = async (req, res, done) => {
    await req.logOut((err) => {
        if (err) {
            return done(err);
        }
        res.clearCookie("Habit-Tracker");
        res.redirect('/');
    });
    req.flash('success', 'You are logged out!');
    return;
}

// redirects the user to foget password page
export const renderForgetPassword = async (req, res) => {
    try {
        return res.render('forget_password', {
            title: "Forgot Password",
            link: "/api/user/forget-password"
        });
    } catch (error) {
        console.log('Error in usersController/forgetPassword: ', error);
        return res.redirect('back');
    }
}

// generates link with reset password token
export const forgetPassword = async (req, res) => {
    try {
        const user = await findUser(req.body.email);
        if (!user) {
            req.flash('error', "Email address is invalid.")
            return res.redirect('back');
        }

        const token = await user.getResetPasswordToken();
        await user.save();

        const resetLink = `${process.env.BASE_URL}/api/user/reset-password/${token}`
        await sendPasswordResetEmail(user, resetLink);

        return res.render('reset_password', {
            title: "Reset Password",
            link: resetLink
        });
    } catch (error) {
        console.log('Error in usersController/forgetPassword: ', error);
        return res.redirect('back');
    }
}


// redirects the user to reset password page - visiting link to reset password page from mail
export const renderResetPassword = async (req, res) => {
    const { token } = req.params;
    const resetLink = `${process.env.BASE_URL}/api/user/reset-password/${token}`

    try {
        return res.render('reset_password', {
            title: "Reset Password",
            link: resetLink
        });
    } catch (error) {
        console.log('Error in usersController/forgetPassword: ', error);
        return res.redirect('back');
    }
}


// reset password
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    try {
        const hash = crypto.createHash("sha256").update(token).digest("hex");
        const userWithToken = await findUserWithToken(hash);
        const userWithValidToken = await findUserWithValidToken(hash);

        if (!userWithToken) {
            req.flash('error', 'No user found associated with entered email ID. Please Sign UP.');
            return res.redirect('/api/user/sign-up');
        }

        if (userWithToken && !userWithValidToken) {
            req.flash('error', 'Reset Token associated with respective mail is no more valid. Please try again.');
            return res.redirect('/api/user/forget-password');
        }

        if (!password || password !== confirmPassword) {
            userWithValidToken.resetPasswordExpire = null;
            userWithValidToken.resetPasswordToken = ""
            await userWithValidToken.save();
            req.flash('error', 'Password and Confirm Password mismatched.');
            return res.redirect('back');
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        userWithValidToken.password = hashedPassword;
        userWithValidToken.resetPasswordExpire = null;
        userWithValidToken.resetPasswordToken = ""
        await userWithValidToken.save();
        req.flash('success', 'Password changed successfully');
        return res.redirect('/api/user/sign-in');
    } catch (error) {
        console.log('Error in habitController/resetPassword: ', error);
        return res.redirect('back');
    }
}



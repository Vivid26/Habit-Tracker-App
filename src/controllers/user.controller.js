import bcrypt from "bcrypt";
import { findUser, createNewUser, updateUserPassword } from "../models/repositories/user.repository.js";



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
export const signIn = async (req, res) =>{
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
        if(req.body.password != req.body.confirm_password) {
            console.log('Password mismatch!');
            req.flash('error', 'Password mismatch');
            return res.redirect('back');
        }

        const user = await findUser(req.body.email);
        if (!user) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            const newUser = await createNewUser(req.body,hashedPassword);
            return res.redirect("/api/user/sign-in");
        }
        console.log('User is already present');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in creating the user ', error);
        return res.redirect('back');
    }
}

// signs in existing user
export const createSession = async (req, res) =>{
    req.flash('success', 'You are logged in!');
    return res.redirect('/');
}

// signs out the user
export const destroySession = async (req, res,done) =>{
    await req.logOut((err) => {
        if (err) {
            return done(err);
        }
        res.clearCookie("Habit-Tracker");
        res.redirect('/');
    });
    req.flash('success' , 'You are logged out!');   
    return;
}

// redirects the user to foget password page
export const forgetPassword = async (req, res) => {
    try {
        return res.render('forget_password', {
            title: "Reset Password"
        });
    } catch (error) {
        console.log('Error in usersController/forgetPassword: ', error);
        return res.redirect('back');
    }
}

// reset password
export const resetPassword = async (req, res) => {
    try {
        let user =await findUser(req.body.email);
        if(!user) {
            return res.render('/api/user/sign-up')
        }
        if(req.body.password==req.body.confirm_password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            const updatedUser = await updateUserPassword(user._id,hashedPassword);
            req.flash('success', 'Password changed successfully');
            return res.redirect('/api/user/sign-in');
        }
    } catch (error) {
        console.log('Error in habitController/resetPassword: ', error);
        return next(new ErrorHandler(400, error));
        return;
    }
}
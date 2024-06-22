import express from 'express';
import passport from 'passport';

import { signIn, signUp, create,createSession, destroySession, forgetPassword, resetPassword,renderForgetPassword,renderResetPassword} from '../controllers/user.controller.js';
import { checkAuthenticated, ensureAuthentication } from '../../middlewares/passportUtilities.js';
const userRouter = express.Router();

userRouter.route('/sign-up').get(ensureAuthentication,signUp);
userRouter.route('/sign-in').get(ensureAuthentication,signIn);

userRouter.route('/create').post(create);

// use passport as a middleware to authenticate
userRouter.route('/create-session').post(passport.authenticate('local',{failureRedirect: '/api/user/sign-in', failureFlash:true
},),createSession);

// used for deleting the user session
userRouter.route('/sign-out').get(destroySession);

// takes to forget password page
userRouter.route('/forget-password').get(renderForgetPassword);
userRouter.route('/forget-password').post(forgetPassword);

// mail link to reset the password
userRouter.route('/reset-password/:token').get(renderResetPassword);
//reset password 
userRouter.route('/reset-password/:token').post(resetPassword);

export default userRouter;
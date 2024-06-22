import express from 'express';
import passport from 'passport';

import { home, notFound } from '../controllers/home.controller.js';

const homeRouter = express.Router();

homeRouter.route('/').get(home);
homeRouter.route('/404').get(notFound)

homeRouter.route('/auth/google').get(passport.authenticate('google', { scope: ['email', 'profile'] }));

homeRouter.route('/auth/google/callback').get(
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/api/user/sign-in',
        failureFlash:true
    })
);

export default homeRouter;
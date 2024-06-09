import express from 'express';
import { home, notFound } from '../controllers/home.controller.js';

const homeRouter = express.Router();

homeRouter.route('/').get(home);
homeRouter.route('/404').get(notFound)

export default homeRouter;
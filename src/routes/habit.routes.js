import express from 'express';
import { createHabit, toggleStatus,deleteHabit,editHabit } from '../controllers/habit.controller.js';
import { checkAuthenticated } from '../../middlewares/passport_local.js';

const habitRouter = express.Router();

// create new habit
habitRouter.route('/create-habit').post(checkAuthenticated, createHabit);

// change status of the habit
habitRouter.route('/toggle-status').get(checkAuthenticated,toggleStatus);

// delete the habit
habitRouter.route('/delete-habit').get(checkAuthenticated,deleteHabit);

// updates habit
habitRouter.route('/edit-habit').post(checkAuthenticated,editHabit);

export default habitRouter;
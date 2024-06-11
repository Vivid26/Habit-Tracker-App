import { deleteUserHabit, editUserHabit, findHabit, getHabit, newHabit,changeStatus } from "../models/repositories/habit.repository.js";
import { ErrorHandler } from "../../utils/errorHandler.js";

// this function creates a new habit
export const createHabit = async (req, res) => {
    const {title, desc} = req.body;
    const userId = req.user._id;
    try {
        const habit = await findHabit(title,userId);
        if (habit) {
            console.log('Habit exists');
            return res.redirect('/');
        } else {
            const habit = await newHabit(userId,title,desc);
            req.flash('success', 'Habit Created Successfully');
            return res.redirect('/');
        }
    } catch (error) {
        console.log('Error in habitController/createHabit: ', error);
        return next(new ErrorHandler(400, error));
    }
}



// this function will change the current status of habit
export const toggleStatus = async (req, res) => {
    try {
        const { id, date } = req.query;
        const habit = await getHabit(id);

        if (!habit) {
            console.log('Habit not present!');
            return res.redirect('/');
        } else {
            await changeStatus(id,date);
            return res.redirect('/');
        }
    } catch (error) {
        console.log('Error in habitController/toggleStatus', error);
        return res.render('404', {
            title: "Not Found"
        });
    }
}


// this function removes the habit
export const deleteHabit = async (req, res) => {
    try {
        const habitId = req.query.id;
        const userId = req.user._id;
        const deletedHabit = await deleteUserHabit(habitId,userId);
        req.flash('success', 'Habit Deleted Successfully');
        return res.redirect('/');
    } catch (error) {
        console.log('Error in habitController/deleteHabit', error);
        return res.render('404', {
            title: "Not Found"
        })
    }
}

// this function will edit the habit title/desc
export const editHabit = async (req, res) => {
    try {

        const {title, desc} = req.body;
        const {userId} = req.user._id;
        const habitId = req.query.id;

        const updatedResult = await editUserHabit(habitId,userId,title,desc);
        req.flash('success', 'Habit Updated Successfully');
        return res.redirect('/');

    } catch (error) {
        console.log('Error in habitController/editHabit', error);
        return res.render('404', {
            title: "Not Found"
        })
    }
}

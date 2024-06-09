import { findHabitsByUser } from "../models/repositories/habit.repository.js";
import { getOneWeekDate } from "../models/repositories/home.repository.js";


// this function takes user to home
export const home = async (req, res)=> {
    if (req.user) {
        const habits = await findHabitsByUser(req.user._id);
                        
        return res.render('home_page', {
            title: "Habit Tracker",
            habits: habits,
            weeklyDates: getOneWeekDate()
        })
    } else {
        return res.render('home_page', {
            title: "Home"
        });
    }
}

export const notFound = async (req, res) => {
    return res.render('404', {
        title: 'Not Found!'
    });
}

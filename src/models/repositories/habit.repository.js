import HabitModel from '../schemas/habit.schema.js';

export const findHabit = async (title,user) => {
    return await HabitModel.findOne({title,user}).populate();
}

export const findHabitsByUser = async (user) => {
    return await HabitModel.find({user}).populate("user",{ name: 1, email: 1,});
}

export const newHabit = async (id,title,desc) => {
    const newUserHabit = new HabitModel({
        user: id,
        title: title,
        description: desc,
        tracker: [{
            date: new Date(),
            displayDate: new Date().toDateString().split(" ").slice(1, 3).join(" "),
            status: "No Action"
        }]
    });
    const savedHabit = await newUserHabit.save();
    return savedHabit;
}

export const getHabit =async (id) => {
    return await HabitModel.findById(id);
}


export const changeStatus = async (habitId,date) => {
    const habit = await getHabit(habitId);

    // take out the tracker array of the habit.
    let tracker = habit.tracker;
    let found = false;
    // changes the status argument accodingly.
    tracker.find((item, index) => {
        if (item.displayDate == date) {
            if (item.status === 'Done') {
                item.status = 'Not Done';
            } else if (item.status === 'Not Done') {
                item.status = 'No Action';
            } else if (item.status === 'No Action') {
                item.status = 'Done';
            }
            found = true;
        }
    });

    if (!found) {
        tracker.push({
            date: new Date(date),
            displayDate: new Date(date).toDateString().split(" ").slice(1, 3).join(" "),
            status: "Done"
        });
    }
    // at last save the dates.
    habit.tracker = tracker;
    await habit.save();
    return;
}

export const editUserHabit = async(habitId,userId,newTitle,newDesc) => {
    const updatedHabit = await HabitModel.findByIdAndUpdate(
        {
            _id: habitId,
            user: userId
        }, {
        title: newTitle,
        description: newDesc
    }
    );
    return updatedHabit;
}

export const deleteUserHabit = async(habitId,userId) => {
    return await HabitModel.deleteOne({ _id: habitId ,user:userId});
}

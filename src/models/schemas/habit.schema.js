import mongoose from 'mongoose';

// create a habit schema
const habitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required : true
    },
    description: {
        type: String
    },
    tracker:[
        {
            date: {
                type: Date,
                required: true
            },
            displayDate: {
                type: String,
                required: true
            },
            status: {
                type: String,
                enum: ["Done", "Not Done", "No Action"],
                required: true
            }
        }
    ],
    streak:{
        type:Number,
        default:0,
    },
    completedDaysCount: {
        type:Number,
        default:0,
    },
    longestStreak:{
        type:Number,
        default:0,
    }
})


const HabitModel = mongoose.model('Habit', habitSchema);
export default HabitModel;
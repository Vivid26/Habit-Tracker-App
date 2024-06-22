import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },  
    googleId: {
        type: String,
        required: true,
        unique:true
    }
}, {
    timestamps: true
})

const GoogleUserModel = mongoose.model("Google_User" , googleUserSchema);
export default GoogleUserModel;
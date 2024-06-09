import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("Database is connecting......");
        const result = await mongoose.connect(process.env.MONGO_URI, {
           
        });
        console.log(`MongoDB is connected with server ${result.connection.host} `);
    } catch (error) {
        console.log("MongoDB connection failed!");
        console.log(error);
    }
}
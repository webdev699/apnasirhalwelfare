import mongoose from "mongoose";
const uri = process.env.Connection_String;

export const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {  
        return;
    }

    try {
        await mongoose.connect(uri);
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }   
};

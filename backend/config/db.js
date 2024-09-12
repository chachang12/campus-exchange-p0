import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // Connects to the MongoDB database
        console.log(`MongoDB Connected: ${conn.connection.host}`); // Logs the host of the connected database
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
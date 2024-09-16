import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDB = async ():Promise<void> =>{
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("mongo db connected successfully")
    } catch (error) {
        const typeError = error as Error;
        console.error(`Error: ${typeError.message}`);
        process.exit(1);
    }
}

export default connectDB;
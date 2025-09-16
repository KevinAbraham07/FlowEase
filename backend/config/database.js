import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectToDb = async()=>{
    try{
        await mongoose.connect(process.env.DB_ADDRESS);
        console.log(`MongoDB connected successfully`);
    }
    catch(error){
        console.error(`Database connection failed!!`);
        process.exit(1);
    }
}

export default connectToDb;
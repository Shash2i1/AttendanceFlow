import mongoose from "mongoose";

const connectDb = async() =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
    } catch (error) {
        console.log("Failed to connect database");
        throw error;
    }
}

export default connectDb;
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async()=>{
    try {
        mongoose.connection.on("connected", () => {
        console.log("Database connected successfully...");
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/ECOM`);

    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
        
}

export default connectDB;
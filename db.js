import dotenv from 'dotenv';
import mongoose from "mongoose"

dotenv.config();

const mongoURL = process.env.MONGODB_URL;
console.log(process.env.MONGODB_URL);

const mongoConnection = () => {
    mongoose.connect(process.env.MONGODB_URL);
};

export default mongoConnection;
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_URI).then((res) => {
      console.log("Connected successfully");
    });
  } catch (err) {
    console.log("Error Connect To DB: ", err);
  }
};

import mongoose from "mongoose";
import { DATABASE_NAME } from "../utils/constant.js";

//make a connection with mongodb using mongodb string and database name
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}/${DATABASE_NAME}`);
    console.log("mongodb connected !!");
  } catch (error) {
    console.error("Mongodb connection failed !!", error);
    process.exit(1);
  }
};
export default connectDB;

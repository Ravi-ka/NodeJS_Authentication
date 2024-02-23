import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.log("Error while connecting to MongoDB : " + error);
  }
};

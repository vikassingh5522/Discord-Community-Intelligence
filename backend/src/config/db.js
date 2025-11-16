import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    if (!url) throw new Error("MONGO_URL not found in environment variables");
    await mongoose.connect(url, {
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;

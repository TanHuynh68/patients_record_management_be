import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb+srv://huynhphuoctan2003_db_user:WfRKVEM78sIc46pV@cluster0.mtx545h.mongodb.net/');
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
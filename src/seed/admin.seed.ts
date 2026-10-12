import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User, UserRole } from "../modules/users/user.model.js";
import { connectDatabase } from "../config/db.js";

const seedAdmin = async () => {
  try {
    await connectDatabase();
    const hashedPassword = await bcrypt.hash("123456", 12);
    await User.create({
      fullName: "System Administrator",
      email: "huynhphuoctan2003@gmail.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
    });
    console.log(`Seed create admin successfully`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seed create admin failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();

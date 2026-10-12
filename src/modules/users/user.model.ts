
import mongoose, { Document, Schema, type InferSchemaType } from "mongoose";
export enum UserRole {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BANNED = "BANNED",
}

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.DOCTOR,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
      required: true,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export type IUser = InferSchemaType<typeof userSchema>;

export const User = mongoose.model<IUser>(
  "User",
  userSchema
);

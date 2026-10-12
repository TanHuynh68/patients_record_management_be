import mongoose, { Document, Schema } from "mongoose";

export interface IPatient extends Document {
  patientCode: string;
  fullName: string;
  dateOfBirth: Date;
  gender: "MALE" | "FEMALE" | "OTHER";
  phone?: string;
  address?: string;

  emergencyContact?: {
    fullName: string;
    phone: string;
    relationship?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema<IPatient>(
  {
    patientCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    emergencyContact: {
      fullName: {
        type: String,
        trim: true,
      },

      phone: {
        type: String,
        trim: true,
      },

      relationship: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = mongoose.model<IPatient>(
  "Patient",
  patientSchema
);
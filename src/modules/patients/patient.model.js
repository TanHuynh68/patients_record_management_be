import mongoose, { Document, Schema } from "mongoose";
const patientSchema = new Schema({
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
}, {
    timestamps: true,
});
export const Patient = mongoose.model("Patient", patientSchema);
//# sourceMappingURL=patient.model.js.map
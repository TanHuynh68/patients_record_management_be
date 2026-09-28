import mongoose, { Document } from "mongoose";
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
export declare const Patient: mongoose.Model<IPatient, {}, {}, {}, Document<unknown, {}, IPatient, {}, {}> & IPatient & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=patient.model.d.ts.map
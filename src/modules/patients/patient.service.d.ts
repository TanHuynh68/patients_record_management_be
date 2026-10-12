interface CreatePatientData {
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
}
export declare const createPatient: (data: CreatePatientData) => Promise<import("mongoose").Document<unknown, {}, import("../models/patient.model.js").IPatient, {}, {}> & import("../models/patient.model.js").IPatient & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const getPatients: (keyword?: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/patient.model.js").IPatient, {}, {}> & import("../models/patient.model.js").IPatient & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare const getPatientById: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/patient.model.js").IPatient, {}, {}> & import("../models/patient.model.js").IPatient & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}) | null>;
export declare const updatePatient: (id: string, data: Partial<CreatePatientData>) => Promise<(import("mongoose").Document<unknown, {}, import("../models/patient.model.js").IPatient, {}, {}> & import("../models/patient.model.js").IPatient & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}) | null>;
export declare const deletePatient: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/patient.model.js").IPatient, {}, {}> & import("../models/patient.model.js").IPatient & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}) | null>;
export {};
//# sourceMappingURL=patient.service.d.ts.map
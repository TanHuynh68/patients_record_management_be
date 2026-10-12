import { Patient } from "../models/patient.model.js";
const generatePatientCode = async () => {
    const count = await Patient.countDocuments();
    const number = String(count + 1).padStart(6, "0");
    return `BN${number}`;
};
export const createPatient = async (data) => {
    const patientCode = await generatePatientCode();
    return Patient.create({
        ...data,
        patientCode,
    });
};
export const getPatients = async (keyword) => {
    const filter = keyword
        ? {
            $or: [
                {
                    patientCode: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    fullName: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    phone: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
            ],
        }
        : {};
    return Patient.find(filter).sort({
        createdAt: -1,
    });
};
export const getPatientById = async (id) => {
    return Patient.findById(id);
};
export const updatePatient = async (id, data) => {
    return Patient.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};
export const deletePatient = async (id) => {
    return Patient.findByIdAndDelete(id);
};
//# sourceMappingURL=patient.service.js.map
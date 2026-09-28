import { Patient } from "../models/patient.model.js";

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

const generatePatientCode = async (): Promise<string> => {
  const count = await Patient.countDocuments();

  const number = String(count + 1).padStart(6, "0");

  return `BN${number}`;
};

export const createPatient = async (
  data: CreatePatientData
) => {
  const patientCode = await generatePatientCode();

  return Patient.create({
    ...data,
    patientCode,
  });
};

export const getPatients = async (keyword?: string) => {
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

export const getPatientById = async (id: string) => {
  return Patient.findById(id);
};

export const updatePatient = async (
  id: string,
  data: Partial<CreatePatientData>
) => {
  return Patient.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deletePatient = async (id: string) => {
  return Patient.findByIdAndDelete(id);
};
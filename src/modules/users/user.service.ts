
import bcrypt from "bcryptjs";
import { User, UserRole, UserStatus, type PatientPermissions } from "./user.model.js";


interface CreateDoctorInput {
  fullName: string;
  email: string;
  password: string;
}

interface UpdateDoctorInput {
  fullName?: string;
  email?: string;
  password?: string;
  status?: UserStatus;
  permissions: any
}

export async function createDoctor(input: CreateDoctorInput) {
  const email = input.email.trim().toLowerCase();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);

  const doctor = await User.create({
    fullName: input.fullName.trim(),
    email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
    // Không truyền permissions: dùng quyền mặc định trong schema.
  });

  return doctor;
}

export async function getDoctors() {
  return User.find({ role: UserRole.DOCTOR })
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();
}

export async function getDoctorById(id: string) {
  return User.findOne({
    _id: id,
    role: UserRole.DOCTOR,
  })
    .select("-password")
    .lean();
}

export async function updateDoctor(
  id: string,
  input: UpdateDoctorInput,
) {
  const doctor = await User.findOne({
    _id: id,
    role: UserRole.DOCTOR,
  }).select("+password");

  if (!doctor) {
    return null;
  }

  if (input.fullName !== undefined) {
    doctor.fullName = input.fullName.trim();
  }

  if (input.email !== undefined) {
    const email = input.email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email,
      _id: { $ne: doctor._id },
    });

    if (existingUser) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    doctor.email = email;
  }

  if (input.password !== undefined) {
    doctor.password = await bcrypt.hash(input.password, 12);
  }

  if (input.status !== undefined) {
    doctor.status = input.status;
  }

  doctor.permissions = input.permissions;
  await doctor.save();
  return doctor
}

export async function deleteDoctor(id: string) {
  return User.findOneAndDelete({
    _id: id,
    role: UserRole.DOCTOR,
  });
}

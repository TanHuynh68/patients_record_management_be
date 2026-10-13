import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User, UserRole, UserStatus } from "../modules/users/user.model.js";

const doctors = [
  {
    fullName: "Nguyễn Văn An",
    email: "an.nguyen@hospital.test",
    password: "DoctorAn123456!",
  },
  {
    fullName: "Trần Thị Bình",
    email: "binh.tran@hospital.test",
    password: "DoctorBinh123456!",
  },
  {
    fullName: "Lê Hoàng Minh",
    email: "minh.le@hospital.test",
    password: "DoctorMinh123456!",
  },
  {
    fullName: "Phạm Thị Lan",
    email: "lan.pham@hospital.test",
    password: "DoctorLan123456!",
  },
  {
    fullName: "Hoàng Quốc Bảo",
    email: "bao.hoang@hospital.test",
    password: "DoctorBao123456!",
  },
  {
    fullName: "Võ Thị Hương",
    email: "huong.vo@hospital.test",
    password: "DoctorHuong123456!",
  },
  {
    fullName: "Đặng Minh Tuấn",
    email: "tuan.dang@hospital.test",
    password: "DoctorTuan123456!",
  },
  {
    fullName: "Bùi Ngọc Mai",
    email: "mai.bui@hospital.test",
    password: "DoctorMai123456!",
  },
  {
    fullName: "Đỗ Thành Nam",
    email: "nam.do@hospital.test",
    password: "DoctorNam123456!",
  },
  {
    fullName: "Nguyễn Thị Thảo",
    email: "thao.nguyen@hospital.test",
    password: "DoctorThao123456!",
  },
];

async function seedDoctors(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Thiếu biến môi trường MONGODB_URI trong file .env");
  }

  await mongoose.connect(mongoUri);
  console.log("Đã kết nối MongoDB.");

  let createdCount = 0;
  let skippedCount = 0;

  for (const doctor of doctors) {
    const email = doctor.email.trim().toLowerCase();

    // Không tạo trùng tài khoản nếu seed được chạy lại.
    const existingUser = await User.findOne({ email }).select("+password");

    if (existingUser) {
      console.log(`Bỏ qua tài khoản đã tồn tại: ${email}`);
      skippedCount++;
      continue;
    }

    const hashedPassword = await bcrypt.hash(doctor.password, 12);

    await User.create({
      fullName: doctor.fullName,
      email,
      password: hashedPassword,
      role: UserRole.DOCTOR,
      status: UserStatus.ACTIVE,
      permissions: {
        patients: {
          create: false,
          read: true,
          update: false,
          delete: false,
        },
      },
    });

    console.log(`Đã tạo bác sĩ: ${doctor.fullName} (${email})`);
    createdCount++;
  }

  console.log("\n========== KẾT QUẢ SEED ==========");
  console.log(`Số tài khoản tạo mới: ${createdCount}`);
  console.log(`Số tài khoản bỏ qua: ${skippedCount}`);
  console.log("==================================");
}

seedDoctors()
  .catch((error: unknown) => {
    console.error("Seed bác sĩ thất bại:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });

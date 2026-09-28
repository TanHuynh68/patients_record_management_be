import "dotenv/config";
import mongoose from "mongoose";

import { connectDatabase } from "../config/db.js";
import { Patient } from "../models/patient.model.js";

const patients = [
  {
    patientCode: "BN000001",
    fullName: "Nguyễn Văn An",
    dateOfBirth: new Date("1985-03-12"),
    gender: "MALE",
    phone: "0901000001",
    address: "Rạch Giá, An Giang",
    emergencyContact: {
      fullName: "Trần Thị Lan",
      phone: "0901000101",
      relationship: "Vợ",
    },
  },
  {
    patientCode: "BN000002",
    fullName: "Trần Thị Mai",
    dateOfBirth: new Date("1990-07-25"),
    gender: "FEMALE",
    phone: "0901000002",
    address: "Châu Thành, An Giang",
    emergencyContact: {
      fullName: "Nguyễn Văn Hùng",
      phone: "0901000102",
      relationship: "Chồng",
    },
  },
  {
    patientCode: "BN000003",
    fullName: "Lê Văn Bình",
    dateOfBirth: new Date("1978-11-08"),
    gender: "MALE",
    phone: "0901000003",
    address: "Long Xuyên, An Giang",
    emergencyContact: {
      fullName: "Lê Thị Hoa",
      phone: "0901000103",
      relationship: "Vợ",
    },
  },
  {
    patientCode: "BN000004",
    fullName: "Phạm Thị Hương",
    dateOfBirth: new Date("1988-02-19"),
    gender: "FEMALE",
    phone: "0901000004",
    address: "Tân Hiệp, An Giang",
    emergencyContact: {
      fullName: "Phạm Văn Nam",
      phone: "0901000104",
      relationship: "Chồng",
    },
  },
  {
    patientCode: "BN000005",
    fullName: "Võ Minh Đức",
    dateOfBirth: new Date("2001-09-14"),
    gender: "MALE",
    phone: "0901000005",
    address: "Vĩnh Long, Việt Nam",
    emergencyContact: {
      fullName: "Võ Thị Ngọc",
      phone: "0901000105",
      relationship: "Mẹ",
    },
  },
  {
    patientCode: "BN000006",
    fullName: "Nguyễn Thị Ngọc",
    dateOfBirth: new Date("1995-04-30"),
    gender: "FEMALE",
    phone: "0901000006",
    address: "Cần Thơ, Việt Nam",
    emergencyContact: {
      fullName: "Nguyễn Văn Thành",
      phone: "0901000106",
      relationship: "Cha",
    },
  },
  {
    patientCode: "BN000007",
    fullName: "Đặng Quốc Huy",
    dateOfBirth: new Date("1982-06-17"),
    gender: "MALE",
    phone: "0901000007",
    address: "Sóc Trăng, Việt Nam",
    emergencyContact: {
      fullName: "Trần Thị Hạnh",
      phone: "0901000107",
      relationship: "Vợ",
    },
  },
  {
    patientCode: "BN000008",
    fullName: "Bùi Thị Thanh",
    dateOfBirth: new Date("1975-12-03"),
    gender: "FEMALE",
    phone: "0901000008",
    address: "Bạc Liêu, Việt Nam",
    emergencyContact: {
      fullName: "Bùi Văn Minh",
      phone: "0901000108",
      relationship: "Chồng",
    },
  },
  {
    patientCode: "BN000009",
    fullName: "Phan Hoàng Long",
    dateOfBirth: new Date("1992-08-21"),
    gender: "MALE",
    phone: "0901000009",
    address: "Cà Mau, Việt Nam",
    emergencyContact: {
      fullName: "Phan Thị Hồng",
      phone: "0901000109",
      relationship: "Mẹ",
    },
  },
  {
    patientCode: "BN000010",
    fullName: "Lý Thị Hoa",
    dateOfBirth: new Date("1987-01-26"),
    gender: "FEMALE",
    phone: "0901000010",
    address: "Kiên Lương, An Giang",
    emergencyContact: {
      fullName: "Lý Văn Sơn",
      phone: "0901000010",
      relationship: "Chồng",
    },
  },
  {
    patientCode: "BN000011",
    fullName: "Trương Minh Khang",
    dateOfBirth: new Date("2003-05-11"),
    gender: "MALE",
    phone: "0901000011",
    address: "Hà Tiên, An Giang",
  },
  {
    patientCode: "BN000012",
    fullName: "Huỳnh Thị Kim",
    dateOfBirth: new Date("1993-10-05"),
    gender: "FEMALE",
    phone: "0901000012",
    address: "Phú Quốc, An Giang",
  },
  {
    patientCode: "BN000013",
    fullName: "Nguyễn Hoàng Nam",
    dateOfBirth: new Date("1980-03-22"),
    gender: "MALE",
    phone: "0901000013",
    address: "Châu Đốc, An Giang",
  },
  {
    patientCode: "BN000014",
    fullName: "Trần Ngọc Anh",
    dateOfBirth: new Date("1997-07-18"),
    gender: "FEMALE",
    phone: "0901000014",
    address: "Thoại Sơn, An Giang",
  },
  {
    patientCode: "BN000015",
    fullName: "Đỗ Văn Thành",
    dateOfBirth: new Date("1972-09-29"),
    gender: "MALE",
    phone: "0901000015",
    address: "Tri Tôn, An Giang",
  },
  {
    patientCode: "BN000016",
    fullName: "Nguyễn Thị Thu",
    dateOfBirth: new Date("1989-11-16"),
    gender: "FEMALE",
    phone: "0901000016",
    address: "Tịnh Biên, An Giang",
  },
  {
    patientCode: "BN000017",
    fullName: "Phạm Minh Quân",
    dateOfBirth: new Date("1999-02-07"),
    gender: "MALE",
    phone: "0901000017",
    address: "Vị Thanh, Hậu Giang",
  },
  {
    patientCode: "BN000018",
    fullName: "Lê Thị Phương",
    dateOfBirth: new Date("1991-06-24"),
    gender: "FEMALE",
    phone: "0901000018",
    address: "Ninh Kiều, Cần Thơ",
  },
  {
    patientCode: "BN000019",
    fullName: "Võ Văn Khải",
    dateOfBirth: new Date("1984-04-13"),
    gender: "MALE",
    phone: "0901000019",
    address: "Bình Minh, Vĩnh Long",
  },
  {
    patientCode: "BN000020",
    fullName: "Nguyễn Minh Châu",
    dateOfBirth: new Date("2000-12-28"),
    gender: "FEMALE",
    phone: "0901000020",
    address: "Sa Đéc, Đồng Tháp",
  },
];

const seedPatients = async () => {
  try {
    await connectDatabase();

    await Patient.deleteMany({});

    await Patient.insertMany(patients);

    console.log("✅ Seed 20 patients successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seed patients failed:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

seedPatients();
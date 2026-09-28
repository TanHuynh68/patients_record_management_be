import "dotenv/config";
import mongoose from "mongoose";

import { connectDatabase } from "../config/db.js";
import { Patient } from "../models/patient.model.js";

const patients = [
  {
    "patientCode": "BN000036",
    "fullName": "Nguyễn Hoàng Phúc",
    "dateOfBirth": "1996-04-12T00:00:00.000Z",
    "gender": "MALE",
    "phone": "0918414011",
    "address": "Rạch Giá, Kiên Giang",
    "emergencyContact": {
      "fullName": "Nguyễn Thị Hoa",
      "phone": "0918414111",
      "relationship": "2"
    },
    "createdAt": "2026-05-05T08:30:00.000Z",
    "updatedAt": "2026-05-05T08:30:00.000Z"
  },
  {
    "patientCode": "BN000037",
    "fullName": "Trần Minh Khang",
    "dateOfBirth": "2002-08-19T00:00:00.000Z",
    "gender": "MALE",
    "phone": "0918414012",
    "address": "Rạch Giá, Kiên Giang",
    "emergencyContact": {
      "fullName": "Trần Thị Lan",
      "phone": "0918414112",
      "relationship": "2"
    },
    "createdAt": "2026-05-17T10:15:00.000Z",
    "updatedAt": "2026-05-17T10:15:00.000Z"
  },
  {
    "patientCode": "BN000038",
    "fullName": "Lê Thị Ngọc",
    "dateOfBirth": "1994-03-25T00:00:00.000Z",
    "gender": "FEMALE",
    "phone": "0918414013",
    "address": "Châu Thành, Kiên Giang",
    "emergencyContact": {
      "fullName": "Lê Văn Hùng",
      "phone": "0918414113",
      "relationship": "1"
    },
    "createdAt": "2026-05-28T14:45:00.000Z",
    "updatedAt": "2026-05-28T14:45:00.000Z"
  },

  {
    "patientCode": "BN000039",
    "fullName": "Phạm Quốc Huy",
    "dateOfBirth": "1990-06-10T00:00:00.000Z",
    "gender": "MALE",
    "phone": "0918414014",
    "address": "Rạch Giá, Kiên Giang",
    "emergencyContact": {
      "fullName": "Phạm Thị Mai",
      "phone": "0918414114",
      "relationship": "2"
    },
    "createdAt": "2026-06-03T09:00:00.000Z",
    "updatedAt": "2026-06-03T09:00:00.000Z"
  },
  {
    "patientCode": "BN000040",
    "fullName": "Huỳnh Minh Anh",
    "dateOfBirth": "2004-11-02T00:00:00.000Z",
    "gender": "FEMALE",
    "phone": "0918414015",
    "address": "Rạch Giá, Kiên Giang",
    "emergencyContact": {
      "fullName": "Huỳnh Văn Nam",
      "phone": "0918414115",
      "relationship": "1"
    },
    "createdAt": "2026-06-09T11:20:00.000Z",
    "updatedAt": "2026-06-09T11:20:00.000Z"
  },
  {
    "patientCode": "BN000041",
    "fullName": "Võ Thanh Tâm",
    "dateOfBirth": "1987-09-15T00:00:00.000Z",
    "gender": "MALE",
    "phone": "0918414016",
    "address": "Tân Hiệp, Kiên Giang",
    "emergencyContact": {
      "fullName": "Võ Thị Hạnh",
      "phone": "0918414116",
      "relationship": "2"
    },
    "createdAt": "2026-06-16T13:40:00.000Z",
    "updatedAt": "2026-06-16T13:40:00.000Z"
  },
  {
    "patientCode": "BN000042",
    "fullName": "Đặng Thị Kim",
    "dateOfBirth": "1998-12-21T00:00:00.000Z",
    "gender": "FEMALE",
    "phone": "0918414017",
    "address": "Giồng Riềng, Kiên Giang",
    "emergencyContact": {
      "fullName": "Đặng Văn Phúc",
      "phone": "0918414117",
      "relationship": "1"
    },
    "createdAt": "2026-06-22T15:10:00.000Z",
    "updatedAt": "2026-06-22T15:10:00.000Z"
  },
  {
    "patientCode": "BN000043",
    "fullName": "Bùi Đức Thành",
    "dateOfBirth": "1992-05-06T00:00:00.000Z",
    "gender": "MALE",
    "phone": "0918414018",
    "address": "Hòn Đất, Kiên Giang",
    "emergencyContact": {
      "fullName": "Bùi Thị Trang",
      "phone": "0918414118",
      "relationship": "2"
    },
    "createdAt": "2026-06-28T16:30:00.000Z",
    "updatedAt": "2026-06-28T16:30:00.000Z"
  },

  {
    "patientCode": "BN000044",
    "fullName": "Ngô Minh Quân",
    "dateOfBirth": "1995-01-18T00:00:00.000Z",
    "gender": "MALE",
    "phone": "0918414019",
    "address": "Rạch Giá, Kiên Giang",
    "emergencyContact": {
      "fullName": "Ngô Thị Yến",
      "phone": "0918414119",
      "relationship": "2"
    },
    "createdAt": "2026-07-04T08:45:00.000Z",
    "updatedAt": "2026-07-04T08:45:00.000Z"
  },
  {
    "patientCode": "BN000045",
    "fullName": "Đỗ Thị Thanh",
    "dateOfBirth": "2000-10-11T00:00:00.000Z",
    "gender": "FEMALE",
    "phone": "0918414020",
    "address": "Rạch Giá, Kiên Giang",
    "emergencyContact": {
      "fullName": "Đỗ Văn Bình",
      "phone": "0918414120",
      "relationship": "1"
    },
    "createdAt": "2026-07-10T10:30:00.000Z",
    "updatedAt": "2026-07-10T10:30:00.000Z"
  },
  {
    "patientCode": "BN000046",
    "fullName": "Lâm Quốc Việt",
    "dateOfBirth": "1989-07-23T00:00:00.000Z",
    "gender": "MALE",
    "phone": "0918414021",
    "address": "Châu Thành, Kiên Giang",
    "emergencyContact": {
      "fullName": "Lâm Thị Hương",
      "phone": "0918414121",
      "relationship": "2"
    },
    "createdAt": "2026-07-16T13:15:00.000Z",
    "updatedAt": "2026-07-16T13:15:00.000Z"
  },
  {
    "patientCode": "BN000047",
    "fullName": "Mai Thanh Long",
    "dateOfBirth": "1997-04-29T00:00:00.000Z",
    "gender": "MALE",
    "phone": "0918414022",
    "address": "Rạch Giá, Kiên Giang",
    "emergencyContact": {
      "fullName": "Mai Thị Hồng",
      "phone": "0918414122",
      "relationship": "2"
    },
    "createdAt": "2026-07-23T09:50:00.000Z",
    "updatedAt": "2026-07-23T09:50:00.000Z"
  },
  {
    "patientCode": "BN000048",
    "fullName": "Phan Thị Hạnh",
    "dateOfBirth": "2003-02-08T00:00:00.000Z",
    "gender": "FEMALE",
    "phone": "0918414023",
    "address": "Tân Hiệp, Kiên Giang",
    "emergencyContact": {
      "fullName": "Phan Văn Tùng",
      "phone": "0918414123",
      "relationship": "1"
    },
    "createdAt": "2026-07-29T15:20:00.000Z",
    "updatedAt": "2026-07-29T15:20:00.000Z"
  }
]

const seedPatients = async () => {
  try {
    await connectDatabase();

    await Patient.insertMany(patients);

    console.log(`Seed ${patients.length} patients successfully`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seed patients failed:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

seedPatients();
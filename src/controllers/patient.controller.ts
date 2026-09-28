import type { Request, Response } from "express";
import * as patientService from "../services/patient.service.js";

export const createPatient = async (
  req: Request,
  res: Response
) => {
  try {
    const patient = await patientService.createPatient({
      ...req.body,
      dateOfBirth: new Date(req.body.dateOfBirth),
    });

    res.status(201).json({
      success: true,
      message: "Tạo bệnh nhân thành công",
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể tạo bệnh nhân",
    });
  }
};

export const getPatients = async (
  req: Request,
  res: Response
) => {
  try {
    const keyword =
      typeof req.query.keyword === "string"
        ? req.query.keyword
        : undefined;

    const patients =
      await patientService.getPatients(keyword);
    console.log("p: ", patients)
    res.json({
      success: true,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách bệnh nhân",
    });
  }
};

export const getPatientById = async (
  req: Request,
  res: Response
) => {
  try {
    const patient =
      await patientService.getPatientById(req.params.id+'');

    if (!patient) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy bệnh nhân",
      });
      return;
    }

    res.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể lấy thông tin bệnh nhân",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const updatePatient = async (
  req: Request,
  res: Response
) => {
  try {
    const patient =
      await patientService.updatePatient(
        req.params.id+"",
        req.body
      );

    if (!patient) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy bệnh nhân",
      });
      return;
    }

    res.json({
      success: true,
      message: "Cập nhật bệnh nhân thành công",
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể cập nhật bệnh nhân",
    });
  }
};

export const deletePatient = async (
  req: Request,
  res: Response
) => {
  try {
    const patient =
      await patientService.deletePatient(
        req.params.id+""
      );

    if (!patient) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy bệnh nhân",
      });
      return;
    }

    res.json({
      success: true,
      message: "Xóa bệnh nhân thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể xóa bệnh nhân",
    });
  }
};
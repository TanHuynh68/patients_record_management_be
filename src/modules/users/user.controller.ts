
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../users/user.service.js";

function handleError(
  error: unknown,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof Error) {
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({
        success: false,
        message: "Email đã được sử dụng",
      });
    }
  }

  if (
    error instanceof mongoose.Error.ValidationError ||
    error instanceof mongoose.Error.CastError
  ) {
    return res.status(400).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
    });
  }

  if (
    error instanceof Error &&
    "code" in error &&
    error.code === 11000
  ) {
    return res.status(409).json({
      success: false,
      message: "Email đã được sử dụng",
    });
  }

  return next(error);
}

function validId(id: string | string[] | undefined): id is string {
  return typeof id === "string" && mongoose.isValidObjectId(id);
}

// POST /doctors
export async function createDoctorController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { fullName, email, password } = req.body;

    const doctor = await createDoctor({ fullName, email, password });

    return res.status(201).json({
      success: true,
      message: "Tạo tài khoản Doctor thành công",
      data: doctor,
    });
  } catch (error: unknown) {
    return handleError(error, res, next);
  }
}

// GET /doctors
export async function getDoctorsController(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const doctors = await getDoctors();

    return res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error: unknown) {
    return next(error);
  }
}

// GET /doctors/:id
export async function getDoctorByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (!validId(id)) {
      return res.status(400).json({
        success: false,
        message: "ID Doctor không hợp lệ",
      });
    }

    const doctor = await getDoctorById(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy Doctor",
      });
    }

    return res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error: unknown) {
    return handleError(error, res, next);
  }
}

// PATCH /doctors/:id
export async function updateDoctorController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    // 1. Kiểm tra ID bác sĩ
    if (!validId(id)) {
      return res.status(400).json({
        success: false,
        message: "ID Doctor không hợp lệ",
      });
    }

    // 2. Kiểm tra quyền của người đăng nhập
    // const currentUser = req.user;

    // if (!currentUser) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Vui lòng đăng nhập",
    //   });
    // }

    // const isAdmin = currentUser.role === "ADMIN";

    // Chỉ Admin được cập nhật thông tin Doctor
    // if (!isAdmin) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Bạn không có quyền cập nhật Doctor",
    //   });
    // }

    const body = req.body ?? {};

    // 4. Kiểm tra họ tên
    if (
      body.fullName !== undefined &&
      (typeof body.fullName !== "string" ||
        !body.fullName.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Họ tên không hợp lệ",
      });
    }

    // 5. Kiểm tra email
    if (
      body.email !== undefined &&
      (typeof body.email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim()))
    ) {
      return res.status(400).json({
        success: false,
        message: "Email không hợp lệ",
      });
    }

    // 6. Kiểm tra mật khẩu
    if (
      body.password !== undefined &&
      (typeof body.password !== "string" ||
        body.password.length < 12)
    ) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu phải có ít nhất 12 ký tự",
      });
    }

    // 7. Kiểm tra trạng thái
    if (
      body.status !== undefined &&
      !["ACTIVE", "BANNED"].includes(body.status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái không hợp lệ",
      });
    }

    // 8. Kiểm tra quyền CRUD bệnh nhân
    if (body.permissions !== undefined) {
      const permissions = body.permissions;

      if (
        permissions === null ||
        typeof permissions !== "object" ||
        Array.isArray(permissions)
      ) {
        return res.status(400).json({
          success: false,
          message: "Danh sách quyền không hợp lệ",
        });
      }

      const allowedPermissions = [
        "read",
        "create",
        "update",
        "delete",
      ];

      const unknownPermissions = Object.keys(permissions.patients).filter(
        (key) => !allowedPermissions.includes(key),
      );

      if (unknownPermissions.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Có quyền không hợp lệ",
          fields: unknownPermissions,
        });
      }

      for (const key of allowedPermissions) {
        if (
          permissions[key] !== undefined &&
          typeof permissions[key] !== "boolean"
        ) {
          return res.status(400).json({
            success: false,
            message: `Quyền ${key} phải là true hoặc false`,
          });
        }
      }
    }

    // 9. Không cho phép request rỗng
    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp dữ liệu cần cập nhật",
      });
    }

    // 10. Cập nhật Doctor
    const doctor = await updateDoctor(id, body);
    console.log('body: ', body)
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bác sĩ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật bác sĩ thành công",
      data: doctor,
    });
  } catch (error: unknown) {
    return handleError(error, res, next);
  }
}

// DELETE /doctors/:id
export async function deleteDoctorController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;

    if (!validId(id)) {
      return res.status(400).json({
        success: false,
        message: "ID Doctor không hợp lệ",
      });
    }

    const doctor = await deleteDoctor(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy Doctor",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Xóa tài khoản Doctor thành công",
    });
  } catch (error: unknown) {
    return next(error);
  }
}

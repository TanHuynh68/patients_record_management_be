import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { User, UserStatus } from "../users/user.model.js";
import type { Request, Response } from "express";

const JWT_SECRET: string = process.env.JWT_SECRET || "";

const JWT_EXPIRES_IN: NonNullable<SignOptions["expiresIn"]> = (process.env
  .JWT_EXPIRES_IN || "1h") as NonNullable<SignOptions["expiresIn"]>;

if (!JWT_SECRET) {
  throw new Error("Thiếu biến môi trường JWT_SECRET");
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    console.log("password: ", password);
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Không tìm thấy người dùng",
      });
    }
    console.log("password: ", password);
    console.log("user.password: ", user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPasswordValid: ", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Sai mật khẩu",
      });
    }

    if (user.status !== UserStatus.ACTIVE) {
      return res.status(400).json({
        message: "Tài khoản đã bị vô hiệu hoá",
      });
    }

    const token = jwt.sign(
      {
        role: user.role,
      },
      JWT_SECRET,
      {
        subject: user._id.toString(),
        expiresIn: JWT_EXPIRES_IN,
      } satisfies SignOptions,
    );

    user.lastLoginAt = new Date();
    await user.save();
    console.log("user: ", {
      accessToken: token,
      tokenType: "Bearer",
      expiresIn: JWT_EXPIRES_IN,
      message: "Đăng nhập thành công",
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        permissions: user.permissions?.patients
      },
    })
    return res.status(200).json({
      accessToken: token,
      tokenType: "Bearer",
      expiresIn: JWT_EXPIRES_IN,
      message: "Đăng nhập thành công",
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        permissions: user.permissions?.patients
      },
    });
  } catch (error) {
    console.log("error:", error);
    return error;
  }
}

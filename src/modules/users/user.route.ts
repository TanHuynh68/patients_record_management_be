import { Router } from "express";

import { createDoctorController, deleteDoctorController, getDoctorByIdController, getDoctorsController, updateDoctorController } from "../users/user.controller.js"

const userRoute = Router();
//patients
userRoute.get("/", getDoctorsController);
userRoute.post("/", createDoctorController);

userRoute.get("/:id", getDoctorByIdController);

userRoute.patch("/:id", updateDoctorController);

userRoute.delete("/:id", deleteDoctorController);

export default userRoute;
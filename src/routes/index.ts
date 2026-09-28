import { Router } from "express";

import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";

const router = Router();

router.post("/", createPatient);

router.get("/", getPatients);

router.get("/:id", getPatientById);

router.patch("/:id", updatePatient);

router.delete("/:id", deletePatient);

export default router;
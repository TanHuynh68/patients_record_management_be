import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import patientRouter from "./routes/patients.route.js";
import { connectDatabase } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRoute from "./modules/users/user.route.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/admin/manage-doctors", userRoute);


await connectDatabase();
app.listen(9000, () => {
  console.log(`Server running at http://localhost:${9000}`);
});

export default app;
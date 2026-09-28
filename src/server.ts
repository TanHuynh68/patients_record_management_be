import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import patientRouter from "./routes/index.js";
import { connectDatabase } from "./config/db.js";

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

app.use("/api/v1/patients", patientRouter);

await connectDatabase();
app.listen(9000, () => {
  console.log(`Server running at http://localhost:${9000}`);
});

export default app;
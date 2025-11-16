import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/", (req, res) => {
  res.json({ message: "Discord Analytics API is running" });
});

app.use("/api/auth", userRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use((req, res) => res.status(404).json({ message: "Endpoint not found" }));

export default app;

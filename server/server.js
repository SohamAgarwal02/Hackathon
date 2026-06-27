import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import goalRoutes from "./routes/goalRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Allow ALL origins — fine for a hackathon
app.use(cors());

app.use(express.json());
app.use("/api/goals", goalRoutes);

app.get("/", (req, res) => {
  res.send("Goal OS API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
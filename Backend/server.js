import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import connectDB from "./config/db.js";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();
const app = express();


const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log(" 'uploads/' folder created");
}

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static images from uploads folder
app.use('/uploads', express.static(uploadsDir));

// Connect to DB
connectDB();

// Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/admin/recipes", recipeRoutes); // Admin logic reuse

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

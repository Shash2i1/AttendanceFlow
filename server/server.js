import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./src/db/connectDB.js";
import authRoute from "./src/routes/auth.route.js";
import studentsRoute from "./src/routes/students.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/main", studentsRoute);

// Production static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  
  // Serve React app for all non-API routes
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}
// Start server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  connectDb();
});

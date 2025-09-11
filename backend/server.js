// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Initialize app
const app = express();

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

// ✅ CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",                  // Local frontend (Vite)
      process.env.CLIENT_URL || ""              // Deployed frontend (Render/Netlify/Vercel etc.)
    ].filter(Boolean),                          // Remove empty strings
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json()); // Parse JSON

// ✅ Serve uploaded images/files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// ✅ Root route (for testing)
app.get("/", (req, res) => {
  res.send("Zentask backend is running 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

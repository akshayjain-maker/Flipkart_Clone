require("dotenv").config();
const express = require("express");
const { connectDB, sequelize } = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// Connect database
connectDB();

// SYNC MODELS (Important)
sequelize.sync({ alter: true })  
  .then(() => console.log("📌 All models synced"))
  .catch((err) => console.log("Sync error:", err));

// Routes
app.use("/api/users", userRoutes);

// Start server
app.listen(5000, () => console.log("Server running on 5000"));

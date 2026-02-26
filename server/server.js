const express = require("express");
const cors = require("cors");
const { connectDB, initDirs } = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const config = require("./config");

// routes
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const skillRoutes = require("./routes/skills");
const cvRoutes = require("./routes/cv");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());

// Connect to DB on every cold start (cached inside connectDB)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", timestamp: new Date() }),
);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/cv", cvRoutes);
app.use(errorHandler);

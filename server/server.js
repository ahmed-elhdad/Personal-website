const express = require("express");
const cors = require("cors");
const path = require("path");

const config = require("./config");
const { init } = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const skillRoutes = require("./routes/skills");
const cvRoutes = require("./routes/cv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const bcryptjs = require("bcryptjs");

// ─── Initialise storage ───────────────────────────────────────────────────────
init();

// ─── App ──────────────────────────────────────────────────────────────────────
const app = express();

// ─── Core middleware ──────────────────────────────────────────────────────────
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(config.paths.uploadsDir));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", timestamp: new Date() }),
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/cv", cvRoutes);

// Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ─── Global error handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(config.port, async () => {
  console.log(`\n🚀 Portfolio API  →  http://localhost:${config.port}`);
  console.log(`📧 Admin email   :  ${config.admin.email}`);
  console.log(
    `🔑 Default pass  :  Admin@123!  (change via ADMIN_PASSWORD_HASH)\n`,
  );
  console.log("JWT Secret:", config.jwt.secret);

  console.log(
    "📚 API docs      :  http://localhost:%d/api-docs\n",
    config.port,
  );
});

module.exports = app;

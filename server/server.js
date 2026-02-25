const express = require('express');
const cors    = require('cors');
const path    = require('path');

const config           = require('./config');
const { init }         = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

const authRoutes    = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes   = require('./routes/skills');
const cvRoutes      = require('./routes/cv');

// ─── Initialise storage ───────────────────────────────────────────────────────
init();

// ─── App ──────────────────────────────────────────────────────────────────────
const app = express();

// ─── Core middleware ──────────────────────────────────────────────────────────
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(config.paths.uploadsDir));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', timestamp: new Date() })
);

app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills',   skillRoutes);
app.use('/api/cv',       cvRoutes);

// ─── Global error handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(config.port, () => {
  console.log(`\n🚀 Portfolio API  →  http://localhost:${config.port}`);
  console.log(`📧 Admin email   :  ${config.admin.email}`);
  console.log(`🔑 Default pass  :  Admin@123!  (change via ADMIN_PASSWORD_HASH)\n`);
});

module.exports = app;

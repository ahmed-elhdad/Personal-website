const express = require('express');
const cors    = require('cors');

const config              = require('./config');
const { connect, initDirs } = require('./config/db');
const { errorHandler }    = require('./middleware/errorHandler');

const authRoutes    = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes   = require('./routes/skills');
const cvRoutes      = require('./routes/cv');

async function start() {
  // ─── Ensure upload/cv dirs exist ─────────────────────────────────────────
  initDirs();

  // ─── Connect to MongoDB (blocks until ready) ──────────────────────────────
  await connect();

  // ─── App ──────────────────────────────────────────────────────────────────
  const app = express();

  app.use(cors({ origin: config.clientUrl, credentials: true }));
  app.use(express.json());
  app.use('/uploads', express.static(config.paths.uploadsDir));

  // ─── Routes ───────────────────────────────────────────────────────────────
  app.get('/api/health', (_req, res) =>
    res.json({ status: 'ok', timestamp: new Date() })
  );

  app.use('/api/auth',     authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/skills',   skillRoutes);
  app.use('/api/cv',       cvRoutes);

  // ─── Global error handler (must be last) ──────────────────────────────────
  app.use(errorHandler);

  // ─── Listen ───────────────────────────────────────────────────────────────
  app.listen(config.port, () => {
    console.log(`\n🚀 Portfolio API  →  http://localhost:${config.port}`);
    console.log(`📧 Admin email   :  ${config.admin.email}`);
    console.log(`🔑 Default pass  :  Admin@123!  (change via ADMIN_PASSWORD_HASH)\n`);
  });
}

start().catch(err => {
  console.error('❌ Failed to start server:', err.message);
  process.exit(1);
});

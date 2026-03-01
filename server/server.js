const express = require('express');
const cors    = require('cors');

const config                = require('./config');
const { connect, initDirs } = require('./config/db');
const { errorHandler }      = require('./middleware/errorHandler');

const authRoutes    = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes   = require('./routes/skills');
const cvRoutes      = require('./routes/cv');

// ─── App ──────────────────────────────────────────────────────────────────────
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());

// ─── Connect to MongoDB on first request (cached after that) ──────────────────
let dbReady = false;
app.use(async (_req, _res, next) => {
  if (!dbReady) {
    try {
      initDirs();
      await connect();
      dbReady = true;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', timestamp: new Date() })
);

app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills',   skillRoutes);
app.use('/api/cv',       cvRoutes);

// ─── Error handler ────────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Local development only ───────────────────────────────────────────────────
if (require.main === module) {
  initDirs();
  connect().then(() => {
    app.listen(config.port, () => {
      console.log(`\n🚀 Portfolio API  →  http://localhost:${config.port}`);
    });
  });
}

// ─── Export for Vercel ────────────────────────────────────────────────────────
module.exports = app;

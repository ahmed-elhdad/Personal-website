const express = require('express');
const cors    = require('cors');

const config         = require('./config');
const { init }       = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

const authRoutes    = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes   = require('./routes/skills');
const cvRoutes      = require('./routes/cv');

// Initialise data directories and seed JSON files
init();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(config.paths.uploadsDir));

app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', timestamp: new Date() })
);

app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills',   skillRoutes);
app.use('/api/cv',       cvRoutes);

app.use(errorHandler);

// Local dev only
if (require.main === module) {
  app.listen(config.port, () => {
    console.log('\n🚀 Portfolio API  →  http://localhost:' + config.port);
  });
}

module.exports = app;

require('dotenv').config();
const path = require('path');

// Vercel filesystem is read-only except /tmp — use that for data storage
const isVercel = !!process.env.VERCEL;
const dataBase = isVercel ? '/tmp' : path.join(__dirname, '..', 'data');

const config = {
  port:      process.env.PORT       || 5000,
  clientUrl: process.env.CLIENT_URL || '*',

  jwt: {
    secret:    process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
    expiresIn: '7d',
  },

  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
    passwordHash:
      process.env.ADMIN_PASSWORD_HASH ||
      '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  },

  paths: {
    dataDir:       dataBase,
    projectsFile:  path.join(dataBase, 'projects.json'),
    skillsFile:    path.join(dataBase, 'skills.json'),
    cvDir:         path.join(dataBase, 'cv'),
    uploadsDir:    path.join(dataBase, 'uploads'),
  },

  upload: {
    maxCvSize:    15 * 1024 * 1024,
    maxImageSize:  5 * 1024 * 1024,
  },
};

module.exports = config;

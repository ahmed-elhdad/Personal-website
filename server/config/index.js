require('dotenv').config();
const path = require('path');

// On Vercel the filesystem is read-only except /tmp
const isVercel   = !!process.env.VERCEL;
const uploadBase = isVercel ? '/tmp' : path.join(__dirname, '..', 'data');

const config = {
  port:      process.env.PORT       || 5000,
  clientUrl: process.env.CLIENT_URL || '*',
  mongoUri:  process.env.MONGO_URI  || 'mongodb://127.0.0.1:27017/portfolio',

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
    dataDir:    uploadBase,
    cvDir:      path.join(uploadBase, 'cv'),
    uploadsDir: path.join(uploadBase, 'uploads'),
  },

  upload: {
    maxCvSize:    15 * 1024 * 1024,
    maxImageSize:  5 * 1024 * 1024,
  },
};

module.exports = config;

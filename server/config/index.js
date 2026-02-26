require('dotenv').config();
const path = require('path');

const config = {
  port:      process.env.PORT       || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  mongoUri:  process.env.MONGO_URI  || 'mongodb://127.0.0.1:27017/portfolio',

  jwt: {
    secret:    process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
    expiresIn: '7d',
  },

  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
    // bcrypt hash of "Admin@123!" — override via ADMIN_PASSWORD_HASH env var
    // Generate a new one: node -e "require('bcryptjs').hash('NewPass',10).then(console.log)"
    passwordHash:
      process.env.ADMIN_PASSWORD_HASH ||
      '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  },

  paths: {
    dataDir:    path.join(__dirname, '..', 'data'),
    cvDir:      path.join(__dirname, '..', 'data', 'cv'),
    uploadsDir: path.join(__dirname, '..', 'data', 'uploads'),
  },

  upload: {
    maxCvSize:    15 * 1024 * 1024,   // 15 MB
    maxImageSize:  5 * 1024 * 1024,   //  5 MB
  },
};

module.exports = config;

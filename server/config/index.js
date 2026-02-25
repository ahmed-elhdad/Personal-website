require("dotenv").config();
const path = require("path");

const config = {
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "7d",
  },

  admin: {
    email: process.env.ADMIN_EMAIL,
    // bcrypt hash of "Admin@123!" — override via ADMIN_PASSWORD_HASH env var
    // Generate a new one: node -e "require('bcryptjs').hash('NewPass',10).then(console.log)"
    passwordHash: process.env.ADMIN_PASSWORD_HASH,
  },

  paths: {
    dataDir: path.join(__dirname, "..", "data"),
    cvDir: path.join(__dirname, "..", "data", "cv"),
    uploadsDir: path.join(__dirname, "..", "data", "uploads"),
  },

  upload: {
    maxCvSize: 15 * 1024 * 1024, // 15 MB
    maxImageSize: 5 * 1024 * 1024, //  5 MB
  },
};

module.exports = config;

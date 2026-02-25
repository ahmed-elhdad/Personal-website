const multer = require('multer');
const path   = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

const { cvDir, uploadsDir } = config.paths;
const { maxCvSize, maxImageSize } = config.upload;

// ─── CV upload (PDF only, always saved as resume.pdf) ─────────────────────────
const cvUpload = multer({
  storage: multer.diskStorage({
    destination: cvDir,
    filename:    (_req, _file, cb) => cb(null, 'resume.pdf'),
  }),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
  },
  limits: { fileSize: maxCvSize },
});

// ─── Image upload (project thumbnails) ───────────────────────────────────────
const imageUpload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename:    (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${uuidv4()}${ext}`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
  limits: { fileSize: maxImageSize },
});

module.exports = { cvUpload, imageUpload };

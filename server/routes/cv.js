const express    = require('express');
const cvService  = require('../services/cvService');
const { authenticate } = require('../middleware/auth');
const { cvUpload }     = require('../middleware/upload');

const router = express.Router();

// POST /api/cv/upload  (protected)
router.post('/upload', authenticate, cvUpload.single('cv'), (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error('No file uploaded');
      err.status = 400;
      throw err;
    }
    res.json({ message: 'CV uploaded successfully' });
  } catch (err) {
    next(err);
  }
});

// GET /api/cv/download  (public)
router.get('/download', (req, res, next) => {
  try {
    const cvPath = cvService.getPath();
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.sendFile(cvPath);
  } catch (err) {
    next(err);
  }
});

// GET /api/cv/exists  (public)
router.get('/exists', (_req, res) => {
  res.json({ exists: cvService.exists() });
});

module.exports = router;

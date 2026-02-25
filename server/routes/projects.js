const express        = require('express');
const projectService = require('../services/projectService');
const { authenticate }  = require('../middleware/auth');
const { imageUpload }   = require('../middleware/upload');

const router = express.Router();

// GET /api/projects
router.get('/', (_req, res) => {
  const result = projectService.getAll();
  res.json(result);
});

// GET /api/projects/:id
router.get('/:id', (req, res, next) => {
  try {
    const project = projectService.getById(req.params.id);
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// POST /api/projects  (protected + optional thumbnail upload)
router.post('/', authenticate, imageUpload.single('thumbnail'), (req, res, next) => {
  try {
    const thumbnailFilename = req.file?.filename || null;
    const { project } = projectService.create(req.body, thumbnailFilename);
    res.status(201).json({ project, message: 'Project created' });
  } catch (err) {
    next(err);
  }
});

// PUT /api/projects/:id  (protected)
router.put('/:id', authenticate, (req, res, next) => {
  try {
    const { project } = projectService.update(req.params.id, req.body);
    res.json({ project, message: 'Project updated' });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/projects/:id  (protected)
router.delete('/:id', authenticate, (req, res, next) => {
  try {
    projectService.remove(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

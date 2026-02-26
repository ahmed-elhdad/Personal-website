const express        = require('express');
const projectService = require('../services/projectService');
const { authenticate }  = require('../middleware/auth');
const { imageUpload }   = require('../middleware/upload');

const router = express.Router();

// GET /api/projects
router.get('/', async (_req, res, next) => {
  try {
    const result = await projectService.getAll();
    res.json(result);
  } catch (err) { next(err); }
});

// GET /api/projects/:id
router.get('/:id', async (req, res, next) => {
  try {
    const project = await projectService.getById(req.params.id);
    res.json(project);
  } catch (err) { next(err); }
});

// POST /api/projects  (protected + optional thumbnail)
router.post('/', authenticate, imageUpload.single('thumbnail'), async (req, res, next) => {
  try {
    const thumbnailFilename = req.file?.filename || null;
    const { project } = await projectService.create(req.body, thumbnailFilename);
    res.status(201).json({ project, message: 'Project created' });
  } catch (err) { next(err); }
});

// PUT /api/projects/:id  (protected)
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { project } = await projectService.update(req.params.id, req.body);
    res.json({ project, message: 'Project updated' });
  } catch (err) { next(err); }
});

// DELETE /api/projects/:id  (protected)
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    await projectService.remove(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) { next(err); }
});

module.exports = router;

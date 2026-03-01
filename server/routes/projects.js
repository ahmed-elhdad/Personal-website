const express        = require('express');
const projectService = require('../services/projectService');
const { authenticate } = require('../middleware/auth');
const { imageUpload }  = require('../middleware/upload');

const router = express.Router();

router.get('/', (_req, res, next) => {
  try { res.json(projectService.getAll()); }
  catch (err) { next(err); }
});

router.get('/:id', (req, res, next) => {
  try { res.json(projectService.getById(req.params.id)); }
  catch (err) { next(err); }
});

router.post('/', authenticate, imageUpload.single('thumbnail'), (req, res, next) => {
  try {
    const { project } = projectService.create(req.body, req.file?.filename || null);
    res.status(201).json({ project, message: 'Project created' });
  } catch (err) { next(err); }
});

router.put('/:id', authenticate, (req, res, next) => {
  try {
    const { project } = projectService.update(req.params.id, req.body);
    res.json({ project, message: 'Project updated' });
  } catch (err) { next(err); }
});

router.delete('/:id', authenticate, (req, res, next) => {
  try {
    projectService.remove(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) { next(err); }
});

module.exports = router;

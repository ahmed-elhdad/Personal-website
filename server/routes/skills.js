const express      = require('express');
const skillService = require('../services/skillService');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/skills
router.get('/', (_req, res) => {
  const result = skillService.getAll();
  res.json(result);
});

// POST /api/skills/add  (protected)
router.post('/add', authenticate, (req, res, next) => {
  try {
    const { category, skill } = req.body;
    const result = skillService.addSkill(category, skill);
    res.json({ message: 'Skill added', ...result });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/skills/remove  (protected)
router.delete('/remove', authenticate, (req, res, next) => {
  try {
    const { category, skill } = req.body;
    const result = skillService.removeSkill(category, skill);
    res.json({ message: 'Skill removed', ...result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

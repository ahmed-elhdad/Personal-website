const express      = require('express');
const skillService = require('../services/skillService');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/skills
router.get('/', async (_req, res, next) => {
  try {
    const result = await skillService.getAll();
    res.json(result);
  } catch (err) { next(err); }
});

// POST /api/skills/add  (protected)
router.post('/add', authenticate, async (req, res, next) => {
  try {
    const { category, skill } = req.body;
    const result = await skillService.addSkill(category, skill);
    res.json({ message: 'Skill added', ...result });
  } catch (err) { next(err); }
});

// DELETE /api/skills/remove  (protected)
router.delete('/remove', authenticate, async (req, res, next) => {
  try {
    const { category, skill } = req.body;
    const result = await skillService.removeSkill(category, skill);
    res.json({ message: 'Skill removed', ...result });
  } catch (err) { next(err); }
});

module.exports = router;

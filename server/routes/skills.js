const express      = require('express');
const skillService = require('../services/skillService');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', (_req, res, next) => {
  try { res.json(skillService.getAll()); }
  catch (err) { next(err); }
});

router.post('/add', authenticate, (req, res, next) => {
  try {
    const { category, skill } = req.body;
    const result = skillService.addSkill(category, skill);
    res.json({ message: 'Skill added', ...result });
  } catch (err) { next(err); }
});

router.delete('/remove', authenticate, (req, res, next) => {
  try {
    const { category, skill } = req.body;
    const result = skillService.removeSkill(category, skill);
    res.json({ message: 'Skill removed', ...result });
  } catch (err) { next(err); }
});

module.exports = router;

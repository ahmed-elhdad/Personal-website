const SkillCategory = require('../models/SkillCategory');

/**
 * Return all skill categories.
 * @returns {Promise<{ skills: object[] }>}
 */
async function getAll() {
  const skills = await SkillCategory.find().lean({ virtuals: true });
  return { skills };
}

/**
 * Add a skill to an existing category, or create a new one.
 * Silently ignores duplicates.
 * @param {string} category
 * @param {string} skillName
 * @returns {Promise<{ skills: object[] }>}
 */
async function addSkill(category, skillName) {
  if (!category || !skillName) {
    const err = new Error('Category and skill name are required');
    err.status = 400;
    throw err;
  }

  await SkillCategory.findOneAndUpdate(
    { category },
    // $addToSet prevents duplicates; upsert creates the category if it doesn't exist
    { $addToSet: { skills: skillName } },
    { upsert: true, new: true }
  );

  const { skills } = await getAll();
  return { skills };
}

/**
 * Remove a skill from a category.
 * @param {string} category
 * @param {string} skillName
 * @returns {Promise<{ skills: object[] }>}
 */
async function removeSkill(category, skillName) {
  await SkillCategory.findOneAndUpdate(
    { category },
    { $pull: { skills: skillName } }
  );

  const { skills } = await getAll();
  return { skills };
}

module.exports = { getAll, addSkill, removeSkill };

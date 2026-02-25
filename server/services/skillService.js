const { v4: uuidv4 } = require('uuid');
const { readJSON, writeJSON, SKILLS_FILE } = require('../config/db');

/**
 * Return all skill categories.
 * @returns {{ skills: object[] }}
 */
function getAll() {
  const skills = readJSON(SKILLS_FILE, []);
  return { skills };
}

/**
 * Add a skill to an existing category, or create a new category.
 * Silently ignores duplicates within the same category.
 *
 * @param {string} category
 * @param {string} skillName
 * @returns {{ skills: object[] }}
 */
function addSkill(category, skillName) {
  if (!category || !skillName) {
    const err = new Error('Category and skill name are required');
    err.status = 400;
    throw err;
  }

  const skills = readJSON(SKILLS_FILE, []);
  const cat    = skills.find(s => s.category === category);

  if (cat) {
    if (!cat.skills.includes(skillName)) {
      cat.skills.push(skillName);
      writeJSON(SKILLS_FILE, skills);
    }
  } else {
    skills.push({ id: uuidv4(), category, icon: '💡', skills: [skillName] });
    writeJSON(SKILLS_FILE, skills);
  }

  return { skills: readJSON(SKILLS_FILE, []) };
}

/**
 * Remove a skill from a category.
 * Leaves the category even if it becomes empty (admin can manage it).
 *
 * @param {string} category
 * @param {string} skillName
 * @returns {{ skills: object[] }}
 */
function removeSkill(category, skillName) {
  const skills = readJSON(SKILLS_FILE, []);
  const cat    = skills.find(s => s.category === category);

  if (cat) {
    cat.skills = cat.skills.filter(s => s !== skillName);
    writeJSON(SKILLS_FILE, skills);
  }

  return { skills };
}

module.exports = { getAll, addSkill, removeSkill };

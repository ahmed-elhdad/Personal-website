const { v4: uuidv4 } = require('uuid');
const { readJSON, writeJSON } = require('../config/db');
const config = require('../config');

const file = () => config.paths.skillsFile;

function getAll() {
  const skills = readJSON(file(), []);
  return { skills };
}

function addSkill(category, skillName) {
  if (!category || !skillName) {
    const e = new Error('Category and skill name are required');
    e.status = 400;
    throw e;
  }
  const skills = readJSON(file(), []);
  const cat    = skills.find(s => s.category === category);
  if (cat) {
    if (!cat.skills.includes(skillName)) {
      cat.skills.push(skillName);
      writeJSON(file(), skills);
    }
  } else {
    skills.push({ id: uuidv4(), category, icon: '💡', skills: [skillName] });
    writeJSON(file(), skills);
  }
  return { skills: readJSON(file(), []) };
}

function removeSkill(category, skillName) {
  const skills = readJSON(file(), []);
  const cat    = skills.find(s => s.category === category);
  if (cat) {
    cat.skills = cat.skills.filter(s => s !== skillName);
    writeJSON(file(), skills);
  }
  return { skills: readJSON(file(), []) };
}

module.exports = { getAll, addSkill, removeSkill };

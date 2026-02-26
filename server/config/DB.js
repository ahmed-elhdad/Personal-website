const fs       = require('fs');
const path     = require('path');
const mongoose = require('mongoose');
const config   = require('./index');

// ─── Default seed data ────────────────────────────────────────────────────────
const DEFAULT_SKILLS = [
  { category: 'Frontend',       icon: '🎨', skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { category: 'Backend',        icon: '⚙️', skills: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL', 'JWT Auth'] },
  { category: 'DevOps & Cloud', icon: '☁️', skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux', 'Nginx'] },
  { category: 'Databases',      icon: '🗄️', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'] },
  { category: 'Tools',          icon: '🛠️', skills: ['VS Code', 'Figma', 'Postman', 'Jest', 'Agile/Scrum'] },
];

/**
 * Connect to MongoDB and seed default skills on first run.
 */
async function connect() {
  await mongoose.connect(config.mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });

  console.log(`🍃 MongoDB connected  →  ${config.mongoUri}`);

  // Seed default skill categories only if the collection is empty
  const SkillCategory = require('../models/SkillCategory');
  const count = await SkillCategory.countDocuments();
  if (count === 0) {
    await SkillCategory.insertMany(DEFAULT_SKILLS);
    console.log('🌱 Default skills seeded');
  }
}

/**
 * Ensure upload/cv directories exist (still stored on disk).
 */
function initDirs() {
  const { cvDir, uploadsDir, dataDir } = config.paths;
  [dataDir, cvDir, uploadsDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}

module.exports = { connect, initDirs };

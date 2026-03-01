const fs       = require('fs');
const mongoose = require('mongoose');
const config   = require('./index');

const DEFAULT_SKILLS = [
  { category: 'Frontend',       icon: '🎨', skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { category: 'Backend',        icon: '⚙️', skills: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL', 'JWT Auth'] },
  { category: 'DevOps & Cloud', icon: '☁️', skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux', 'Nginx'] },
  { category: 'Databases',      icon: '🗄️', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'] },
  { category: 'Tools',          icon: '🛠️', skills: ['VS Code', 'Figma', 'Postman', 'Jest', 'Agile/Scrum'] },
];

// ─── Cache flag — persists across requests in the same serverless instance ────
let isConnected = false;

/**
 * Connect to MongoDB. Safe to call on every request — skips if already connected.
 */
async function connect() {
  // Already connected — reuse the existing connection
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  await mongoose.connect(config.mongoUri, {
    serverSelectionTimeoutMS: 8000,
    socketTimeoutMS: 45000,
  });

  isConnected = true;
  console.log('🍃 MongoDB connected');

  // Seed default skills only if collection is empty
  const SkillCategory = require('../models/SkillCategory');
  const count = await SkillCategory.countDocuments();
  if (count === 0) {
    await SkillCategory.insertMany(DEFAULT_SKILLS);
    console.log('🌱 Default skills seeded');
  }
}

/**
 * Ensure local upload/cv directories exist.
 * On Vercel these point to /tmp which is always writable.
 */
function initDirs() {
  const { cvDir, uploadsDir, dataDir } = config.paths;
  [dataDir, cvDir, uploadsDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}

module.exports = { connect, initDirs };

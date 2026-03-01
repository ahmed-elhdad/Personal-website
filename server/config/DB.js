const fs     = require('fs');
const path   = require('path');
const config = require('./index');

const { dataDir, cvDir, uploadsDir, projectsFile, skillsFile } = config.paths;

const DEFAULT_SKILLS = [
  { category: 'Frontend',       icon: '🎨', skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { category: 'Backend',        icon: '⚙️', skills: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL', 'JWT Auth'] },
  { category: 'DevOps & Cloud', icon: '☁️', skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux', 'Nginx'] },
  { category: 'Databases',      icon: '🗄️', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'] },
  { category: 'Tools',          icon: '🛠️', skills: ['VS Code', 'Figma', 'Postman', 'Jest', 'Agile/Scrum'] },
];

function init() {
  // Create directories
  [dataDir, cvDir, uploadsDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // Seed default JSON files if they don't exist
  if (!fs.existsSync(projectsFile))
    fs.writeFileSync(projectsFile, JSON.stringify([], null, 2));

  if (!fs.existsSync(skillsFile))
    fs.writeFileSync(skillsFile, JSON.stringify(DEFAULT_SKILLS, null, 2));
}

function readJSON(file, fallback = []) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return fallback; }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = { init, readJSON, writeJSON };

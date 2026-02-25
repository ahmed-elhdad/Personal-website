const fs   = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('./index');

const { dataDir, cvDir, uploadsDir } = config.paths;

// ─── Paths ────────────────────────────────────────────────────────────────────
const PROJECTS_FILE = path.join(dataDir, 'projects.json');
const SKILLS_FILE   = path.join(dataDir, 'skills.json');

// ─── Default seed data ────────────────────────────────────────────────────────
const DEFAULT_SKILLS = [
  { id: uuidv4(), category: 'Frontend',      icon: '🎨', skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { id: uuidv4(), category: 'Backend',       icon: '⚙️', skills: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL', 'JWT Auth'] },
  { id: uuidv4(), category: 'DevOps & Cloud',icon: '☁️', skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux', 'Nginx'] },
  { id: uuidv4(), category: 'Databases',     icon: '🗄️', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'] },
  { id: uuidv4(), category: 'Tools',         icon: '🛠️', skills: ['VS Code', 'Figma', 'Postman', 'Jest', 'Agile/Scrum'] },
];

// ─── Initialise directories and seed files ────────────────────────────────────
function init() {
  [dataDir, cvDir, uploadsDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  if (!fs.existsSync(PROJECTS_FILE))
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify([], null, 2));

  if (!fs.existsSync(SKILLS_FILE))
    fs.writeFileSync(SKILLS_FILE, JSON.stringify(DEFAULT_SKILLS, null, 2));
}

// ─── Generic helpers ──────────────────────────────────────────────────────────
function readJSON(file, fallback = []) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return fallback; }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {
  init,
  readJSON,
  writeJSON,
  PROJECTS_FILE,
  SKILLS_FILE,
};

const { v4: uuidv4 } = require('uuid');
const { readJSON, writeJSON, PROJECTS_FILE } = require('../config/db');

/**
 * Return all projects, newest first.
 * @returns {{ projects: object[], total: number }}
 */
function getAll() {
  const projects = readJSON(PROJECTS_FILE, []);
  return { projects, total: projects.length };
}
 
/**
 * Return a single project by id.
 * Throws 404 if not found.
 * @param {string} id
 */
function getById(id) {
  const projects = readJSON(PROJECTS_FILE, []);
  const project  = projects.find(p => p.id === id);
  if (!project) {
    const err = new Error('Project not found');
    err.status = 404;
    throw err;
  }
  return project;
}

/**
 * Create a new project and persist it.
 * @param {object} fields
 * @param {string|null} thumbnailFilename  - filename from multer, if any
 * @returns {{ project: object }}
 */
function create({ title, description, tech, github, live, emoji }, thumbnailFilename) {
  if (!title || !description) {
    const err = new Error('Title and description are required');
    err.status = 400;
    throw err;
  }

  const now      = new Date().toISOString();
  const projects = readJSON(PROJECTS_FILE, []);

  const project = {
    id:          uuidv4(),
    title,
    description,
    tech:        parseTech(tech),
    github:      github || null,
    live:        live   || null,
    emoji:       emoji  || '💻',
    thumbnail:   thumbnailFilename ? `/uploads/${thumbnailFilename}` : null,
    createdAt:   now,
    updatedAt:   now,
  };

  projects.unshift(project);          // newest first
  writeJSON(PROJECTS_FILE, projects);
  return { project };
}

/**
 * Update an existing project.
 * @param {string} id
 * @param {object} fields
 * @returns {{ project: object }}
 */
function update(id, { title, description, tech, github, live, emoji }) {
  const projects = readJSON(PROJECTS_FILE, []);
  const idx      = projects.findIndex(p => p.id === id);

  if (idx === -1) {
    const err = new Error('Project not found');
    err.status = 404;
    throw err;
  }

  projects[idx] = {
    ...projects[idx],
    ...(title       && { title }),
    ...(description && { description }),
    ...(tech        && { tech: parseTech(tech) }),
    ...(github !== undefined && { github }),
    ...(live   !== undefined && { live }),
    ...(emoji       && { emoji }),
    updatedAt: new Date().toISOString(),
  };

  writeJSON(PROJECTS_FILE, projects);
  return { project: projects[idx] };
}

/**
 * Delete a project by id.
 * @param {string} id
 */
function remove(id) {
  const projects = readJSON(PROJECTS_FILE, []);
  const filtered = projects.filter(p => p.id !== id);

  if (filtered.length === projects.length) {
    const err = new Error('Project not found');
    err.status = 404;
    throw err;
  }

  writeJSON(PROJECTS_FILE, filtered);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseTech(tech) {
  if (!tech) return [];
  if (Array.isArray(tech)) return tech;
  return tech.split(',').map(t => t.trim()).filter(Boolean);
}

module.exports = { getAll, getById, create, update, remove };

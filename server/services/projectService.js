const { v4: uuidv4 } = require('uuid');
const { readJSON, writeJSON } = require('../config/db');
const config = require('../config');

const file = () => config.paths.projectsFile;

function getAll() {
  const projects = readJSON(file(), []);
  return { projects, total: projects.length };
}

function getById(id) {
  const projects = readJSON(file(), []);
  const project  = projects.find(p => p.id === id);
  if (!project) {
    const e = new Error('Project not found');
    e.status = 404;
    throw e;
  }
  return project;
}

function create({ title, description, tech, github, live, emoji }, thumbnailFilename) {
  if (!title || !description) {
    const e = new Error('Title and description are required');
    e.status = 400;
    throw e;
  }
  const now      = new Date().toISOString();
  const projects = readJSON(file(), []);
  const project  = {
    id:          uuidv4(),
    title,
    description,
    tech:        parseTech(tech),
    github:      github || null,
    live:        live   || null,
    emoji:       emoji  || '💻',
    thumbnail:   thumbnailFilename ? '/uploads/' + thumbnailFilename : null,
    createdAt:   now,
    updatedAt:   now,
  };
  projects.unshift(project);
  writeJSON(file(), projects);
  return { project };
}

function update(id, { title, description, tech, github, live, emoji }) {
  const projects = readJSON(file(), []);
  const idx      = projects.findIndex(p => p.id === id);
  if (idx === -1) {
    const e = new Error('Project not found');
    e.status = 404;
    throw e;
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
  writeJSON(file(), projects);
  return { project: projects[idx] };
}

function remove(id) {
  const projects = readJSON(file(), []);
  const filtered = projects.filter(p => p.id !== id);
  if (filtered.length === projects.length) {
    const e = new Error('Project not found');
    e.status = 404;
    throw e;
  }
  writeJSON(file(), filtered);
}

function parseTech(tech) {
  if (!tech) return [];
  if (Array.isArray(tech)) return tech;
  return tech.split(',').map(t => t.trim()).filter(Boolean);
}

module.exports = { getAll, getById, create, update, remove };

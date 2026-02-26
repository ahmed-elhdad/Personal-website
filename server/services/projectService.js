const Project = require('../models/Project');

/**
 * Return all projects sorted newest first.
 * @returns {Promise<{ projects: object[], total: number }>}
 */
async function getAll() {
  const projects = await Project.find().sort({ createdAt: -1 }).lean({ virtuals: true });
  return { projects, total: projects.length };
}

/**
 * Return a single project by MongoDB _id.
 * Throws 404 if not found.
 * @param {string} id
 */
async function getById(id) {
  const project = await Project.findById(id).lean({ virtuals: true });
  if (!project) {
    const err = new Error('Project not found');
    err.status = 404;
    throw err;
  }
  return project;
}

/**
 * Create and persist a new project.
 * @param {object} fields
 * @param {string|null} thumbnailFilename
 * @returns {Promise<{ project: object }>}
 */
async function create({ title, description, tech, github, live, emoji }, thumbnailFilename) {
  if (!title || !description) {
    const err = new Error('Title and description are required');
    err.status = 400;
    throw err;
  }

  const project = await Project.create({
    title,
    description,
    tech:      parseTech(tech),
    github:    github    || null,
    live:      live      || null,
    emoji:     emoji     || '💻',
    thumbnail: thumbnailFilename ? `/uploads/${thumbnailFilename}` : null,
  });

  return { project: project.toJSON() };
}

/**
 * Update an existing project (partial update).
 * @param {string} id
 * @param {object} fields
 * @returns {Promise<{ project: object }>}
 */
async function update(id, { title, description, tech, github, live, emoji }) {
  const changes = {
    ...(title       && { title }),
    ...(description && { description }),
    ...(tech        && { tech: parseTech(tech) }),
    ...(github !== undefined && { github }),
    ...(live   !== undefined && { live }),
    ...(emoji       && { emoji }),
  };

  const project = await Project.findByIdAndUpdate(
    id,
    { $set: changes },
    { new: true, runValidators: true }
  ).lean({ virtuals: true });

  if (!project) {
    const err = new Error('Project not found');
    err.status = 404;
    throw err;
  }

  return { project };
}

/**
 * Delete a project by id.
 * @param {string} id
 */
async function remove(id) {
  const result = await Project.findByIdAndDelete(id);
  if (!result) {
    const err = new Error('Project not found');
    err.status = 404;
    throw err;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseTech(tech) {
  if (!tech) return [];
  if (Array.isArray(tech)) return tech;
  return tech.split(',').map(t => t.trim()).filter(Boolean);
}

module.exports = { getAll, getById, create, update, remove };

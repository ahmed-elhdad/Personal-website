/**
 * Vercel serverless entry point.
 *
 * Vercel executes files inside /api as Node.js functions automatically.
 * This file imports the Express app and exports it — that is all Vercel needs.
 *
 * The `"includeFiles": ["**"]` in vercel.json ensures all sibling folders
 * (config/, routes/, services/, models/, middleware/) are bundled with this function.
 */

module.exports = require('../server');

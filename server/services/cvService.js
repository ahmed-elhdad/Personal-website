const fs   = require('fs');
const path = require('path');
const config = require('../config');

const CV_PATH = path.join(config.paths.cvDir, 'resume.pdf');

/**
 * Returns true if a CV has been uploaded.
 * @returns {boolean}
 */
function exists() {
  return fs.existsSync(CV_PATH);
}

/**
 * Returns the absolute path to the CV file.
 * Throws a 404 error if no CV has been uploaded yet.
 * @returns {string}
 */
function getPath() {
  if (!exists()) {
    const err = new Error('CV not found. Please upload it via the admin panel.');
    err.status = 404;
    throw err;
  }
  return CV_PATH;
}

module.exports = { exists, getPath };

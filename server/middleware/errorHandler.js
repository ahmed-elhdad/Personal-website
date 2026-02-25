/**
 * Global error handler — must be registered last with app.use().
 * Catches anything passed via next(err) or thrown inside async handlers.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  console.error('[ERROR]', err.message || err);

  // Multer-specific errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'File is too large' });
  }

  const status  = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ message });
}

module.exports = { errorHandler };

const jwt    = require('jsonwebtoken');
const config = require('../config');

/**
 * Protects routes — attaches `req.user` if the Bearer token is valid.
 */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: no token provided' });
  }

  const token = authHeader.slice(7);

  try {
    req.user = jwt.verify(token, config.jwt.secret);
    next();
  } catch (err) {
    const message =
      err.name === 'TokenExpiredError'
        ? 'Token has expired — please log in again'
        : 'Token is invalid';
    res.status(401).json({ message });
  }
}

module.exports = { authenticate };

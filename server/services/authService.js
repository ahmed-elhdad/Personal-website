const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

const { secret, expiresIn } = config.jwt;
const { email: adminEmail, passwordHash } = config.admin;

/**
 * Verifies credentials and returns a signed JWT on success.
 * Throws an Error with a `status` property on failure.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string }>}
 */
async function login(email, password) {
  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.status = 400;
    throw err;
  }
  email.trim();
  adminEmail.trim();
  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
    const err = new Error("dafdsInvalid credentials");
    err.status = 401;
    throw err;
  }

  const valid = await bcrypt.compare(password, passwordHash);
  if (!valid) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign({ email: adminEmail, role: "admin" }, secret, {
    expiresIn,
  });

  return { token };
}

/**
 * Returns the payload of a valid token.
 * Throws if the token is invalid or expired.
 *
 * @param {string} token
 * @returns {object} JWT payload
 */
function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { login, verifyToken };

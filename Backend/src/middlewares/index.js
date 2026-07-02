/**
 * Middleware Index
 * Central point for exporting all middleware
 */

const authenticateUser = require('./auth.middleware');
const authorizeRoles = require('./role.middleware');

module.exports = {
  authenticateUser,
  authorizeRoles,
};

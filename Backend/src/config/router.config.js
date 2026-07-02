const fs = require('fs');
const path = require('path');

const API_PREFIX = '/api';
const MODULES_ROOT = path.resolve(__dirname, '../modules');
const SAFE_MODULE_NAME = /^[a-z][a-z0-9]*$/;
const SAFE_MOUNT_SEGMENT = /^[a-z][a-z0-9-]*$/;

// API mount segment per module folder (defaults to folder name when omitted).
const MOUNT_OVERRIDES = {
  user: 'users',
  hotel: 'hotels',
  room: 'rooms',
  reservation: 'reservations',
  payment: 'payments',
  review: 'reviews',
  facility: 'facilities',
  notification: 'notifications',
};

const resolveModuleRouteFile = (folder) => {
  if (!SAFE_MODULE_NAME.test(folder)) {
    throw new Error(`Invalid module folder name: ${folder}`);
  }

  const safeFolder = path.basename(folder);
  const routeFile = path.resolve(MODULES_ROOT, safeFolder, `${safeFolder}.routes.js`);

  if (
    safeFolder !== folder
    || !routeFile.startsWith(`${MODULES_ROOT}${path.sep}`)
    || path.basename(routeFile) !== `${safeFolder}.routes.js`
  ) {
    throw new Error(`Blocked unsafe module path: ${folder}`);
  }

  if (!fs.existsSync(routeFile)) {
    throw new Error(`Route file not found: ${safeFolder}.routes.js`);
  }

  return routeFile;
};

const resolveMountPath = (folder) => {
  const mount = MOUNT_OVERRIDES[folder] || folder;

  if (!SAFE_MOUNT_SEGMENT.test(mount)) {
    throw new Error(`Invalid mount path for ${folder}: ${mount}`);
  }

  return mount;
};

const discoverModuleFolders = () => fs
  .readdirSync(MODULES_ROOT, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((folder) => SAFE_MODULE_NAME.test(folder))
  .sort();

const setupRoutes = (app) => {
  discoverModuleFolders().forEach((folder) => {
    try {
      const routeFile = resolveModuleRouteFile(folder);
      const mount = resolveMountPath(folder);
      const moduleRoutes = require(routeFile);

      app.use(`${API_PREFIX}/${mount}`, moduleRoutes);
    } catch (err) {
      console.warn(`⚠ ${folder} routes not loaded:`, err.message);
    }
  });
};

module.exports = setupRoutes;

const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')


class InvalidGServicePath extends Error {}

const GATEWAY_BASEDIR = './gateways/';
const SERVICE_BASEDIR = './services/';
const INVALID_CHARS = ['.', '/'];
const MODULE_NOT_LOADED_ERROR_MESSAGE = 'GService cannot load module: %s. \n%s';
const INVALID_MODULE_PATH_ERROR_MESSAGE = 'Invalid module path: %s';
const LOADING_LATEST_VERSION_MESSAGE = 'GService will load latest version of module: %s';


const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source).filter(name => isDirectory(join(source, name)))

const create = (gatewayName, serviceName, options) => {
  const version = options.version;
  const service = _createService(serviceName, version, options);

  return _createGateway(gatewayName, service);
}

const _createGateway = (name, service) => {
  const Klass = _importModule(GATEWAY_BASEDIR, name);
  return new Klass(service);
}

const _createService = (name, version, options) => {
  const Klass = _importModule(SERVICE_BASEDIR, name, version);
  return new Klass(options);
}

function _getServiceLatestVersion(error, moduleName) {
  if (error instanceof InvalidGServicePath) {
    return null;
  }

  console.log(LOADING_LATEST_VERSION_MESSAGE, moduleName);
  const baseDir = __dirname + '/';
  const path = `${SERVICE_BASEDIR}${moduleName}/`;
  const directories = getDirectories(baseDir + path).sort();
  const latest = directories.slice(-1)[0];
  return _importModule(path, latest);
}

function _verifyPath(path, suffix = null) {
  const fullPath = suffix ? `${path}/${suffix}` : path;

  for (index in path) {
    if (path[index].includes(INVALID_CHARS)) {
      throw new InvalidGServicePath(INVALID_MODULE_PATH_ERROR_MESSAGE, path);
    }
  }

  for (index in suffix) {
    if (suffix[index] == '/') {
      throw new InvalidGServicePath(INVALID_MODULE_PATH_ERROR_MESSAGE, fullPath);
    }
  }

  return fullPath;
}

function _importModule(baseDir, moduleName, version) {
  let Klass;

  try {
    const path = baseDir + _verifyPath(moduleName, version);
    Klass = require(path);
  } catch (error) {
    console.log(MODULE_NOT_LOADED_ERROR_MESSAGE, moduleName, error);
    Klass = version ? _getServiceLatestVersion(error, moduleName) : Klass;
    if (!Klass) {
      throw error;
    }
  }
  return Klass;
}


module.exports = { create };

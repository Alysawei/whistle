var path = require('path');
var config = require('../config');
if (config.pluginPaths) {
  exports.getPaths = function() {
    return config.pluginPaths;
  };
  return;
}

var paths = module.paths.map(formatPath);
var globalDir = formatPath(getGlobalDir());
var appDataDir = formatPath(process.env && process.env.APPDATA);
var pluginsPath = formatPath(path.join(config.DATA_DIR, 'node_modules'));

if (paths.indexOf(pluginsPath) == -1) {
  paths.unshift(pluginsPath);
}

pluginsPath = formatPath(process.env && process.env.WHISTLE_PLUGINS_PATH);
if (pluginsPath) {
  pluginsPath = path.join(pluginsPath, 'node_modules');
  paths.indexOf(pluginsPath) == -1 && paths.unshift(pluginsPath);
}

if (appDataDir) {
  appDataDir = path.join(appDataDir, 'npm/node_modules');
  paths.indexOf(appDataDir) == -1 && paths.push(appDataDir);
}

if (globalDir && paths.indexOf(globalDir) == -1) {
  paths.push(globalDir);
}

function formatPath(path) {
  return typeof path == 'string' ? path.replace(/\\/g, '/') : null;
}

function getGlobalDir() {
  var globalPrefix;
  if (process.env.PREFIX) {
    globalPrefix = process.env.PREFIX;
  } else if (process.platform === 'win32') {
    globalPrefix = path.dirname(process.execPath);
  } else {
    globalPrefix = path.dirname(path.dirname(process.execPath));
    if (process.env.DESTDIR) {
      globalPrefix = path.join(process.env.DESTDIR, globalPrefix);
    }
  }
  if (typeof globalPrefix == 'string') {
    return (process.platform !== 'win32')
? path.resolve(globalPrefix, 'lib', 'node_modules')
: path.resolve(globalPrefix, 'node_modules');
  }
}

exports.getPaths = function() {
  return paths;
};



'use strict';

var path = require('path');

/**
 * Will return the path and default zipcore-node configuration on environment variables
 * or default locations.
 * @param {Object} options
 * @param {String} options.network - "testnet" or "livenet"
 * @param {String} options.datadir - Absolute path to Zip database directory
 */
function getDefaultBaseConfig(options) {
  if (!options) {
    options = {};
  }

  var datadir = options.datadir || path.resolve(process.env.HOME, '.zip');

  return {
    path: process.cwd(),
    config: {
      network: options.network || 'livenet',
      port: 3001,
      services: ['zipd', 'web'],
      servicesConfig: {
        zipd: {
          spawn: {
            datadir: datadir,
            exec: path.resolve(__dirname, datadir, 'zipd')
          }
        }
      }
    }
  };
}

module.exports = getDefaultBaseConfig;

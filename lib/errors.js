'use strict';

var createError = require('errno').create;

var ZipcoreNodeError = createError('ZipcoreNodeError');

var RPCError = createError('RPCError', ZipcoreNodeError);

module.exports = {
  Error: ZipcoreNodeError,
  RPCError: RPCError
};

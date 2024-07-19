'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export zipcore-lib', function() {
    var zipcore = require('../');
    should.exist(zipcore.lib);
    should.exist(zipcore.lib.Transaction);
    should.exist(zipcore.lib.Block);
  });
});

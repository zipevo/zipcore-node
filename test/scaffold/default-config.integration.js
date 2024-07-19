'use strict';

var path = require('path');
var should = require('chai').should();
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('#defaultConfig', function() {
  var expectedExecPath = path.resolve(__dirname, process.env.HOME, './.zipcore/data/zipd');

  it('will return expected configuration', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'zipd',
        'web'
      ],
      servicesConfig: {
        zipd: {
          connect: [{
            rpchost: '127.0.0.1',
            rpcport: 9998,
            rpcuser: 'zip',
            rpcpassword: 'local321',
            zmqpubrawtx: 'tcp://127.0.0.1:28332'
           }]
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.zipcore/zipcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        },
        mkdirSync: sinon.stub(),
      },
    });
    var home = process.env.HOME;
    var info = defaultConfig();
    info.path.should.equal(home + '/.zipcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal(['zipd', 'web']);
    var zipd = info.config.servicesConfig.zipd;
    should.exist(zipd);
  });
  it('will include additional services', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'zipd',
        'web',
        'insight-api',
        'insight-ui'
      ],
      servicesConfig: {
        zipd: {
          connect: [{
            rpchost: '127.0.0.1',
            rpcport: 9998,
            rpcuser: 'zip',
            rpcpassword: 'local321',
            zmqpubrawtx: 'tcp://127.0.0.1:28332'
          }]
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.zipcore/zipcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        },
        mkdirSync: sinon.stub(),
      },
    });
    var home = process.env.HOME;
    var info = defaultConfig({
      additionalServices: ['insight-api', 'insight-ui']
    });
    info.path.should.equal(home + '/.zipcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal([
      'zipd',
      'web',
      'insight-api',
      'insight-ui'
    ]);
    var zipd = info.config.servicesConfig.zipd;
    should.exist(zipd);
  });
});

Zipcore Node
============

A Zip full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [Zip Core (zipd) v0.13.0](https://github.com/zippay/zip/tree/v0.13.0.x) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

```bash
git clone https://github.com/zipevo/zipcore-node
cd zipcore-node
npm install
./bin/zipcore-node start
```

When running the start command, it will seek for `.zipcore/zipcore-node.json` conf file in the working directory (see [/docs/services/zipd.md](/docs/services/zipd.md) for an example).
If it doesn't exist, it will create it, with basic task to connect to zipd.

Some plugins are available :

- Insight-API : `./bin/zipcore-node addservice @zipevo/insight-api`
- Insight-UI : `./bin/zipcore-node addservice @zipevo/insight-ui`

You also might want to add these index to your zip.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install @zipevo/zipcore-node
```

```javascript
const zipcore = require('@zipevo/zipcore-node');
const config = require('./zipcore-node.json');

let node = zipcore.scaffold.start({ path: "", config: config });
node.on('ready', function () {
    console.log("Zip core started");
    
    node.services.zipd.on('tx', function(txData) {
        let tx = new zipcore.lib.Transaction(txData);
        console.log(tx);
    });
});
```

## Prerequisites

- Zip Core (zipd) (v0.13.0) with support for additional indexing *(see above)*
- Node.js v8+
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~50GB of disk storage
- ~1GB of RAM

## Configuration

Zipcore includes a Command Line Interface (CLI) for managing, configuring and interfacing with your Zipcore Node.

```bash
zipcore-node create -d <zip-data-dir> mynode
cd mynode
zipcore-node install <service>
zipcore-node install https://github.com/yourname/helloworld
zipcore-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [Zip Core](https://github.com/zippay/zip/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/zipevo/insight-api/tree/master)
- [Insight UI](https://github.com/zipevo/insight-ui/tree/master)
- [Bitcore Wallet Service](https://github.com/zipevo/zipcore-wallet-service/tree/master)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [Zipd](docs/services/zipd.md) - Interface to Zip Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a zipd node already runing `zipd --daemon`.

Zipcore-node : `git clone https://github.com/zipevo/zipcore-node -b develop`
Insight-api (optional) : `git clone https://github.com/zipevo/insight-api -b develop`
Insight-UI (optional) : `git clone https://github.com/zipevo/insight-ui -b develop`

Install them :
```
cd zipcore-node && npm install \
 && cd ../insight-ui && npm install \
 && cd ../insight-api && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api
npm link ../insight-ui
```

Start with `./bin/zipcore-node start` to first generate a ~/.zipcore/zipcore-node.json file.
Append this file with `"@zipevo/insight-ui"` and `"@zipevo/insight-api"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/zipevo/zipcore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/zipevo/zipcore-node/blob/master/LICENSE).

Copyright 2016-2018 Zip Core Group, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)

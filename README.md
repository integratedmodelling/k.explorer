# k.explorer for k.LAB

Web based explorer for k.LAB engine.

## Start

During develop you need to install quasar framework: [https://quasar-framework.org/guide/index.html]

First, we install Quasar CLI. Make sure you have Node >=8 and NPM >=5 installed on your machine.

*Make sure you have vue-cli globally installed*
```bash
$ yarn global add vue-cli
# or:
$ npm install -g vue-cli

# Node.js >= 8.9.0 is required.
$ yarn global add quasar-cli
# or:
$ npm install -g quasar-cli
```

Using yarn to install and quasar-cli to start

```bash
$ cd [project dir]
$ yarn
# install everything using package.json and yarn.lock

$ quasar dev
# start dev server and open a new tab
```

**Is necesary to copy the url generated by the engine**

```url
http://localhost:8080/viewer?session=[session-id]
```

To generate build files, use quasar-cli. `ui` folder is generated in `klab.engine/src/main/resources/static`

```bash

$ quasar build

```
## Releases

### v0.5.0: first tagged version
On 21th november 2018, @euskalhenriko "discover" the tag release and decide to start versionig better the development.


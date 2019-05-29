# k.Explorer for k.LAB

Web based explorer for k.LAB engine.

The k.Explorer is served by the k.LAB engine using the compiled version.

## Start

k.Explorer is developed using the [0.17 version of Quasar Framework](https://v0-17.quasar-framework.org/)

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

Use yarn to install

```bash
$ cd [project dir]
$ yarn
# install everything using package.json and yarn.lock

```

If you want to use it in developer mode, use quasar-cli or package.json script
```bash
$ quasar dev
# or $ yarn quasar-dev
# start dev server
```
To use in developer mode, open a browser and go to [http://localhost:8080/viewer?session=<session-id>]
where `session-id` is the session number that appear in the console of k.LAB engine

To generate build files, use quasar-cli or the script.
The result of building must be copied in the folder `klab.engine/src/main/resources/static/ui` of the k.LAB source

```bash

$ quasar build
# or $ yarn quasar-build

```
## Releases

See [CHANGELOG.md](CHANGELOG.md)

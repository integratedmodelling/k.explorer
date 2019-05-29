# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.2.0 - 2018-11-21
### Added
- This CHANGELOG file to hopefully serve as an evolving example of a
  standardized open source project CHANGELOG.
- First committed version of library
## 0.3.0 - 2018-12-05
### Removed
- The action handler binding now is responsibility of importer app. Example for `selectAction`:
```ecmascript 6
const inversify = require('inversify');
class ClickActionHandler {
  handle(action) {
    if (action instanceof SelectAction) {
      // do things
    }
  }
}
class ClickHandlerInitializer {
  initialize(registry) {
    registry.register(SelectCommand.KIND, new ClickActionHandler());
  }
}

inversify.decorate(inversify.injectable(), ClickHandlerInitializer);
```
- exporting only `ElkGraphJsonToSprotty` and `createContainer`)
## 0.4.0 - 2018-12-11
### Reconfigurated
- reconfigurating all to generate something useful to use in k.explorer side:
  - reorganize `package.json`, `tsconfig.json` and `webpack.config.js` eliminating unused features
  - renamed the project and recommit everything
  - in k.explorer the project is included has bitbucket repository with ssh-key auth
## 0.4.1 - 2019-01-10
### Changed
- `needsClientLayout` now is not the first argument but property of it
- `needsServerLayout` has been added as option on create container with default value `!needsClientLayout`

## 0.4.2 - 2019-01-23
- upgrade libraries and rebuild 

## 0.4.3 - 2019-03-01
- upgrade libraries and rebuild 

# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.5.0 - 2018-11-21
### Added
- This CHANGELOG file to hopefully serve as an evolving example of a
  standardized open source project CHANGELOG.
- First tagged version of k.EXPLORER
  - Custom context for observation search
  - Observation search with suggestions based on user certificate
  - Logs
  - Result tree with info about each observation
    - histogram
    - metadata
    - detailed points
    - etc.
  - Reports
- Update README.md

## 0.5.1 - 2018-12-11
### Reconfiguration
- Change the klab-elk-sprotty-bridge dependency has bitbucket repository dependency.
  The way to use it is via ssh-key.
  This resolve the problem of inversify double import

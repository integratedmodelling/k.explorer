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
### Added
- Dataflow visualizer using elk and sprotty
- Dataflow respond to engine input about dataflow components processing
- To use elk/sprotty solution, a new library was created (klab-elk-sprotty-bridge) that is added as
  bitbucket private repository dependency. Now the way to use it is via ssh-key  

## 0.5.2 - 2018-12-19
### Changed
- Change license to [AGPL-3.0-only](https://choosealicense.com/licenses/agpl-3.0/)
### Solved
- Solved bugs in searchbox:
  - if keyboard is used on results, mouse now not interfere
  - if there are too many results to show in small dimensions, scrollbar now is visualized, so
  in firefox there aren't big white space. 
  - mouse click on scrollbar now doesn't close popup 
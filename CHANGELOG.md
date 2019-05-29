# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.7.0 - 2019-05-29
### Added
- Graph viewer for configurations
- Recontextualization is partially working
### Improvements
- The ELK - sprotty bridge now is part of the k.EXPLORER project
  Is based on [https://github.com/OpenKieler/elkgraph-web] and the bridge changelog is available
  in [this folder](src/ts/elk-sprotty-bridge/README.md)
### Solved
- crossing IDL now is permitted only if a context is drawn
- various bug solved
### Extra
- now the repository is public!

## 0.6.5 - 2019-05-03
### Added
- Download folder as shape file
- Upload file
- Interactive mode
- Input request management 
### Improvements
- Info for a point directly clicking on map without need to open observation info
- Various tree-shakes
### Solved
- Search timeout enlarged to avoid problems if engine is calculating
- Raster layer now fit better in base map

## 0.6 - 2019-03-04
### Added
- Left menu with main actions and log viewer
- Main control can be docked to the left menu
- When a layer is selected and visible, a click on map show info about the point
- Double click on visible layer, fit map on windows and put on top the selected layer
### Improvements
- Better touch control
- Double click on tree fit the context in the window
- Managed context out of -180º/180º longitude range creating a splitted polygon
- Is not possible to set the center out of -180º/180º longitude
### Solved
- Text when log is empty
- Better style for report
- href on report now work
- more style problems solved

## 0.5.6 - 2019-01-23
### Solved
- Changed some muddler text
- Changed the way tasks are managed, now if page is reload, observation of previous context are linked to it
- Better management of context changes
- Bug with context without children and spinner fixed
- Bug with context date fixed
- Various bug fixes

## 0.5.5 - 2019-01-22
### Added
- Save location and geolocation if no location cookie is found

## 0.5.4 - 2019-01-18
### Added
- Possibility to load previous context
- Possibility to switch to previous or new context while waiting for calculation
### Solved
- various improvements in logic and UI
### Link
Feature notification on Integrated Modelling Confluence
[
 Access to previous contexts and concurrent computations are implemented in k.Explorer](https://integratedmodelling.org/confluence/display/ATS/Feature+notification)

## 0.5.3 - 2019-01-09
### Added
- Added a status text that show the current running task
### Solved
- Solved partial sibling load in big screens 

## 0.5.2 - 2018-12-19
### Changed
- Change license to [AGPL-3.0-only](https://choosealicense.com/licenses/agpl-3.0/)
### Solved
- Solved bugs in searchbox:
  - if keyboard is used on results, mouse now not interfere
  - if there are too many results to show in small dimensions, scrollbar now is visualized, so
  in firefox there aren't big white space. 
  - mouse click on scrollbar now doesn't close popup 

## 0.5.1 - 2018-12-11
### Added
- Dataflow visualizer using elk and sprotty
- Dataflow respond to engine input about dataflow components processing
- To use elk/sprotty solution, a new library was created (klab-elk-sprotty-bridge) that is added as
  bitbucket private repository dependency. Now the way to use it is via ssh-key  

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

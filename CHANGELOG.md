# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project versioning adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html), but a public API
is not available.

**The version of k.Explorer software is self-referred and is not linked to the k.LAB version, so is possible that some features are not available in the stable version of the engine.**
## 0.11
### Added
- Time selection for scale
- Speed selector on timeline with click and hold
- Implements observations in secondary context
- Intercept engine event and stop search if is busy
### Improvements
- Click on map layer select it and give info
- Right click on layer for more action (like Set as context)
- Layer on top of secondary context has better management
- Notification from engine are totally changed
### Solved
- Various bug solved

## 0.10.2
### Added
- Time selector
## Improvements
- Download of "layer" is linked to timestamp selected in this moment

## 0.10.1 - 2020-01-31
## Solved
- Problem with context mask due to a mistake in declaring dependencies with ol library
- Solve a bug with second level children: if the parent was checked before open, the second level is not loaded
- Solve a bug with observation visualization: if an element has children and it is in main tree, checking parent broke the showing part

## 0.10.0 - 2020-01-15
### Added
- Time implementation:
  - click on timeline, show observation at this time
  - click on left/right corner go to start/end time
  - double click on left corner go to time -1
  - click on play, start running time
- Time viewer on bottom left corner
### Improvements
- Partial label on search bar showing things (f.e. when a shape is being loaded)
- If main tree has some observation visible, the detail pane not close
- Text in log pane is selectable
### Solve
- Nested folder of primary tree are not shows

## 0.9.0 - 2019-10-18
### Added
- Rating and comment resources is implemented on client side
- Help
### Improvements
- Fuzzy search now is linked to overpass query: if the search start with capital letter, the engine search for an answer from OSM and return a context
- Folder lazy loading
- Now the dock action works better
- Better visualization of nested folders
 

## 0.8.0 - 2019-09-04
### Improvements
- Reorganization of tree of observations: now main observation are grouped upper and the rest are in a collapsible group.
- The upper tree is "user-managed", is possible to move observation from the collapsible group to the user group and viceversa
- The search bar width change while the user write
- Redesign of scale indicator
- The docked status remain if the context is reset
- Possibility to store the docked status for future sessions (cookie based)
### Solve
- various bugs solved

## 0.7.5 - 2019-07-01
### Added
- with double click on map, map info popup is locked and show info of the top layer. To put on top a layer, you can double click in the tree on it.
- added dataflow element information on click
- the search bar has new feature for more complex queries
- possibility of free search
### Improvements
- with a click on map, info about the point is showed even if observation info panel is open
- add a separator in log visualizer for each context reset
- main action buttons redesign
- improvement on dataflow viewer
- notifications of observation between explorer and engine was completely redefine
- spacebar to select element
### Solve
- unity of scale bug solved
- lock scale functionality now is coherent
- unregister event listener

## 0.7.0 - 2019-05-29
### Added
- Graph viewer for configurations
- Recontextualization is partially working
### Improvements
- The ELK - sprotty bridge now is part of the k.Explorer project
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
- First tagged version of k.Explorer
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

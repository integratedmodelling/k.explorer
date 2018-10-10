import { Helpers } from 'shared/Helpers';
import { EMPTY_MAP_SELECTION } from 'shared/Constants';

export default {
  ADD_TO_KEXPLORER_LOG: (state, log) => {
    Helpers.pushElementInFixedQueue(state.kexplorerLog, log);
  },

  ADD_TO_KLAB_LOG: (state, log) => {
    Helpers.pushElementInFixedQueue(state.klabLog, log);
  },

  SET_CONTEXT_LAYER: (state, contextGeometry) => {
    // when a new context exists, we must reset everything
    state.dataViewers.splice(0, state.dataViewers.length);
    state.lastViewerId = 0;
    state.contextGeometry = contextGeometry;
    state.treeExpanded = [];
    state.treeTicked = [];
    state.treeSelected = null;
  },

  /**
   * Set the main viewer in index page
   * @param viewer the viewer component name
   */
  SET_MAIN_VIEWER: (state, viewer) => {
    state.mainViewer = viewer;
  },
  /**
   * Set the main data viewer by viewer index
   * @param idx the viewer idx
   */
  SET_MAIN_DATA_VIEWER: (state, idx) => {
    state.dataViewers.forEach((viewer) => { viewer.main = viewer.idx === idx; });
  },

  /**
   * Add a viewer to Main Viewer
   * No observation added
   * @param main if true, is the main viewer
   * @param type one of contstants.VIEWER_[TYPE]
   * @param data content of viewer
   */
  ADD_VIEWER_ELEMENT: (state, { main, type, callback }) => {
    // if first, than main
    if (state.lastViewerId === 0) {
      main = true;
      // if new main, every before is false
    } else if (main === true) {
      state.dataViewers.forEach((viewer) => { viewer.main = false; });
    } // TODO do something if is false and all are false
    // first viewer has index = 1
    state.lastViewerId += 1;
    state.dataViewers.push({
      idx: state.lastViewerId,
      main,
      type,
      observations: [],
    });
    if (typeof callback === 'function') {
      callback(state.lastViewerId);
    }
  },

  SET_SPINNER_ANIMATED: (state, animated) => {
    state.spinner.animated = animated;
  },
  SET_SPINNER_COLOR: (state, color) => {
    state.spinner.color = color;
  },
  SET_SPINNER: (state, { animated, color, errorMessage = null }) => {
    state.spinner = { animated, color, errorMessage };
  },
  ADD_TO_SPINNER_OWNERS: (state, owner) => {
    const index = state.spinnerOwners.indexOf(owner);
    if (index === -1) {
      state.spinnerOwners.push(owner);
    }
  },
  REMOVE_FROM_SPINNER_OWNERS: (state, owner) => {
    const index = state.spinnerOwners.indexOf(owner);
    if (index !== -1) {
      state.spinnerOwners.splice(index, 1);
    }
  },
  /**
   * Activate and deactivate search
   * @param active if true, search is active
   * @constructor
   */
  SEARCH_ACTIVE: (state, { active, char = '' }) => {
    if (state.searchActive !== active) {
      state.searchLostChar = char;
      state.searchActive = active;
    }
  },

  SEARCH_FOCUS: (state, { focused, char = '' }) => {
    if (state.searchFocus !== focused) {
      state.searchLostChar = char;
      state.searchFocus = focused;
    }
  },

  RESET_SEARCH_LOST_CHAR: (state) => {
    state.searchLostChar = '';
  },

  RESET_SEARCH: (state) => {
    state.searchActive = false;
    state.searchFocus = false;
    state.searchLostChar = '';
  },

  STORE_SEARCH: (state, searchArray) => {
    state.searchHistory.unshift(searchArray);
  },

  SET_RELOAD_REPORT: (state, reload) => {
    state.reloadReport = reload;
  },

  SET_OBSERVATION_INFO: (state, observation) => {
    if (observation === null) {
      state.treeSelected = null;
      state.mapSelection = EMPTY_MAP_SELECTION;
      state.observationInfo = null;
    } else if (state.observationInfo === null || (observation.id !== state.observationInfo.id)) {
      // new observation selected
      state.observationInfo = observation;
      // we need to reset mapSelection...
      state.mapSelection = EMPTY_MAP_SELECTION;
      // and select it on tree
      state.treeSelected = observation.id;
    }
  },

  /**
   * map selection exists only if there is an observation info
   * Used to watch only this
   * @param mapSelection
   * @property pixelSelected
   * @property layerSelected
   * @constructor
   */
  SET_MAP_SELECTION: (state, mapSelection) => {
    const { pixelSelected, layerSelected, value = null } = mapSelection;
    if (mapSelection === null || pixelSelected === null || layerSelected === null) { // map selection reset or strange values
      state.mapSelection = EMPTY_MAP_SELECTION;
    } else if (state.observationInfo === null) {
      console.warn('Try to set pixel and layer without observationInfo, will be skipped');
    } else if (`cl_${state.observationInfo.id}` !== layerSelected.get('id')) {
      console.warn('Try to set pixel and layer with different observationInfo id, will be skipped');
    } else {
      state.mapSelection = { pixelSelected, layerSelected, value };
    }
  },

  SET_SCALE_EDITING: (state, { active, type }) => {
    state.scaleEditing = {
      active,
      type,
    };
  },
};

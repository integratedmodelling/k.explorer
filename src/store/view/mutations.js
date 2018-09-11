import { Helpers } from 'shared/Helpers';

export default {
  ADD_TO_KEXPLORER_LOG: (state, log) => {
    Helpers.pushElementInFixedQueue(state.kexplorerLog, log);
  },

  ADD_TO_KLAB_LOG: (state, log) => {
    Helpers.pushElementInFixedQueue(state.klabLog, log);
  },

  SET_CONTEXT_LAYER: (state, contextGeometry) => {
    // when a new context exists, we must reset everything
    state.viewers.splice(0, state.viewers.length);
    state.lastViewerId = 0;
    state.contextGeometry = contextGeometry;
  },

  /**
   * Set the main viewer by viewer index
   * @param idx the viewer idx
   */
  SET_MAIN_VIEWER: (state, idx) => {
    state.viewers.forEach((viewer) => { viewer.main = viewer.idx === idx; });
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
      state.viewers.forEach((viewer) => { viewer.main = false; });
    } // TODO do something if is false and all are false
    // first viewer has index = 1
    state.lastViewerId += 1;
    state.viewers.push({
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
    state.searchHistory.push(searchArray);
  },
};

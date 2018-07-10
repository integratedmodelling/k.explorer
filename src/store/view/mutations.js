import { Helpers } from 'shared/Helpers';

export default {
  PUSH_LOG_ACTION: (state, action) => {
    Helpers.pushElementInFixedQueue(state.logActions, action);
  },

  SET_CONTEXT_LAYER: (state, contextLayer) => {
    // when a new context exists, we must reset everything
    state.viewers.splice(0, state.viewers.length);
    state.lastViewerId = 0;
    state.contextLayer = contextLayer;
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
  SET_SPINNER: (state, { animated, color }) => {
    state.spinner = { animated, color };
  },
  /**
   * Activate and deactivate search
   * @param active if true, search is active
   * @constructor
   */
  SEARCH_ACTIVE: (state, active) => {
    state.searchActive = active;
  },
};


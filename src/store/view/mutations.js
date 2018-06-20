import { Helpers } from 'shared/Helpers';

export default {
  PUSH_LOG_ACTION: (state, action) => {
    Helpers.pushElementInFixedQueue(state.logActions, action);
  },

  SET_CONTEXT_LAYER: (state, contextLayer) => {
    // when a new context exists, we must reset everything
    state.viewersLayout.splice(0, state.viewersLayout.length);
    state.lastViewerId = 0;
    state.contextLayer = contextLayer;
  },

  /**
   * Set the main viewer by viewer index
   * @param idx the viewer idx
   */
  SET_MAIN_VIEWER: (state, idx) => {
    state.viewersLayout.forEach((viewer) => { viewer.main = viewer.idx === idx; });
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
      state.viewersLayout.forEach((viewer) => { viewer.main = false; });
    } // TODO do something if is false and all are false
    // first viewer has index = 1
    state.lastViewerId += 1;
    state.viewersLayout.push({
      idx: state.lastViewerId,
      main,
      type,
      observations: [],
    });
    if (typeof callback === 'function') {
      callback(state.lastViewerId);
    }
  },


  ADD_OBSERVATION: (state, { idx, observation }) => {
    const viewer = state.viewersLayout.find(v => v.idx === idx);
    if (typeof viewer !== 'undefined') {
      viewer.observations.push(observation);
    } else {
      throw Error(`Viewer with idx ${idx} not founded`);
    }
  },
};


export default {

  /**
   * Set context object
   * TODO: check if everything is good
   * @param context the new context
   */
  SET_CONTEXT: (state, context) => {
    state.context = context;
  },

  /**
   * Reset everything
   */
  RESET_CONTEXT: (state) => {
    state.context = null;
    state.tree = [];
    state.lastViewerId = 0;
    state.leafSelected = null;
    state.viewerLayout = [];
  },

  /**
   * Add node to tree
   * @param node
   */
  ADD_NODE: (state, node) => {
    state.tree.push(node);
  },

  /**
   * Add a viewer to Main Viewer
   * @param main if true, is the main viewer
   * @param type one of contstants.VIEWER_[TYPE]
   * @param data content of viewer
   */
  ADD_VIEWER_ELEMENT: (state, { main, type, data }) => {
    // if first, than main
    if (state.lastViewerId === 0) {
      main = true;
    // if new main, every before is false
    } else if (main === true) {
      state.viewerLayout.forEach((viewer) => { viewer.main = false; });
    }
    // first viewer has index = 1
    state.lastViewerId += 1;
    state.viewerLayout.push({
      idx: state.lastViewerId,
      main,
      type,
      data,
    });
    return state.lastViewerId;
  },

  /**
   * Set the main viewer by viewer index
   * @param idx the viewer idx
   */
  SET_MAIN_VIEWER: (state, idx) => {
    state.viewerLayout.forEach((viewer) => { viewer.main = viewer.idx === idx; });
  },

  /**
   * Set the selected leaf of tree
   * TODO: change when checkbox will be implemented
   * @param leafSelected the selected leaf
   */
  SET_LEAF_SELECTED: (state, leafSelected) => {
    state.leafSelected = leafSelected;
  },
};


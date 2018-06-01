export default {
  ADD_NODE: (state, node) => {
    state.tree.push(node);
  },
  ADD_SAVED: (state, saved) => {
    state.saved.push(saved);
  },
  /*
  ADD_STATUS: (state, status) => {
    state.status.push(status);
  },
  */
  SET_SELECTED: (state, selected) => {
    state.leafSelected = selected;
  },
};


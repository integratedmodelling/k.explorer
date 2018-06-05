export default {
  ADD_NODE: (state, node) => {
    state.tree.push(node);
  },
  ADD_VIEWER_ELEMENT: (state, viewerElement) => {
    state.viewerLayout.push(viewerElement);
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


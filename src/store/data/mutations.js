export default {
  ADD_NODE: (state, node) => {
    state.tree.push(node);
  },
  ADD_VIEWER_ELEMENT: (state, { main, type, data }) => {
    // if first, than main
    if (state.lastViewerId === 0) {
      main = true;
    // if new main, every before is false
    } else if (main === true) {
      state.viewerLayout.forEach((viewer) => { viewer.main = false; });
    }

    state.lastViewerId += 1;
    state.viewerLayout.push({
      idx: state.lastViewerId,
      main,
      type,
      data,
    });
  },
  SET_MAIN_VIEWER: (state, idx) => {
    state.viewerLayout.forEach((viewer) => { viewer.main = viewer.idx === idx; });
  },
  /*
  ADD_STATUS: (state, status) => {
    state.status.push(status);
  },
  */
  SET_LEAF_SELECTED: (state, leafSelected) => {
    state.leafSelected = leafSelected;
  },
};


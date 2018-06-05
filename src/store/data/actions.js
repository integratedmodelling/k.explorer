export default {
  addNode: ({ commit }, node) => {
    commit('ADD_NODE', node);
  },
  addViewerElement: ({ commit }, { main = false, type, data }) => {
    commit('ADD_VIEWER_ELEMENT', { main, type, data });
  },
  setMainViewer: ({ commit }, idx) => {
    commit('SET_MAIN_VIEWER', idx);
  },
  /*
  setMain: ({ commit }, element) => {

  },
  */
  /*
  addStatus: ({ commit }, status) => {
    commit('ADD_STATUS', status);
  },
  */
  setLeafSelected: ({ commit, state }, leafSelected) => {
    commit('SET_LEAF_SELECTED', leafSelected);
    let find;
    // eslint-disable-next-line no-cond-assign
    if ((find = state.viewerLayout.find(viewer =>
      viewer.data.label === leafSelected.label)) !== undefined) {
      commit('SET_MAIN_VIEWER', find.idx);
    }
  },
};

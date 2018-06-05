export default {
  addNode: ({ commit }, node) => {
    commit('ADD_NODE', node);
  },
  addViewerElement: ({ commit }, element) => {
    commit('ADD_VIEWER_ELEMENT', element);
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
  setSelected: ({ commit }, selected) => {
    commit('SET_SELECTED', selected);
  },
};

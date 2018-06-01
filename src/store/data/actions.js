export default {
  addNode: ({ commit }, node) => {
    commit('ADD_NODE', node);
  },
  addSaved: ({ commit }, saved) => {
    commit('ADD_SAVED', saved);
  },
  /*
  addStatus: ({ commit }, status) => {
    commit('ADD_STATUS', status);
  },
  */
  setSelected: ({ commit }, selected) => {
    commit('SET_SELECTED', selected);
  },
};

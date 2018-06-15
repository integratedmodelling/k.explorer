import Constants from 'shared/Constants';

export default {
  setContext: ({ commit, dispatch }, context) => {
    // is better reset everything, I start with default
    // if (state.context !== null) {
    dispatch('resetContext');
    // }
    commit('SET_CONTEXT', context);
    dispatch('view/setContextLayer', context, { root: true });
    dispatch('addViewerElement', {
      main: true,
      type: Constants.VIEW_MAP,
      data: context,
    });
  },

  resetContext: ({ commit }) => {
    commit('RESET_CONTEXT');
  },

  addNode: ({ commit, getters }, node) => {
    // TODO algorithm to decide if new viewer
    commit('ADD_NODE', {
      ...node,
      viewerIdx: getters.lastViewerId,
    });
  },

  addViewerElement: ({ commit }, { main = false, type, data }) => {
    commit('ADD_VIEWER_ELEMENT', { main, type, data });
  },

  setMainViewer: ({ commit }, idx) => {
    commit('SET_MAIN_VIEWER', idx);
  },

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

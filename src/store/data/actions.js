import Constants from 'shared/Constants';

export default {
  /**
   * Set the context for this session.
   * If context doesn't exists, a map with a default context is shown.
   * Every change of map size or position is sended to engine
   * In one moment, only one context can exists
   * @param context the temporal or spatial context
   */
  setContext: ({ commit, dispatch }, context) => {
    // is better reset everything, I start with default
    // here tree, viewers and everything related is deleted
    commit('RESET_CONTEXT');
    // set new context
    commit('SET_CONTEXT', context);

    dispatch('view/setContextLayer', context, { root: true });
    dispatch('view/addViewerElement', {
      main: true,
      type: Constants.VIEW_MAP,
      data: context,
    }, { root: true });
  },

  addToTree: ({ commit, dispatch }, node) => {
    dispatch('view/assignViewer', node, { root: true }).then((response) => {
      commit('ADD_NODE', {
        ...node,
        viewerIdx: response,
      });
    });
  },

  setLeafSelected: ({ commit, dispatch }, leafSelected) => {
    commit('SET_LEAF_SELECTED', leafSelected);
    dispatch('view/changeViewer', leafSelected.viewerIdx, { root: true });
  },
};

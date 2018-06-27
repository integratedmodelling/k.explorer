import axios from 'axios';
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
    // If set context, everything is resetted
    // set new context
    commit('SET_CONTEXT', context);
    dispatch('view/setContextLayer', context, { root: true });
  },

  addToTree: ({ commit, dispatch }, { node, folderId = null }) => {
    let needSiblings = false;
    // first assign a viewer, then use viewer idx to select it
    dispatch('view/assignViewer', { observation: node }, { root: true }).then((viewerIdx) => {
      if (node.siblingCount > 1 && folderId === null) {
        // create folder
        folderId = Math.floor(Date.now() / 1000);
        commit('ADD_NODE', {
          id: folderId,
          parentId: node.parentId,
          label: `${node.observable} folder`,
          siblingCount: 1,
          type: Constants.TREE_FOLDER,
          folderId: null,
          folderName: null,
          children: [],
          siblings: [],
        });
        // ask for siblings if needed
        needSiblings = true;
      }
      commit('ADD_NODE', {
        ...node,
        folderId,
        children: [], // children are added using this method
        viewerIdx,
      });
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          dispatch('addToTree', { node: child });
        });
      }
      if (needSiblings) {
        dispatch('askForSiblings', { node, folderId });
      }
    });
  },

  askForSiblings({ dispatch }, { node, folderId }) {
    axios.get(`${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}siblings/${node.id}`, {
      params: {
        count: -1,
        offset: 0,
        childLevel: -1,
      },
    })
      .then(({ data }) => {
        if (data && data.siblingCount > 1 && data.siblings) {
          data.siblings.forEach((sibling) => {
            dispatch('addToTree', {
              node: sibling,
              folderId,
            });
          });
        }
      });
  },

  setLeafSelected: ({ commit, dispatch }, leafSelected) => {
    commit('SET_LEAF_SELECTED', leafSelected);
    dispatch('view/setVisible', leafSelected.id, { root: true });
    dispatch('view/setMainViewer', leafSelected.viewerIdx, { root: true });
  },
};

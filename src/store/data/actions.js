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

  /**
   * Add an observation do this:
   * Add observation to store.observations
   * Assign a viewer for observation
   * Add observation to tree
   * If there are siblings, add folder to tree and ask for them
   * If there are childrens, ask for them and repeat operation
   * @param observation observation to add
   * @param folderId if null and has siblings, we must ask for them,
   * else parentId is folderId
   */
  addObservation: ({ commit, dispatch }, {
    observation,
    folderId = null,
    noTree = false,
    main = false,
  }) => {
    // assign viewer
    dispatch('view/assignViewer', { observation, main }, { root: true }).then((viewerIdx) => {
      observation.viewerIdx = viewerIdx;
      observation.visible = false;
      // add observation
      commit('ADD_OBSERVATION', observation);
      if (noTree) {
        return;
      }
      let needSiblings = false;
      if (observation.siblingCount > 1 && folderId === null) {
        // if has siblings, create folder and ask for them
        folderId = Math.floor(Date.now() / 1000); // TODO better name
        commit('ADD_NODE', {
          node: {
            id: folderId,
            label: `${observation.observable} folder`,
            type: Constants.TREE_FOLDER,
            children: [],
            noTick: true,
            // tickStrategy: 'leaf',
          },
          parentId: observation.parentId,
        });
        needSiblings = true;
      }
      // add node to tree
      commit('ADD_NODE', {
        node: {
          id: observation.id,
          label: observation.literalValue || observation.label,
          type: observation.shapeType,
          viewerIdx: observation.viewerIdx,
          children: [],
          noTick: observation.literalValue !== null,
        },
        parentId: folderId === null ? observation.parentId : folderId,
      });
      // asj for children
      if (observation.children.length > 0) {
        observation.children.forEach((child) => {
          dispatch('addObservation', { observation: child });
        });
      }
      // ask for siblings
      if (needSiblings) {
        dispatch('askForSiblings', { node: observation, folderId });
      }
    });
  },

  addToTree: ({ commit }, { node, parentId }) => {
    commit('ADD_NODE', {
      node: {
        id: node.id,
        label: node.label,
        type: node.shapeType || node.type,
        children: [], // children are added using this method
        viewerIdx: node.viewerIdx,
      },
      parentId,
    });
  },

  askForSiblings({ dispatch /* , getters */ }, { node, folderId }) {
    axios.get(`${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}siblings/${node.id}`, {
      params: {
        count: -1,
        offset: 0,
        childLevel: -1,
      },
      /*
      headers: {
        'WWW-Authenticate': getters.session,
        'Access-Control-Allow-Origin': '*',
      },
      */
    })
      .then(({ data }) => {
        if (data && data.siblingCount > 1 && data.siblings) {
          data.siblings.forEach((sibling) => {
            dispatch('addObservation', {
              observation: sibling,
              folderId,
            });
          });
        }
      });
  },

  updateNodes: ({ commit, dispatch }, { newValues, oldValues }) => {
    if (oldValues.length > newValues.length) {
      const removed = oldValues.filter(n => newValues.indexOf(n) < 0);
      if (removed.length === 1) {
        commit('SET_VISIBLE', { id: removed[0], visible: false });
      } else {
        console.error(`Length of removed is strange: ${removed.length}`);
      }
    } else {
      const { [newValues.length - 1]: added } = newValues;
      commit('SET_VISIBLE', {
        id: added,
        visible: true,
        callback: (observation) => {
          dispatch('view/setMainViewer', observation.viewerIdx, { root: true });
        },
      });
    }
  },
};

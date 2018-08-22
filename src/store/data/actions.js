import { axiosInstance } from 'plugins/axios';
import { Constants, Helpers } from 'shared/Helpers';

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

  resetContext: ({ commit, dispatch }) => {
    commit('SET_CONTEXT', null);
    dispatch('view/resetContextLayer', null, { root: true });
    dispatch('data/addObservation', {
      observation: Helpers.OBSERVATION_DEFAULT,
      main: true,
    }, { root: true });
  },

  /**
   * Add an observation do this:
   * Add observation to store.observations
   * Assign a viewer for observation
   * Add observation to tree
   * If there are siblings, add folder to tree and ask for them
   * If there are childrens, ask for them and repeat operation
   * @param observation observation to add
   * @param folderId if null and has siblings, we must ask for them, else parentId is folderId
   * @param fake if set to true, observation is fake, used when start without context
   * and the default center point is used in map
   * @main if true, indicate that this observation set his viewer as main
   */
  addObservation: ({ commit, state, dispatch }, {
    observation,
    folderId = null,
    main = false,
  }) => new Promise((resolve) => {
    const self = Helpers.findNodeById(state.tree, observation.id);
    if (self !== null) {
      dispatch('view/pushLogAction', {
        type: Constants.TYPE_WARN,
        payload: 'Observation exists in tree',
      }, { root: true });
      console.warn(`Observation with id ${observation.id} exists in actual context`);
      return resolve();
    }

    dispatch('view/assignViewer', { observation, main }, { root: true }).then((viewerIdx) => {
      observation.viewerIdx = viewerIdx;
      observation.visible = false;
      observation.top = false;
      observation.zIndex = 0;
      // add observation
      commit('ADD_OBSERVATION', observation);
      if (observation.observationType === Constants.OBSTYP_INITIAL) {
        return resolve();
      }
      let needSiblings = false;
      if (observation.siblingCount > 1 && folderId === null) {
        // if has siblings, create folder and ask for them
        folderId = `f${Math.floor(Date.now() / 1000)}`; // TODO better name
        commit('ADD_NODE', {
          node: {
            id: folderId,
            label: `${observation.observable} folder`,
            type: Constants.GEOMTYP_FOLDER,
            header: 'folder',
            siblingCount: observation.siblingCount,
            siblingAsked: 0,
            children: [],
          },
          parentId: observation.parentId,
        });
        needSiblings = true;
      }
      // ask for children
      if (observation.children.length > 0) {
        observation.children.forEach((child) => {
          dispatch('addObservation', { observation: child });
        });
      }
      commit('ADD_NODE', {
        node: {
          id: observation.id,
          label: observation.literalValue || observation.label,
          type: observation.shapeType,
          viewerIdx: observation.viewerIdx,
          children: [],
          tickable: observation.viewerIdx !== null && !observation.empty,
          disabled: observation.empty,
          actions: observation.actions,
          header: 'default',
          folderId,
        },
        parentId: folderId === null ? observation.parentId : folderId,
      });
      // ask for siblings
      if (needSiblings) {
        dispatch('askForSiblings', {
          nodeId: observation.id,
          folderId,
          offset: 0,
          count: Constants.SIBLINGS_TO_ASK_FOR,
        });
      }
      return resolve();
    });
    return null;
  }),

  askForSiblings: ({ commit, dispatch /* , getters */ }, {
    nodeId,
    folderId,
    offset = 0,
    count = Constants.SIBLINGS_TO_ASK_FOR,
  }) => new Promise((resolve) => {
    console.log(`Ask for sibling of node ${nodeId} in folder ${folderId}: count:${count} / offset ${offset}`);
    axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}siblings/${nodeId}`, {
      params: {
        count,
        offset,
        childLevel: -1,
      },
    })
      .then(({ data }) => {
        if (data && data.siblingCount > 1 && data.siblings) {
          console.warn('SPINNER LOADING');
          dispatch('view/setSpinner', { ...Constants.SPINNER_LOADING, owner: nodeId }, { root: true }).then(() => {
            data.siblings.forEach((sibling, index, array) => {
              dispatch('addObservation', {
                observation: sibling,
                folderId,
              }).then(() => {
                if (index === array.length - 1) {
                  // last element
                  commit('ADD_LAST', {
                    folderId,
                    observationId: sibling.id,
                    offsetToAdd: data.siblings.length,
                    total: data.siblingCount,
                  });
                  dispatch('view/setSpinner', { ...Constants.SPINNER_STOPPED, owner: nodeId }, { root: true });
                  console.warn('SPINNER STOPPED');
                }
              });
            });
          });
        }
        resolve();
      });
  }),
  /**
   * Hide a node in a tree, this hide the relative layer too
   * This will be in view?
   * @param nodeId
   */
  hideNode: ({ commit }, nodeId) => {
    commit('SET_VISIBLE', { id: nodeId, visible: false });
  },

  /**
   * Show a node in a tree, this show the relative layer too
   * This will be in view?
   * @param nodeId
   */
  showNode: ({ commit, dispatch }, { nodeId, selectMainViewer = false }) => {
    commit('SET_VISIBLE', {
      id: nodeId,
      visible: true,
      callback: selectMainViewer ? (observation) => {
        dispatch('view/setMainViewer', observation.viewerIdx, { root: true });
      } : null,
    });
  },

  selectNode: ({ dispatch, state }, selectedId) => {
    const selectedObservation = state.observations.find(observation => observation.id === selectedId);
    if (selectedObservation && selectedObservation.visible && !selectedObservation.top) {
      dispatch('showNode', { nodeId: selectedId });
    }
  },

  storeSearchResult({ commit }, results) {
    commit('STORE_RAW_SEARCH_RESULT', results);
  },

  deleteSearchResult({ commit }, { contextId, requestId }) {
    commit('DELETE_SEARCH_RESULT', { contextId, requestId });
  },

};

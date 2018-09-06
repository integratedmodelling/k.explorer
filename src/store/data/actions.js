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

  resetContext: ({ commit, dispatch, state }) => {
    if (state.context !== null) {
      commit('SET_CONTEXT', null);
      dispatch('view/resetContextLayer', null, { root: true });
      dispatch('data/addObservation', {
        observation: Helpers.OBSERVATION_DEFAULT,
        main: true,
      }, { root: true });
    } else {
      console.warn('Try to reset null context');
    }
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
   * @param main indicate if is main viewer
   * @param toTree indicate if observation will be added to tree
   * @param visible visibility
   * @main if true, indicate that this observation set his viewer as main
   */
  addObservation: ({ commit, state, dispatch }, {
    observation,
    folderId = null,
    main = false,
    toTree = true,
    visible = false,
  }) => new Promise((resolve) => {
    const existingObservation = state.observations.find(obs => obs.id === observation.id);
    if (typeof existingObservation !== 'undefined') { // observation exists in observations but in tree?
      existingObservation.main = observation.main; // is possible that main was changed to true
      if (existingObservation.main && existingObservation.folderId !== null && existingObservation.folderId.indexOf('ff_') === 0) {
        // is a main observations in a fake folder, so if main is true we need to translate value to folder
        const folder = Helpers.findNodeById(state.tree, existingObservation.folderId);
        folder.main = true;
        existingObservation.main = false;
      }
      // check if observation is in tree or is a lazy tree node
      const self = Helpers.findNodeById(state.tree, observation.id);
      if (self !== null) {
        // if is in tree, I update main attribute
        self.main = existingObservation.main;
      } else {
        // create a new node using existingObservation (observation gain a lot of attribute in her first time)
        commit('ADD_NODE', Helpers.getNodeFromObservation(existingObservation));
      }
      return resolve();
    }

    dispatch('view/assignViewer', { observation, main }, { root: true }).then((viewerIdx) => {
      observation.viewerIdx = viewerIdx;
      observation.visible = visible;
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
        // fake folder id is ff_[time]
        folderId = `ff_${Math.floor(Date.now() / 1000)}`;
        commit('ADD_NODE', {
          node: {
            id: folderId,
            label: `${observation.observable} folder`,
            type: Constants.GEOMTYP_FOLDER,
            header: 'folder',
            siblingCount: observation.siblingCount,
            siblingsLoaded: 1,
            children: [],
            main: observation.main,
          },
          parentId: observation.parentId,
        });
        needSiblings = true;
      }
      observation.folderId = folderId;
      // ask for children
      if (observation.children.length > 0) {
        observation.children.forEach((child) => {
          dispatch('addObservation', { observation: child, toTree });
        });
      }
      // ask for siblings
      if (needSiblings) {
        dispatch('askForSiblings', {
          nodeId: observation.id,
          folderId,
          offset: 0,
          count: Constants.SIBLINGS_TO_ASK_FOR,
        });
      }
      if (toTree) {
        commit('ADD_NODE', Helpers.getNodeFromObservation(observation));
      }
      return resolve();
    });
    return null;
  }),

  /**
   * When a task finish, we need to check the internal hierarchy of observations
   * @param taskId task to check
   */
  recalculateTree: ({ commit }, taskId) => {
    if (typeof taskId === 'undefined' || taskId === null) {
      throw new Error(`Try to recalculate tree with a not existing task id: ${taskId}`);
    }
    return new Promise((resolve) => {
      commit('RECALCULATE_TREE', taskId);
      resolve();
    });
  },

  askForSiblings: ({ commit, dispatch, state /* , getters */ }, {
    nodeId,
    folderId,
    offset = 0,
    count = Constants.SIBLINGS_TO_ASK_FOR,
    toTree = true,
    visible = false,
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
          dispatch('view/setSpinner', { ...Constants.SPINNER_LOADING, owner: nodeId }, { root: true }).then(() => {
            if (data.siblings && data.siblings.length > 0) {
              data.siblings.forEach((sibling, index, array) => {
                dispatch('addObservation', {
                  observation: sibling,
                  folderId,
                  toTree,
                  visible,
                }).then(() => {
                  if (index === array.length - 1) {
                    // last element
                    if (toTree) {
                      commit('ADD_LAST', {
                        folderId,
                        observationId: sibling.id,
                        offsetToAdd: data.siblings.length,
                        total: data.siblingCount,
                      });
                    }
                    dispatch('view/setSpinner', { ...Constants.SPINNER_STOPPED, owner: nodeId }, { root: true });
                    resolve();
                  }
                });
              });
              const folder = Helpers.findNodeById(state.tree, folderId);
              if (folder !== null) {
                folder.siblingsLoaded += data.siblings.length;
              }
              /* TODO ask to Ferdinando: task id for REST?
              dispatch('data/recalculateTree', data.siblings[0].taskId, { root: true }).then(() => {
                dispatch('view/setSpinner', { ...Constants.SPINNER_STOPPED, owner: data.siblings[0].taskId }, { root: true });
              });
              */
            }
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

  /**
   * Apply a visibility to all folder (all observation yet not in tree)
   * @param folderId folder to change visibility
   * @param visible hide (false) or show (true)
   */
  setFolderVisibility: ({ commit, dispatch }, { folderId, visible, selectMainViewer = false }) => {
    commit('SET_FOLDER_VISIBLE', {
      folderId,
      visible,
      callback: visible && selectMainViewer ? (observation) => {
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

};

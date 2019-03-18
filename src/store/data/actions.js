import { axiosInstance } from 'plugins/axios';
import { Constants, Helpers } from 'shared/Helpers';

export default {
  /**
   * Set the context for this session.
   * If context doesn't exists, a map with a default context is shown.
   * Every change of map size or position is sent to engine
   * In one moment, only one context can exists
   * @param context the temporal or spatial context
   */
  setContext: ({ commit, getters, dispatch }, context) => {
    // If set context, everything is resetted
    // set new context
    if (getters.context !== null && getters.context.id === context.id) {
      return;
    }
    commit('SET_CONTEXT', context);
    dispatch('view/setContextLayer', context, { root: true });
  },

  resetContext: ({ commit, dispatch, state, getters }) => {
    if (getters.context !== null) {
      commit('SET_CONTEXT', null);
      dispatch('getSessionContexts');
      dispatch('view/resetContext', null, { root: true });
      if (state.waitingForReset !== null) {
        dispatch('loadContext', state.waitingForReset);
        state.waitingForReset = null;
      } else {
        dispatch('addObservation', {
          observation: Helpers.OBSERVATION_DEFAULT,
          main: true,
        });
      }
    } else {
      console.warn('Try to reset null context');
    }
  },

  setWaitinForReset: ({ commit }, contextId = null) => {
    commit('WAITING_FOR_RESET', contextId);
  },

  loadContext: ({ commit, dispatch }, contextId) => {
    console.info(`Ask for context to restore ${contextId}`);
    axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}describe/${contextId}`, {
      params: {
        collapseSiblings: true,
      },
    }).then(async ({ data: context }) => {
      context.restored = true;
      // remove children so no reactive observations are loaded
      await dispatch('setContext', { ...context, children: [] });
      commit('view/SET_RELOAD_DATAFLOW', true, { root: true }); // if we have context, we have dataflow
      console.debug(`Context received: \n${JSON.stringify(context, null, 2)}`);
      // console.dir(context);
      if (context.children.length > 0) {
        const tasks = [];
        const observations = context.children;
        observations.forEach((observation) => {
          if (observation.taskId !== null) {
            if (tasks.indexOf(observation.taskId) === -1) {
              tasks.push(observation.taskId);
            }
            dispatch('addObservation', { observation, restored: true });
          }
        });

        await Promise.all(tasks); // await for all observation to add
        if (tasks !== null) {
          tasks.forEach((taskId) => {
            dispatch('recalculateTree', { taskId, fromTask: false });
          });
        }
      }
      dispatch('view/setSpinner', { ...Constants.SPINNER_STOPPED, owner: contextId }, { root: true }); // when loadContext is call, spinner will be started
    }).catch((error) => {
      dispatch('view/setSpinner', {
        ...Constants.SPINNER_ERROR,
        owner: contextId,
        errorMessage: error,
      }, { root: true });
      throw error;
    });
  },

  getSessionContexts: ({ getters, commit }) => new Promise((resolve, reject) => {
    if (getters.session === null) {
      reject(new Error('No session established, no useful engine available, disconnect'));
      return;
    }
    const url = `${process.env.WS_BASE_URL}${process.env.REST_STATUS}`;
    Helpers.getAxiosContent(getters.session, url, {
      transformRequest: [
        (data, headers) => {
          // we need to delete because we inherited it
          // the problem is with Spring JSESSION cookie, it seems
          // better to do this that change a lot of things to
          // stop spring to generate its session id
          delete headers.common.Authorization;
          return data;
        },
      ],
    }, ({ data }, finalCallback) => {
      console.debug(`Contexts history:\n${JSON.stringify(data, null, 4)}`);
      if (data && data.sessions && data.sessions.length > 0) {
        const session = data.sessions.find(s => s.id === getters.session);
        if (typeof session !== 'undefined') {
          const { rootObservations } = session;
          if (rootObservations !== null && !(Object.keys(rootObservations).length === 0 && rootObservations.constructor === Object)) {
            console.debug(`Find ${Object.keys(rootObservations).length} root observations for this session`);
            let counter = 0;
            Object.entries(rootObservations).forEach(([contextId, context]) => {
              commit('STORE_CONTEXT', context);
              console.debug(`Stored context with id ${contextId}`);
              counter += 1;
            });
            resolve(counter);
          } else {
            console.debug('No root observation founded');
            resolve(0);
          }
        } else {
          console.warn(`No information for session ${getters.session}, isn't valid session?`);
          reject(new Error(`No information for session ${getters.session}, disconnect`));
        }
      }
      finalCallback();
    });
  }),

  //  restoreSession: () => {
  /*
      console.log(`Ask for context to restore ${contextId}`);
      axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}describe/${contextId}`, {})
        .then(({ data: context }) => {
          dispatch('setContext', context);
          /*
          if (state.orphans.length > 0) {
            for (let i = state.orphans.length - 1; i >= 0; i--) {
              if (Helpers.findNodeById(state.tree, state.orphans[i].id) !== null) {
                state.orphans.splice(i, 1);
              }
              if (state.orphans[i].parentId === context.id
                  || Helpers.findNodeById(state.tree, state.orphans[i].parentId) !== null) {
                dispatch('addObservation', { observation: state.orphans.splice(i, 1) });
              }
            }
          }
          *
        });
      */
  // },

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
    restored = false,
  }) => new Promise((resolve) => {
    const existingObservation = state.observations.find(obs => obs.id === observation.id);
    if (typeof existingObservation !== 'undefined') { // observation exists in observations but in tree?
      existingObservation.main = observation.main; // is possible that main was changed to true
      // If a complex model that isn't completely calculate is part of a reloaded context, the main observation
      // is notified but not still calculate. We need to check if previouslyNotified change from false to true
      // TODO engine must doesn't send it
      existingObservation.notified = existingObservation.notified || observation.previouslyNotified;
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
      observation.layerOpacity = 1;
      observation.colormap = null;
      observation.folderId = folderId;
      // add observation. Children attribute is override to prevent reactivity on then
      commit('ADD_OBSERVATION', { observation: { ...observation, children: [] }, restored });
      if (observation.observationType === Constants.OBSTYP_INITIAL) {
        // is default observation, nothing needed
        return resolve();
      }
      let needSiblings = false;
      if (observation.siblingCount > 1 && folderId === null) {
        // if has siblings, create folder and ask for them
        // fake folder id is ff_[id of observation with siblings]
        folderId = `ff_${observation.id}`;
        observation.folderId = folderId;
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
            rootContextId: observation.rootContextId,
            notified: observation.notified || observation.previouslyNotified,
            exportFormats: observation.empty ? undefined : observation.exportFormats,
            firstChildId: observation.id,
          },
          parentId: observation.parentId,
        });
        needSiblings = true;
      }
      // ask for children
      if (observation.children.length > 0) {
        observation.disabled = false; // if is empty but has children, cannot be disabled
        observation.children.forEach((child) => {
          dispatch('addObservation', { observation: child, toTree });
        });
      }
      // ask for siblings
      if (needSiblings) {
        dispatch('askForSiblings', {
          nodeId: observation.id,
          notified: observation.notified || observation.previouslyNotified,
          folderId,
          offset: 0,
          count: state.siblingsToAskFor,
        });
      }
      if (toTree) {
        commit('ADD_NODE', Helpers.getNodeFromObservation(observation));
      }
      dispatch('view/setReloadReport', true, { root: true });
      return resolve();
    });
    return null;
  }),

  /**
   * When a task finish, we need to check the internal hierarchy of observations
   * @param taskId task to check
   */
  recalculateTree: ({ commit }, { taskId, fromTask }) => {
    if (typeof taskId === 'undefined' || taskId === null) {
      throw new Error(`Try to recalculate tree with a not existing task id: ${taskId}`);
    }
    return new Promise((resolve) => {
      commit('RECALCULATE_TREE', { taskId, fromTask });
      resolve();
    });
  },

  askForSiblings: ({ commit, dispatch, state /* , getters */ }, {
    nodeId,
    folderId,
    offset = 0,
    count = state.siblingsToAskFor,
    toTree = true,
    visible = false,
    notified = true,
  }) => new Promise((resolve) => {
    console.debug(`Ask for sibling of node ${nodeId} in folder ${folderId}: count:${count} / offset ${offset}`);
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
                sibling.notified = notified;
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
        dispatch('view/setMainDataViewer', observation.viewerIdx, { root: true });
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
        dispatch('view/setMainDataViewer', observation.viewerIdx, { root: true });
      } : null,
    });
  },

  selectNode: ({ dispatch, state }, selectedId) => {
    if (selectedId === null) {
      dispatch('view/setObservationInfo', null, { root: true });
    } else {
      const selectedObservation = state.observations.find(observation => observation.id === selectedId);
      if (selectedObservation) {
        if (selectedObservation.visible && !selectedObservation.top) {
          dispatch('showNode', { nodeId: selectedId });
        }
        dispatch('view/setObservationInfo', selectedObservation, { root: true });
      }
    }
  },

  addDataflow: ({ commit }, dataflow) => {
    if (typeof dataflow === 'undefined' || dataflow === null) {
      console.warn('Try to layout an empty ELK dataflow');
    } else {
      commit('ADD_DATAFLOW', dataflow);
      commit('view/SET_RELOAD_DATAFLOW', true, { root: true });
    }
  },

  setDataflowStatus: ({ commit }, { id, status }) => {
    commit('SET_DATAFLOW_STATUS', { id, status });
  },

  storeSearchResult: ({ commit }, results) => {
    commit('STORE_RAW_SEARCH_RESULT', results);
  },

  setScaleReference: ({ commit }, scaleReference) => {
    console.debug(`Set scale reference: ${JSON.stringify(scaleReference, null, 2)}`);
    commit('SET_SCALE_REFERENCE', scaleReference);
    commit('SET_SCALE_LOCKED', { scaleType: 'all', scaleLocked: false });
  },

  updateScaleReference: ({ commit }, { type, resolution, unit }) => {
    console.debug(`Update scale reference: ${type}: ${resolution} ${unit}`);
    commit('UPDATE_SCALE_REFERENCE', { type, resolution, unit });
  },

  setScaleLocked: ({ commit }, { scaleType, scaleLocked }) => {
    commit('SET_SCALE_LOCKED', { scaleType, scaleLocked });
  },

  setInteractiveMode: ({ commit }, value) => {
    commit('SET_INTERACTIVE_MODE', value);
  },
};

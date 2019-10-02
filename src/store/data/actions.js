import { axiosInstance } from 'plugins/axios';
import { findNodeById, getAxiosContent, getNodeFromObservation } from 'shared/Helpers';
import { MESSAGE_TYPES, OBSERVATION_CONSTANTS, SPINNER_CONSTANTS, OBSERVATION_DEFAULT } from 'shared/Constants';

export default {
  /**
   * Set the context for this session.
   * If context doesn't exists, a map with a default context is shown.
   * Every change of map size or position is sent to engine
   * In one moment, only one context can exists
   * @param context the temporal or spatial context
   */
  setContext: ({ commit, getters, dispatch }, { context, isRecontext }) => {
    // If set context, everything is resetted
    // set new context
    if (getters.context !== null && getters.context.id === context.id) {
      return;
    }
    commit('SET_CONTEXT', { context, isRecontext });
    if (isRecontext) {
      dispatch('view/resetContext', null, { root: true });
    }
    dispatch('view/setContextLayer', context, { root: true });
  },

  resetContext: ({ commit, dispatch, state, getters }) => {
    if (getters.context !== null) {
      commit('SET_CONTEXT', {});
      dispatch('getSessionContexts');
      dispatch('view/resetContext', null, { root: true });
      if (state.waitingForReset !== null) {
        dispatch('loadContext', state.waitingForReset);
        state.waitingForReset = null;
      } else {
        dispatch('addObservation', {
          observation: OBSERVATION_DEFAULT,
          main: true,
        });
      }
      dispatch('view/addToKlabLog', { type: MESSAGE_TYPES.TYPE_INFO, payload: { message: 'Context reset', separator: true } }, { root: true });
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
        childLevel: 1,
      },
    }).then(async ({ data: context }) => {
      context.restored = true;
      // remove children so no reactive observations are loaded
      await dispatch('setContext', { context: { ...context, children: [] } });
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
        /*
        if (tasks !== null) {
          tasks.forEach((taskId) => {
            dispatch('recalculateTree', { taskId, fromTask: false });
          });
        }
        */
      }
      dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_STOPPED, owner: contextId }, { root: true }); // when loadContext is call, spinner will be started
    }).catch((error) => {
      dispatch('view/setSpinner', {
        ...SPINNER_CONSTANTS.SPINNER_ERROR,
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
    getAxiosContent(getters.session, url, {
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

  addObservation: ({ commit, state, dispatch }, {
    observation,
    toTree = true,
    visible = false,
    restored = false,
  }) => new Promise((resolve/* , reject */) => {
    const existingObservation = state.observations.find(obs => obs.id === observation.id);
    if (typeof existingObservation !== 'undefined') {
      // console.error(`Observation exists!!! ${existingObservation.label}`);
      dispatch('view/addToKexplorerLog', {
        type: MESSAGE_TYPES.TYPE_WARNING,
        payload: {
          message: `Existing observation received: ${existingObservation.label}`,
        },
        important: true,
      }, { root: true });
      return resolve(); // reject(new Error(`Existing observation received: ${existingObservation.label}`));
    }
    dispatch('view/assignViewer', { observation }, { root: true }).then((viewerIdx) => {
      observation.viewerIdx = viewerIdx;
      observation.visible = visible;
      observation.top = false;
      observation.zIndex = 0;
      observation.layerOpacity = observation.layerOpacity || 1;
      observation.colormap = observation.colormap || null;
      observation.isContainer = observation.observationType === OBSERVATION_CONSTANTS.TYPE_GROUP || observation.observationType === OBSERVATION_CONSTANTS.TYPE_VIEW;
      observation.singleValue = observation.observationType === OBSERVATION_CONSTANTS.TYPE_STATE && observation.valueCount === 1;
      // add observation. Children attribute is override to prevent reactivity on then
      commit('ADD_OBSERVATION', { observation: { ...observation, children: [] }, restored });
      if (observation.observationType === OBSERVATION_CONSTANTS.TYPE_INITIAL) {
        // is default observation, nothing needed
        return resolve();
      }
      // ask for children
      if (observation.children.length > 0) {
        observation.disabled = false; // if is empty but has children, cannot be disabled
        observation.children.forEach((child) => {
          dispatch('addObservation', { observation: child });
        });
      }
      if (toTree) {
        const originalNode = getNodeFromObservation(observation);
        commit('ADD_NODE', originalNode);
        // if there are children, we put a STUB to force the arrow
        if (observation.childrenCount > 0 && observation.children.length === 0) { // we have children to ask, create a STUB
          const { node } = originalNode;
          commit('ADD_NODE', {
            node: {
              ...node,
              id: `STUB-${node.id}`,
              observable: '',
              label: '',
              children: [],
              childrenCount: 0,
              childrenLoaded: 0,
              siblingsCount: node.childrenCount,
              parentArtifactId: node.id,
              tickable: false,
              disabled: true,
              empty: true,
              actions: {},
              header: 'stub',
              main: false,
              isContainer: false,
              exportFormats: {},
              observationType: OBSERVATION_CONSTANTS.TYPE_INITIAL,
              noTick: true,
              parentId: node.id,
            },
            parentId: node.id,
          });
          commit('ADD_LAST', {
            parentId: node.id,
            observationId: `STUB-${node.id}`,
            offsetToAdd: 0,
            total: node.childrenCount,
          });
        }
      }
      dispatch('view/setReloadReport', true, { root: true });
      return resolve();
    });
    return null;
  }),

  askForChildren: ({ commit, dispatch, state /* , getters */ }, {
    parentId,
    total,
    offset = 0,
    count = state.childrenToAskFor, // if - we ask for all
    toTree = true, // indicate that we ask for siblings but we don't want to put them on tree (only for view on map)
    visible = false,
    notified = true,
  }) => new Promise((resolve) => {
    console.debug(`Ask for children of node ${parentId}: count:${count} / offset ${offset}`);
    axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}children/${parentId}`, {
      params: {
        count,
        offset,
      },
    })
      .then(({ data }) => {
        if (data && data.length > 0) {
          dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_LOADING, owner: parentId }, { root: true }).then(() => {
            data.forEach((child, index, array) => {
              child.notified = notified;
              child.siblingsCount = total; // the total of element for [INDEX] of [TOTAL]
              dispatch('addObservation', {
                observation: child,
                toTree,
                visible,
              }).then(() => {
                if (index === array.length - 1) {
                  if (toTree) {
                    // last element
                    commit('ADD_LAST', {
                      parentId,
                      observationId: child.id,
                      offsetToAdd: data.length,
                      total,
                    });
                  }
                  dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_STOPPED, owner: parentId }, { root: true });
                  resolve();
                }
              });
            });
            const setChildrenLoaded = (tree) => {
              const parent = findNodeById(tree, parentId);
              if (parent && parent !== null) {
                parent.childrenLoaded += data.length;
              }
            };
            setChildrenLoaded(state.tree);
            setChildrenLoaded(state.userTree);
          });
        }
        resolve();
      });
  }),

  /**
   * If we load children but we don't add to tree, we use the loaded observation to create the nodes
   */
  addChildrenToTree({ commit, state }, {
    parent,
    count = state.childrenToAskFor,
  }) {
    if (parent && parent !== null) {
      const parentObservations = state.observations.filter(obs => obs.parentArtifactId === parent.id || obs.parentId === parent.id);
      const total = parentObservations.length;
      const offset = parent.children.length;
      for (let i = offset, n = 0; i < total && n < count; i++, n++) {
        const child = parentObservations[i];
        commit('ADD_NODE', getNodeFromObservation(child));
        if (n === count - 1 || i === total - 1) {
          commit('ADD_LAST', {
            parentId: parent.id,
            observationId: child.id,
            offsetToAdd: n + 1,
            total: parent.childrenLoaded,
          });
        }
      }
    }
  },

  changeTreeOfNode({ commit, state }, { id, isUserTree }) {
    const node = findNodeById(state.tree, id);
    if (isUserTree) {
      if (findNodeById(state.userTree, id) === null) {
        commit('UPDATE_USER_NODE', { node, userNode: true });
        commit('ADD_NODE', { node, parentId: node.parentArtifactId || node.parentId, toUserTreeOnly: true });
      } else {
        console.warn(`Try to move to user tree an existing node: ${id}`);
      }
    } else {
      commit('UPDATE_USER_NODE', { node, userNode: false });
      commit('REMOVE_NODE', { id });
    }
  },
  /**
   * Show a node in a tree, this show the relative layer too or
   * apply a visibility to all folder (all observation yet not in tree) if isFolder is true
   * @param node node to change visibility
   * @param visible hide (false) or show (true)
   */
  setVisibility: ({ commit, dispatch, state }, { node, visible }) => {
    if (node.isContainer) {
      // check if is the first time
      if (node.childrenCount !== 0 && node.viewerIdx === null) {
        // ...try to bring the viewer info from the first children
        const observation = state.observations.find(o => o.parentArtifactId === node.id || o.parentId === node.id);
        if (typeof observation !== 'undefined') {
          const { viewerIdx, viewerType, zIndexOffset } = observation;
          node.viewerIdx = viewerIdx;
          node.viewerType = viewerType;
          node.zIndexOffset = zIndexOffset;
        } else {
          node.zIndexOffset = null;
        }
      }
      if (node.viewerIdx !== null) {
        dispatch('view/setMainDataViewer', {
          viewerIdx: node.viewerIdx,
          visible,
        }, { root: true });
      }
      commit('SET_FOLDER_VISIBLE', {
        nodeId: node.id,
        visible,
        zIndexOffset: node.zIndexOffset,
      });
    } else {
      dispatch('view/setMainDataViewer', {
        viewerIdx: node.viewerIdx,
        visible,
      }, { root: true });
      commit('SET_VISIBLE', {
        nodeId: node.id,
        visible,
      });
    }
  },

  selectNode: ({ dispatch, state }, selectedId) => {
    if (selectedId === null) {
      dispatch('view/setObservationInfo', null, { root: true });
    } else {
      const selectedObservation = state.observations.find(observation => observation.id === selectedId);
      if (selectedObservation) {
        if (selectedObservation.visible && !selectedObservation.top) {
          dispatch('setVisibility', { node: selectedObservation, visible: true });
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

  setDataflowInfo: ({ commit }, { id, html, rateable, rating, averageRating }) => {
    if (id !== null && id !== '') {
      const splitted = id.split('.');
      const elementId = splitted[splitted.length - 1];
      const elementTypes = splitted.slice(0, splitted.length - 1);
      commit('SET_DATAFLOW_INFO', {
        elementId,
        elementTypes,
        html,
        rateable,
        rating,
        averageRating,
      });
    }
  },

  storeSearchResult: ({ commit }, results) => {
    commit('STORE_RAW_SEARCH_RESULT', results);
  },

  setScaleReference: ({ commit }, scaleReference) => {
    console.debug(`Set scale reference: ${JSON.stringify(scaleReference, null, 2)}`);
    commit('SET_SCALE_REFERENCE', scaleReference);
    // commit('SET_SCALE_LOCKED', { scaleType: 'all', scaleLocked: false });
  },

  updateScaleReference: ({ commit }, { type, resolution, unit, next = false }) => {
    commit('UPDATE_SCALE_REFERENCE', { type, resolution, unit, next });
  },

  setScaleLocked: ({ commit }, { scaleType, scaleLocked }) => {
    commit('SET_SCALE_LOCKED', { scaleType, scaleLocked });
  },

  setInteractiveMode: ({ commit }, value) => {
    commit('SET_INTERACTIVE_MODE', value);
  },

  setCrossingIDL: ({ commit }, value) => {
    commit('SET_CROSSING_IDL', value);
  },
};

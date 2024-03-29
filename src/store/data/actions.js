import { axiosInstance } from 'plugins/axios';
import { findNodeById, getAxiosContent, getNodeFromObservation, sendStompMessage } from 'shared/Helpers';
import { CONSTANTS, MESSAGE_TYPES, OBSERVATION_CONSTANTS, SPINNER_CONSTANTS,
  OBSERVATION_DEFAULT, MODIFICATIONS_TYPE, TERMINAL_TYPES, DOCUMENTATION_TYPES } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import { IN, URLS } from 'shared/MessagesConstants';
import { getI18N } from 'plugins/vue-i18n';

export default {

  loadSessionReference: ({ commit }) => new Promise((resolve, reject) => {
    axiosInstance.get(`${process.env.WS_BASE_URL}${URLS.REST_SESSION_INFO}`, { maxRedirects: 0 })
      .then(({ data }) => {
        if (data) {
          commit('SET_SESSION_REFERENCE', data);
          resolve();
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // invalid session, stop all
          reject(new Error('Invalid session'));
        } else {
          reject(new Error(`Error retrieving session: ${error}`));
        }
      });
  }),
  /**
   * Set the context for this session.
   * If context doesn't exists, a map with a default context is shown.
   * Every change of map size or position is sent to engine
   * In one moment, only one context can exists
   * @param context the temporal or spatial context
   */
  setContext: (vuexContext, { context, isRecontext }) => {
    const { commit, getters, dispatch } = vuexContext;
    // If set context, everything is re-set
    // set new context
    if (getters.context !== null && getters.context.id === context.id) {
      return;
    }
    commit('SET_CONTEXT', { context, isRecontext });
    if (isRecontext) {
      dispatch('view/resetContext', null, { root: true });
    }
    dispatch('view/setContextLayer', context, { root: true });
    console.debug(`Send start watch context ${context.id}`);
    sendStompMessage(MESSAGES_BUILDERS.WATCH_REQUEST, { active: true, observationId: context.id, rootContextId: context.rootContextId });
  },

  resetContext: ({ commit, dispatch, state, getters }) => {
    const { context } = getters;
    if (context !== null) {
      const oldContext = { id: context.id, rootContextId: context.rootContextId };
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
      dispatch('view/addToKlabLog', { type: IN.TYPE_INFO, payload: { message: 'Context reset', separator: true } }, { root: true });
      console.debug(`Send stop watch context ${oldContext.id}`);
      sendStompMessage(MESSAGES_BUILDERS.WATCH_REQUEST, { active: false, observationId: oldContext.id, rootContextId: oldContext.rootContextId });
    } else {
      console.info('Try to reset null context, is initial reset?');
    }
  },

  setWaitinForReset: ({ commit }, contextId = null) => {
    commit('WAITING_FOR_RESET', contextId);
  },

  loadContext: ({ commit, dispatch }, contextId) => {
    console.info(`Ask for context to restore ${contextId}`);
    axiosInstance.get(`${process.env.WS_BASE_URL}${URLS.REST_SESSION_VIEW}describe/${contextId}`, {
      params: {
        childLevel: 1,
      },
    }).then(async ({ data: context }) => {
      context.restored = true;
      // remove children so no reactive observations are loaded
      await dispatch('setContext', { context: { ...context, children: [] } });
      commit('data/SET_RELOAD_FLOWCHART', { target: null }, { root: true }); // if we have context, we have dataflow
      console.debug(`Context received with id ${context.id}`);
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
    const url = `${process.env.WS_BASE_URL}${URLS.REST_STATUS}`;
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
            Object.entries(rootObservations).forEach((entry) => {
              commit('STORE_CONTEXT', entry[1]);
              // console.debug(`Stored context with id ${contextId}`);
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

  setContextCustomLabel: ({ commit }, contextCustomLabel) => {
    commit('SET_CONTEXT_CUSTOM_LABEL', contextCustomLabel);
  },

  addObservation: ({ commit, rootGetters, state, dispatch }, {
    observation,
    toTree = true,
    visible = false,
    restored = false,
    updated = false,
  }) => new Promise((resolve/* , reject */) => {
    const existingObservationIndex = state.observations.findIndex(obs => obs.id === observation.id);
    if (existingObservationIndex !== -1) {
      // console.error(`Observation exists!!! ${existingObservation.label}`);
      if (updated) {
        commit('UPDATE_OBSERVATION', {
          observationIndex: existingObservationIndex,
          newObservation: observation,
        });
        commit('UPDATE_TIME_EVENTS', observation);
        console.debug(`Observation$ ${observation.label} updated`);
      } else {
        dispatch('view/addToKexplorerLog', {
          type: MESSAGE_TYPES.TYPE_WARNING,
          payload: {
            message: `Existing observation received: ${observation.label}`,
          },
          important: true,
        }, { root: true });
      }
      return resolve(); // reject(new Error(`Existing observation received: ${existingObservation.label}`));
    }
    dispatch('view/assignViewer', { observation }, { root: true }).then((viewerIdx) => {
      observation.viewerIdx = viewerIdx;
      observation.visible = visible;
      observation.top = false;
      observation.zIndex = 0;
      observation.layerOpacity = observation.layerOpacity || 1;
      observation.colormap = observation.colormap || null;
      observation.tsImages = [];
      observation.isContainer = observation.observationType === OBSERVATION_CONSTANTS.TYPE_GROUP || observation.observationType === OBSERVATION_CONSTANTS.TYPE_VIEW;
      observation.singleValue = observation.observationType === OBSERVATION_CONSTANTS.TYPE_STATE && observation.valueCount === 1;
      observation.loading = false;
      observation.loaded = true; // change to false if is a raster
      if (observation.contextId === null) {
        const task = rootGetters['stomp/tasks'].find(t => observation.taskId.startsWith(t.id));
        if (task) {
          const { contextId } = task;
          observation.contextId = contextId;
        } else {
          observation.contextId = observation.rootContextId;
        }
      }

      // add observation. Children attribute is override to prevent reactivity on then
      commit('ADD_OBSERVATION', { observation: { ...observation, children: [] }, restored });
      commit('UPDATE_TIME_EVENTS', observation);
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
          dispatch('addStub', node);
        }
      }
      return resolve();
    });
    return null;
  }),

  updateObservation({ commit, dispatch, state }, { observationId, exportFormats }) {
    const observationIndex = state.observations.findIndex(obs => obs.id === observationId);
    if (observationIndex !== -1) {
      axiosInstance.get(`${process.env.WS_BASE_URL}${URLS.REST_SESSION_VIEW}describe/${observationId}`, {
        params: {
          childLevel: 0,
        },
      }).then(({ data: newObservation }) => {
        if (newObservation) {
          if (exportFormats) {
            newObservation.exportFormats = exportFormats;
          }
          commit('UPDATE_OBSERVATION', { observationIndex, newObservation });
          if (newObservation.childrenCount > 0) {
            // we need to update previous loaded children if there are someone and is not stub
            const { children } = findNodeById(state.tree, newObservation.id);
            let load = children.length > 0;
            if (load && children.length === 1) {
              load = !children[0].id.startsWith('STUB');
            }
            if (load) {
              dispatch('askForChildren', {
                parentId: observationId,
                count: Math.max(children.length, state.childrenToAskFor),
                total: newObservation.childrenCount,
                updated: true,
              });
            }
          }
        } else {
          console.warn(`Ask for update observation ${observationId} but nothing found in engine`);
        }
      });
    } else {
      console.warn(`Try to update a not existing observation: ${observationId}`);
    }
  },

  addStub: ({ commit }, node) => {
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
        dynamic: false,
        ...(node.userNode && { userNode: node.userNode }),
      },
      parentId: node.id,
    });
    commit('ADD_LAST', {
      parentId: node.id,
      observationId: `STUB-${node.id}`,
      offsetToAdd: 0,
      total: node.childrenCount,
    });
  },

  addKnowledgeView: ({ commit }, knowledgeView) => {
    commit('ADD_KNOWLEDGE_VIEW', knowledgeView);
  },

  showKnowledgeView: ({ commit }, knowledgeViewId) => {
    commit('SHOW_KNOWLEDGE_VIEW', knowledgeViewId);
  },

  addModificationEvent: ({ rootGetters, state, commit, dispatch }, modificationEvent) => {
    const node = findNodeById(state.tree, modificationEvent.id);
    if (node) {
      switch (modificationEvent.type) {
        case MODIFICATIONS_TYPE.BRING_FORWARD: {
          commit('MOD_BRING_FORWARD', node);
          dispatch('changeTreeOfNode', { id: modificationEvent.id, isUserTree: true });
          break;
        }
        case MODIFICATIONS_TYPE.VALUE_CHANGE:
          commit('MOD_VALUE_CHANGE', node);
          commit('ADD_TIME_EVENT', modificationEvent);
          if (state.modificationsTask === null) {
            dispatch('setModificationsTask', rootGetters['stomp/lastActiveTask']());
          }
          break;
        case MODIFICATIONS_TYPE.STRUCTURE_CHANGE:
          commit('MOD_STRUCTURE_CHANGE', { node, modificationEvent });
          if (node.childrenCount > 0 && node.children.length === 0) {
            dispatch('addStub', node);
          }
          break;
        case MODIFICATIONS_TYPE.CONTEXTUALIZATION_COMPLETED: {
          dispatch('updateObservation', { observationId: modificationEvent.id, exportFormats: modificationEvent.exportFormats });
          break;
        }
        default:
          console.warn(`Unknown modification event: ${modificationEvent.type}`);
          break;
      }
    } else if (modificationEvent.id !== modificationEvent.contextId) {
      console.debug('Modification event for a not existing node, probably still not loaded', modificationEvent);
    } else {
      console.debug('Modification event for context', modificationEvent);
    }
  },

  setModificationsTask({ commit }, task = null) {
    commit('SET_MODIFICATIONS_TASK', task);
  },

  /**
   * Set the timestamp rounding it to nearest integer
   */
  setTimestamp: ({ commit }, timestamp) => {
    if (timestamp && timestamp !== -1) {
      timestamp = Math.round(timestamp);
    }
    commit('SET_TIMESTAMP', timestamp);
  },

  setScheduling: ({ commit, getters }, scheduling) => {
    if (getters.context && scheduling.contextId === getters.context.id) {
      commit('SET_SCHEDULING_STATUS', scheduling);
    } else {
      console.debug(`Received a scheduling of other context: ${scheduling.contextId}`);
    }
  },

  askForChildren: ({ commit, dispatch, state /* , getters */ }, {
    parentId,
    total,
    offset = 0,
    count = state.childrenToAskFor, // if - we ask for all
    toTree = true, // indicate that we ask for siblings but we don't want to put them on tree (only for view on map)
    visible = false,
    notified = true,
    updated = false,
  }) => new Promise((resolve) => {
    console.debug(`Ask for children of node ${parentId}: count:${count} / offset ${offset}`);
    dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_LOADING, owner: parentId }, { root: true }).then(() => {
      axiosInstance.get(`${process.env.WS_BASE_URL}${URLS.REST_SESSION_VIEW}children/${parentId}`, {
        params: {
          count,
          offset,
        },
      })
        .then(({ data }) => {
          if (data && data.length > 0) {
            data.forEach((child, index, array) => {
              child.notified = notified;
              child.siblingsCount = total; // the total of element for [INDEX] of [TOTAL]
              dispatch('addObservation', {
                observation: child,
                toTree,
                visible,
                updated,
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
                  const setChildrenLoaded = (tree) => {
                    const parent = findNodeById(tree, parentId);
                    if (parent && parent !== null) {
                      parent.childrenLoaded += data.length;
                    }
                  };
                  setChildrenLoaded(state.tree);
                  setChildrenLoaded(state.userTree);
                  dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_STOPPED, owner: parentId }, { root: true });
                  resolve();
                }
              });
            });
          } else {
            dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_STOPPED, owner: parentId }, { root: true });
            resolve();
          }
        });
    });
  }),

  /**
   * If we load children but we don't add to tree, we use the loaded observation to create the nodes
   */
  addChildrenToTree({ dispatch, commit, state }, {
    parent,
    count = state.childrenToAskFor,
  }) {
    if (parent && parent !== null) {
      const parentObservations = state.observations.filter(obs => obs.parentArtifactId === parent.id || obs.parentId === parent.id);
      const total = parentObservations.length;
      const offset = parent.children.length;
      for (let i = offset, n = 0; i < total && n < count; i++, n++) {
        const child = parentObservations[i];
        const originalNode = getNodeFromObservation(child);
        commit('ADD_NODE', originalNode);
        // if there are children, we put a STUB to force the arrow
        if (child.childrenCount > 0 && child.children.length === 0) { // we have children to ask, create a STUB
          dispatch('addStub', originalNode.node);
        }
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
        console.warn(`Try to move to user tree an existing node: ${id} - ${node.label}`);
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
        id: node.id,
        visible,
      });
    }
  },

  putObservationOnTop: ({ commit }, id) => {
    commit('SET_VISIBLE', {
      id,
      visible: true,
    });
  },

  setContextMenuObservationId: ({ commit }, contextMenuObservationId) => {
    commit('SET_CONTEXTMENU_OBSERVATIONID', contextMenuObservationId);
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

  setLoadingLayers: ({ commit }, { loading, observation }) => {
    if (observation) {
      commit('SET_LOADING_LAYERS', { loading, observation });
    }
  },

  loadFlowchart: ({ commit, getters }, target = CONSTANTS.GRAPH_DATAFLOW) => new Promise((resolve, reject) => {
    console.info(`Ask for flowchart ${target}`);
    axiosInstance.get(`${process.env.WS_BASE_URL}${URLS.REST_API_EXPORT}/${target}/${getters.contextId}`, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(({ data }) => {
        if (typeof data !== 'undefined' && data !== null) {
          try {
            data.restored = getters.context.restored;
            commit('ADD_FLOWCHART', { flowchart: data, target });
            resolve();
          } catch (e) {
            reject(new Error(`Error in dataflow layout for the context ${this.contextId}: ${e}`));
          }
        } else {
          reject(new Error(`Dataflow in context ${this.contextId} has no layout`));
        }
      })
      .catch((error) => {
        reject(error);
      });
  }),

  setReloadFlowchart: ({ commit }, { target }) => {
    commit('SET_RELOAD_FLOWCHART', target);
  },

  setDataflowStatus: ({ commit }, { id, status }) => {
    commit('SET_DATAFLOW_STATUS', { id, status });
  },

  setDataflowInfo: ({ commit }, dataflowInfo) => {
    if (dataflowInfo === null) {
      // is reset
      commit('SET_DATAFLOW_INFO', null);
    } else {
      const { id, html, rateable, rating, averageRating } = dataflowInfo;
      if (id !== null && id !== '') {
        const split = id.split('.');
        const elementId = split[split.length - 1];
        const elementTypes = split.slice(0, split.length - 1);
        commit('SET_DATAFLOW_INFO', {
          elementId,
          elementTypes,
          html,
          rateable,
          rating,
          averageRating,
        });
      }
    }
  },

  storeSearchResult: ({ commit }, results) => {
    commit('STORE_RAW_SEARCH_RESULT', results);
  },

  setScaleReference: ({ commit }, scaleReference) => {
    commit('SET_SCALE_REFERENCE', scaleReference);
    // commit('SET_SCALE_LOCKED', { scaleType: 'all', scaleLocked: false });
  },

  updateScaleReference: ({ commit }, scaleReference) => {
    commit('UPDATE_SCALE_REFERENCE', scaleReference);
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

  addTerminal: ({ state, commit }, { id, active, type }) => {
    if (!id) {
      id = `${state.session}-${++state.terminalsCounter}`;
      commit('ADD_TERMINAL', {
        id,
        active: typeof active === 'undefined' ? true : active,
        type: type || TERMINAL_TYPES.CONSOLE,
      });
    } else {
      const idx = state.terminals.findIndex(t => t.id === id);
      if (idx !== -1) {
        console.warn('Terminal already exists');
      } else {
        state.terminals[idx].active = true;
      }
    }
  },

  removeTerminal: ({ commit }, terminalId) => {
    commit('REMOVE_TERMINAL', terminalId);
  },

  addTerminalCommand: ({ commit }, command) => {
    commit('ADD_TERMINAL_COMMAND', command);
  },

  clearTerminalCommands: ({ commit }) => {
    commit('CLEAR_TERMINAL_COMMANDS');
  },

  loadDocumentation: ({ dispatch, getters, rootGetters }, documentationView = null) => new Promise((resolve, reject) => {
    if (getters.contextId === null) {
      console.warn('Ask documentation without context');
      reject(new Error('Ask documentation without context'));
      return;
    }
    if (documentationView === null) {
      documentationView = rootGetters['view/documentationView'];
      if (documentationView === null) {
        console.warn('No view selected');
      }
    }
    axiosInstance.get(`${process.env.WS_BASE_URL}${URLS.REST_SESSION_OBSERVATION}documentation/${documentationView}/${getters.contextId}`, {})
      .then(({ data }) => {
        if (data === '') {
          console.warn('Empty report');
          resolve(false);
        } else {
          dispatch('refreshDocumentation', { view: documentationView, documentation: data }).then(() => {
            dispatch('view/removeReloadView', documentationView, { root: true }).then(() => {
              resolve(true);
            });
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  }),

  refreshDocumentation: ({ commit }, { view, documentation }) => {
    const tree = [];
    const items = [];
    const indexes = new Map();
    const buildTree = (node, item, l, i) => {
      let label;
      let idx;
      if (item.type === DOCUMENTATION_TYPES.SECTION) {
        if (l === null) {
          idx = `${i}.`;
        } else {
          idx = `${l}${i}.`;
        }
      } else {
        if (indexes.has(item.type)) {
          idx = indexes.get(item.type) + 1;
        } else {
          idx = 1;
        }
        indexes.set(item.type, idx);
      }
      switch (item.type) {
        case DOCUMENTATION_TYPES.SECTION:
          label = `${idx} ${item.title}`;
          break;
        case DOCUMENTATION_TYPES.TABLE:
          label = `${getI18N().tc('label.reportTable')} ${idx}. ${item.bodyText}`;
          break;
        case DOCUMENTATION_TYPES.RESOURCE:
          label = item.title;
          break;
        case DOCUMENTATION_TYPES.MODEL:
          label = item.id;
          break;
        case DOCUMENTATION_TYPES.REFERENCE:
          label = item.id;
          break;
        case DOCUMENTATION_TYPES.FIGURE:
          label = `${getI18N().tc('label.reportFigure')} ${idx}. ${item.figure.label}`;
          break;
        default:
          label = item.type;
      }
      const e = {
        type: item.type,
        id: item.id,
        idx,
        parentId: item.parentId,
        previousId: item.previousId,
        nextId: item.nextId,
        label,
        children: [],
      };
      let sectionCounter = 0;
      item.children.forEach((c) => {
        let localCounter = -1;
        if (c.type === DOCUMENTATION_TYPES.SECTION) {
          localCounter = ++sectionCounter;
        }
        buildTree(e.children, c, idx, localCounter);
      });
      node.push(e);
      items.push({
        id: item.id,
        idx,
        label,
        type: item.type,
        title: item.title,
        subtitle: item.subtitle,
        bodyText: item.bodyText,
        model: item.model,
        section: item.section,
        resource: item.resource,
        table: item.table,
        figure: item.figure,
        reference: item.reference,
      });
    };
    let sectionCounter = 0;
    documentation.forEach((doc, index) => {
      buildTree(tree, doc, null, doc.type === DOCUMENTATION_TYPES.SECTION ? ++sectionCounter : index);
    });
    commit('SET_DOCUMENTATION', { view, tree });
    commit('ADD_DOCUMENTATION', items);
  },
};

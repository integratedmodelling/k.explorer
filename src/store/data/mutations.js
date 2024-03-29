import { /* getNodeFromObservation, */findNodeById, WKTInstance } from 'shared/Helpers';
import { eventBus } from 'plugins/initApp';
import { SCALE_TYPE, SCALE_VALUES, CUSTOM_EVENTS, WEB_CONSTANTS, DOCUMENTATION_VIEWS } from 'shared/Constants';
import { MAP_CONSTANTS } from 'shared/MapConstants';
// import { DATAFLOW_STATUS } from 'shared/Constants';

export default {

  SET_SESSION_REFERENCE: (state, sessionReference) => {
    state.sessionReference = sessionReference;
  },
  /**
   * Set context object
   * As only a context can be active in a moment,
   * first store existing context and then reset everything
   * @param context the new context
   */
  SET_CONTEXT: (state, { context = null, isRecontext = false }) => {
    // the previous store is delegate to actions because a mutations cannot commit another mutation
    if (context === null) {
      state.contexts.empty();
    } else {
      const exists = state.contexts.findIndex(ctxt => ctxt.id === context.id);
      if (exists === -1) {
        if (isRecontext) {
          const actualContext = state.contexts.peek();
          context.scaleReference = actualContext.scaleReference;
        }
        state.contexts.push(context);
      } else {
        state.contexts.pop(exists);
      }
    }
    state.tree = [];
    state.userTree = [];
    state.lasts = [];
    state.observations = [];
    state.knowledgeViews = [];
    state.flowcharts.forEach((f) => {
      f.flowchart = null;
      f.graph = null;
      f.updatable = false;
      f.visible = false;
    });
    state.dataflowStatuses = [];
    state.dataflowInfo = null;
    state.nodeSelected = null;
    state.nextScale = null;
    state.crossingIDL = false;
    state.contextCustomLabel = null;
    state.timeEvents = [];
    state.timestamp = -1;
    state.engineTimestamp = -1;
    state.proposedContext = null;
    state.documentationTrees.forEach((dv) => {
      dv.tree.splice(0, dv.tree.length);
    });
    state.documentationContent.clear();
    state.documentationView = DOCUMENTATION_VIEWS.REPORT;
    if (context === null) {
      state.contextsHistory = [];
    } else if (typeof context.restored === 'undefined') {
      context.restored = false;
    }
    state.schedulingResolution = null;
  },

  SET_CONTEXT_CUSTOM_LABEL(state, contextCustomLabel = null) {
    state.contextCustomLabel = contextCustomLabel;
  },

  WAITING_FOR_RESET(state, contextId) {
    // if null, no context will be load
    state.waitingForReset = contextId;
  },

  STORE_CONTEXT: (state, context) => {
    const exists = state.contextsHistory.find(ctxt => ctxt.id === context.id);
    if (typeof exists === 'undefined') {
      console.debug(`Added new context in store with id ${context.id}`);
      state.contextsHistory.push(context);
    } else {
      console.debug(`Context with id ${context.id} yet exists in contextHistory`);
    }
  },

  SET_RELOAD_FLOWCHART: (state, target) => {
    state.flowcharts.filter(fc => target === null || fc.target === target).forEach((fc) => {
      fc.updatable = true;
      fc.visible = false;
    });
  },

  ADD_FLOWCHART: (state, { flowchart, target }) => {
    const f = state.flowcharts.find(fc => fc.type === target);
    if (f) {
      f.flowchart = flowchart;
      f.updatable = false;
    } else {
      console.warn(`Unknown target to add flowchart: ${target}`);
    }
  },

  SET_DATAFLOW_STATUS: (state, { id, status }) => {
    // if (Object.prototype.hasOwnProperty.call(DATAFLOW_STATUS, status)) {
    const existing = state.dataflowStatuses.find(ds => ds.id === id);
    if (typeof existing !== 'undefined') {
      existing.status = status;
    } else {
      state.dataflowStatuses.push({ id, status });
    }
    // } else {
    //   throw new Error(`Status not valid: ${status}`);
    // }
  },

  SET_DATAFLOW_INFO: (state, dataflowInfo) => {
    state.dataflowInfo = dataflowInfo;
  },

  UPDATE_TIME_EVENTS: (state, observation) => {
    if (observation.timeEvents && observation.timeEvents.length > 0) {
      observation.timeEvents.forEach((te) => {
        state.timeEvents.push({
          id: observation.id,
          timestamp: te,
        });
      });
      console.debug(`Added ${observation.timeEvents.length} events`);
    }
  },

  ADD_OBSERVATION: (state, { observation }) => {
    state.observations.push(observation);
    console.info(`Added observation: ${observation.label}`);
    console.debug(`Observation content: ${JSON.stringify(observation, null, 2)}`);
  },

  UPDATE_OBSERVATION: (state, { observationIndex, newObservation }) => {
    const oldObservation = state.observations[observationIndex];
    // change the original observation with the fusion of new and old
    const observation = {
      ...oldObservation,
      ...newObservation,
    };
    state.observations.splice(observationIndex, 1, observation);
    // update node
    const updateNode = (node) => {
      if (node) {
        node.needUpdate = !observation.contextualized;
        node.dynamic = observation.dynamic;
        node.childrenCount = observation.childrenCount;
        node.children.forEach((child) => {
          child.siblingsCount = observation.childrenCount;
        });
        node.tickable = (observation.viewerIdx !== null && !observation.empty) || observation.isContainer || observation.childrenCount > 0;
        node.exportFormats = observation.exportFormats;
      } else {
        console.warn(`Node of ${observation.id} - ${observation.label} not found`);
      }
    };
    const mainNode = findNodeById(state.tree, observation.id);
    updateNode(mainNode);
    if (mainNode && mainNode.userNode) {
      updateNode(findNodeById(state.userTree, observation.id));
    }
  },

  SET_CONTEXTMENU_OBSERVATIONID: (state, contextMenuObservationId) => {
    state.contextMenuObservationId = contextMenuObservationId;
  },

  MOD_BRING_FORWARD: (state, node) => {
    const observation = state.observations.find(o => o.id === node.id);
    if (!observation) {
      console.warn(`Receive a bring forward for an unknown observation: ${node.id} - ${node.label}`);
    }
    observation.main = true;
    node.main = true;
  },

  MOD_STRUCTURE_CHANGE: (state, { node, modificationEvent }) => {
    const observation = state.observations.find(o => o.id === modificationEvent.id);
    observation.childrenCount = modificationEvent.newSize;
    observation.empty = false;
    if (modificationEvent.exportFormats) {
      observation.exportFormats = modificationEvent.exportFormats;
    }
    const updateNode = (n) => {
      if (n) {
        n.childrenCount = modificationEvent.newSize;
        if (modificationEvent.exportFormats) {
          n.exportFormats = modificationEvent.exportFormats;
        }
        n.children.forEach((child) => {
          child.siblingsCount = modificationEvent.newSize;
        });
        n.tickable = true;
        n.disabled = false;
        n.empty = false;
        n.needUpdate = true;
      }
    };
    updateNode(node);
    if (node.userNode) {
      updateNode(findNodeById(state.userTree, node.id));
    }
  },

  MOD_VALUE_CHANGE: (state, node) => {
    node.dynamic = true;
    node.needUpdate = false;
    if (node.userNode) {
      const userNode = findNodeById(state.userTree, node.id);
      if (userNode) {
        userNode.dynamic = true;
        userNode.needUpdate = false;
      } else {
        console.warn(`Node theoretically in user tree but not found: ${node.id} - ${node.label}`);
      }
    }
  },

  ADD_KNOWLEDGE_VIEW: (state, knowledgeView) => {
    state.knowledgeViews.push({
      ...knowledgeView,
      show: false,
    });
  },

  SHOW_KNOWLEDGE_VIEW: (state, knowledgeViewId) => {
    state.knowledgeViews.forEach((kv) => {
      if (kv.viewId === knowledgeViewId) {
        kv.show = true;
      }
    });
  },

  ADD_TIME_EVENT: (state, event) => {
    const exists = state.timeEvents.findIndex(te => te.id === event.id
      && te.timestamp === event.timestamp
      && te.newAttributes === event.newAttributes
      && te.newScale === event.newScale
      && te.newName === event.newName
      && te.newSemantics === event.newSemantics
      && te.newSize === event.newSize) !== -1;
    if (!exists) {
      state.timeEvents.push(event);
    } else {
      console.warn(`Duplicated time event:
      ${JSON.stringify(event, null, 2)}`);
    }
  },

  SET_MODIFICATIONS_TASK: (state, task) => {
    state.modificationsTask = task;
  },

  SET_TIMESTAMP: (state, timestamp) => {
    state.timestamp = timestamp;
  },

  SET_ENGINE_TIMESTAMP: (state, engineTimestamp) => {
    state.engineTimestamp = engineTimestamp;
  },

  SET_SCHEDULING_STATUS: (state, scheduling) => {
    if (state.scaleReference !== null) {
      switch (scheduling.type) {
        case 'TIME_ADVANCED':
          state.engineTimestamp = scheduling.currentTime;
          break;
        case 'STARTED':
          state.engineTimestamp = scheduling.currentTime;
          state.schedulingResolution = scheduling.resolution;
          eventBus.$emit(CUSTOM_EVENTS.NEW_SCHEDULING);
          break;
        case 'FINISHED':
          // if (scheduling.currentTime !== 0) {
          //   state.engineTimestamp = scheduling.currentTime;
          // } else { // TODO remove when engine send the current time
          state.engineTimestamp = state.scaleReference.end;
          // }
          break;
        default:
          console.warn(`Unknown scheduling type: ${scheduling.type}`);
          break;
      }
    } else {
      console.warn('Try to change scheduling type but no scaleReference');
    }
  },
  /**
   * Add node to tree
   * @param node
   */
  ADD_NODE: (state, { node, parentId, toUserTreeOnly = false }) => {
    const context = state.contexts.peek();
    if (context === null) {
      console.info(`Context is null, it's just set or is a new observation of previous search for this session, so added to orphans. ID: ${node.id}`);
      state.orphans.push(node);
      return;
    }
    const isRoot = context.id === context.rootContextId;
    if ((isRoot && node.rootContextId !== context.id) || (!isRoot && node.contextId !== context.id)) {
      // console.warn(`Try to add to tree an observation of other context. Actual: ${context.id} / Node: ${node.rootContextId}`);
      console.info(`Subcontext or trying to add to tree an observation of other context. Actual: ${context.id} / Node: ${node.rootContextId}`);
    }
    if (context.id === node.id) {
      console.error('Try to add context to tree, check it!');
      return;
    }
    if (context.id === parentId) {
      // is a tree root node
      if (!toUserTreeOnly) {
        state.tree.push(node);
      }
      if (node.userNode) {
        const cloneNode = JSON.parse(JSON.stringify(node));
        state.userTree.push(cloneNode);
      }
    } else {
      const addToParent = (tree, localNode = node) => {
        const parent = findNodeById(tree, parentId);
        if (parent !== null) {
          if (parent.children.length === parent.childrenCount) {
            // is a live appending observation
            parent.childrenCount++;
            // update other children
            parent.children.forEach((child) => {
              child.siblingsCount = parent.childrenCount;
            });
          }
          parent.children.push({
            ...localNode,
            idx: parent.children.length,
            siblingsCount: parent.childrenCount,
          });
          parent.disabled = false; // if was empty and now has children, it cannot be disabled
        } else {
          console.warn(`Orphan founded with id ${node.id}`);
          state.orphans.push(node);
        }
      };
      if (!toUserTreeOnly) {
        addToParent(state.tree);
      }
      if (node.userNode) {
        addToParent(state.userTree, JSON.parse(JSON.stringify(node)));
      }
    }
  },

  REMOVE_NODE: (state, { id, fromMainTree = false }) => {
    const tree = fromMainTree ? state.tree : state.userTree;
    const deleteNode = (root, nodeId) => {
      const idx = root.findIndex(n => n.id === nodeId);
      if (idx === -1) {
        root.forEach((node) => {
          if (node.children && node.children.length !== 0) {
            deleteNode(node.children, nodeId);
          }
        });
      } else {
        root.splice(idx, 1);
        console.debug(`Find and delete node ${nodeId} from ${fromMainTree ? 'main tree' : 'user tree'}`);
      }
    };
    deleteNode(tree, id);
  },

  UPDATE_USER_NODE: (state, { node, userNode }) => {
    const changeUserNode = (n) => {
      n.userNode = userNode;
      if (n.children && n.children.length > 0) {
        n.children.forEach(cn => changeUserNode(cn));
      }
    };
    changeUserNode(node);
  },

  SET_FOLDER_VISIBLE: (state, {
    nodeId,
    visible,
    zIndexOffset,
  }) => {
    if (zIndexOffset !== null) {
      state.observations.forEach((o) => {
        if (o.parentArtifactId === nodeId || o.parentId === nodeId) {
          o.visible = visible;
          o.top = visible;
        } else if (visible && o.zIndexOffset === zIndexOffset) {
          o.top = false;
        }
      });
      const folder = state.observations.find(o => o.id === nodeId);
      if (typeof folder !== 'undefined') {
        folder.visible = visible;
      }
    } else {
      console.info(`Folder with id ${nodeId} has no loaded elements`);
    }
    // set node ticked (for tree view)
    const setNodeTicked = (tree) => {
      const node = findNodeById(tree, nodeId);
      if (typeof node !== 'undefined' && node !== null && node.children.length > 0) {
        node.children.forEach((n) => {
          if (n.parentArtifactId === node.id) {
            n.ticked = visible;
          }
        });
        node.ticked = visible;
      }
    };
    setNodeTicked(state.tree);
    setNodeTicked(state.userTree);
  },

  SET_VISIBLE: (state, {
    id,
    visible,
  }) => {
    // set observation visible (for layer)
    const observationIdx = state.observations.findIndex(o => o.id === id);
    const observation = state.observations[observationIdx];
    if (typeof observation !== 'undefined') {
      // store the offset, we need to set top to false only for observations with same offset
      const offset = observation.zIndexOffset;
      observation.visible = visible;
      observation.top = visible;
      // if hide, nothing else, else need to put down others
      if (visible) {
        state.observations.forEach((o) => {
          if (o.id !== id && o.zIndexOffset === offset) {
            o.top = false;
          }
        });
      }
      // set node ticked (for tree view)
      const setNodeTicked = (tree) => {
        const node = findNodeById(tree, id);
        if (node) {
          node.ticked = visible;
        }
      };
      setNodeTicked(state.tree);
      setNodeTicked(state.userTree);
      state.observations.splice(observationIdx, 1, observation);
    } else {
      console.warn(`Try to change visibility to no existing observations with id ${id}`);
    }
  },

  SET_LOADING_LAYERS: (state, { loading, observation }) => {
    if (observation) {
      observation.loading = loading;
      const node = findNodeById(state.tree, observation.id);
      if (node) {
        node.loading = loading;
        if (node.userNode) {
          const userNode = findNodeById(state.userTree, observation.id);
          userNode.loading = loading;
        }
      }
    }
  },

  STORE_RAW_SEARCH_RESULT: (state, result) => {
    state.searchResult = result;
  },

  ADD_LAST: (state, {
    parentId,
    observationId,
    offsetToAdd,
    total,
  }) => {
    const lastIdx = state.lasts.findIndex(l => parentId === l.parentId);
    if (lastIdx !== -1) {
      const last = state.lasts[lastIdx];
      if (last.offset + offsetToAdd >= last.total) {
        state.lasts.splice(lastIdx, 1);
        console.info(`Folder ${parentId} fully loaded`);
      } else {
        last.observationId = observationId;
        last.offset += offsetToAdd;
        console.info(`Loaded more elements in folder ${parentId}. New offset is ${last.offset} `);
      }
    } else {
      if (offsetToAdd + 1 === total) {
        console.info(`Nothing to do in folder ${parentId}. Offset is ${offsetToAdd} and total is ${total} `);
        return;
      }
      state.lasts.push({
        parentId,
        observationId,
        offset: offsetToAdd,
        total,
      });
      console.debug(`Added folder ${parentId}. Offset is ${offsetToAdd} `);
    }
  },

  SET_SCALE_REFERENCE: (state, scaleReference) => {
    // TODO: IMPORTANT!!!! Add to solve the bad initialization of the time unit, remove when engine send correct one
    if (scaleReference.timeUnit === null) {
      scaleReference.timeUnit = SCALE_VALUES.YEAR;
    }
    state.scaleReference = scaleReference;
    if (!state.context) {
      if (state.scaleReference.shape !== null) {
        state.proposedContext = WKTInstance.readGeometry(state.scaleReference.shape, {
          dataProjection: MAP_CONSTANTS.PROJ_EPSG_4326,
          featureProjection: MAP_CONSTANTS.PROJ_EPSG_3857,
        });
      } else {
        state.proposedContext = null;
      }
    }
    console.info(`Scale reference set: ${JSON.stringify(scaleReference, null, 2)}`);
  },

  UPDATE_SCALE_REFERENCE: (state, scaleReference) => {
    const { type, unit, timeResolutionMultiplier, start, end, next = false } = scaleReference;
    let { spaceResolution } = scaleReference;
    if (type === SCALE_TYPE.ST_SPACE && spaceResolution !== 0 && Math.round(spaceResolution) !== spaceResolution) {
      spaceResolution = spaceResolution.toFixed(1);
    }
    const update = {
      ...state.scaleReference,
      [`${type}Unit`]: unit,
      [`${type}ResolutionDescription`]: (!spaceResolution || spaceResolution === 0 ? '' : `${spaceResolution} `) + unit,
      ...(type === SCALE_TYPE.ST_SPACE && {
        spaceResolution,
        spaceResolutionConverted: spaceResolution,
      }),
      ...(type === SCALE_TYPE.ST_TIME && {
        timeResolutionMultiplier,
        start,
        end,
      }),
    };
    if (next) {
      state.nextScale = {
        ...update,
        spaceChanged: type === SCALE_TYPE.ST_SPACE,
        timeChanged: type === SCALE_TYPE.ST_TIME,
      };
    } else {
      state.scaleReference = update;
    }
  },

  SET_SCALE_LOCKED: (state, { scaleType, scaleLocked }) => {
    if (scaleType === 'all') {
      state.scaleLocked.space = scaleLocked;
      state.scaleLocked.time = scaleLocked;
    } else if (Object.prototype.hasOwnProperty.call(state.scaleLocked, scaleType)) {
      console.info(`Set ${scaleLocked} to ${scaleType} scale type`);
      state.scaleLocked[scaleType] = scaleLocked;
    } else {
      console.error(`Try to set locked to unknow scale type: ${scaleType}`);
    }
  },

  SET_INTERACTIVE_MODE: (state, value) => {
    state.interactiveMode = value;
  },

  SET_CROSSING_IDL: (state, value) => {
    state.crossingIDL = value;
  },

  ADD_TERMINAL: (state, terminal) => {
    state.terminals.push(terminal);
  },

  REMOVE_TERMINAL: (state, terminalId) => {
    const idx = state.terminals.findIndex(t => t.id === terminalId);
    if (idx !== -1) {
      state.terminals.splice(idx, 1);
    } else {
      console.warn(`Trying to remove unknown terminal ${terminalId}`);
    }
  },

  ADD_TERMINAL_COMMAND: (state, command) => {
    state.terminalCommands.push(command);
    localStorage.setItem(WEB_CONSTANTS.LOCAL_STORAGE_TERMINAL_COMMANDS, JSON.stringify(state.terminalCommands));
  },

  CLEAR_TERMINAL_COMMANDS: (state) => {
    state.terminalCommands.splice(0, state.terminalCommands.length);
    localStorage.setItem(WEB_CONSTANTS.LOCAL_STORAGE_TERMINAL_COMMANDS, JSON.stringify(state.terminalCommands));
  },

  /**
   * Set the documentation tree for a view type
   * @param state
   * @param view
   * @param documentation
   * @constructor
   */
  SET_DOCUMENTATION: (state, { view, tree }) => {
    const idx = state.documentationTrees.findIndex(dt => dt.view === view);
    if (idx === -1) {
      console.warn(`Unknown documentation view: ${view}`);
    } else {
      state.documentationTrees[idx].tree = tree;
    }
  },

  /**
   * Add a group of item to documentation
   * @param state
   * @param items an array of elements
   * @constructor
   */
  ADD_DOCUMENTATION: (state, items) => {
    items.forEach((item) => {
      state.documentationContent.set(item.id, item);
    });
  },
};

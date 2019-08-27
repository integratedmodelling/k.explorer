import { /* getNodeFromObservation, */findNodeById } from 'shared/Helpers';
// import { DATAFLOW_STATUS } from 'shared/Constants';

const staticAddToNode = (state, contextId, { node, parentId, toUserTreeOnly, noChildren = false }) => {
  if (contextId === parentId) {
    // is a tree root node
    if (!toUserTreeOnly) {
      state.tree.push(node);
    }
    if (node.userNode) {
      const cloneNode = JSON.parse(JSON.stringify(node));
      if (noChildren) {
        cloneNode.children = [];
      }
      state.userTree.push(cloneNode);
    }
  } else {
    const addToParent = (tree, localNode, localParentId = parentId) => {
      const parent = findNodeById(tree, localParentId);
      if (parent !== null) {
        parent.children.push({
          ...localNode,
          idx: parent.children.length,
          siblingsCount: parent.childrenCount,
          noChildren: true,
        });
        parent.disabled = false; // if was empty and now has children, it cannot be disabled
      } else if (toUserTreeOnly) {
        const parentNode = findNodeById(state.tree, localParentId);
        parentNode.userNode = true;
        staticAddToNode(state, contextId, {
          node: parentNode,
          parentId: parentNode.parentId,
          toUserTreeOnly: true,
        });
      } else {
        console.warn(`Orphan founded with id ${node.id}`);
        state.orphans.push(node);
      }
    };
    if (!toUserTreeOnly) {
      addToParent(state.tree, node);
    }
    if (node.userNode) {
      addToParent(state.userTree, JSON.parse(JSON.stringify(node)));
    }
  }
};

export default {

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
    } else if (isRecontext) {
      const actualContext = state.contexts.peek();
      context.scaleReference = actualContext.scaleReference;
      state.contexts.push(context);
    } else {
      const exists = state.contexts.findIndex(ctxt => ctxt.id === context.id);
      if (exists === -1) {
        state.contexts.push(context);
      } else {
        state.contexts.pop(exists);
      }
    }
    state.tree = [];
    state.userTree = [];
    state.lasts = [];
    state.observations = [];
    state.dataflow = null;
    state.dataflowStatuses = [];
    state.dataflowInfo = null;
    state.nodeSelected = null;
    state.crossingIDL = false;
    if (context === null) {
      state.contextsHistory = [];
    } else if (typeof context.restored === 'undefined') {
      context.restored = false;
    }
  },


  WAITING_FOR_RESET(state, contextId) {
    // if null, no context will be load
    state.waitingForReset = contextId;
  },

  STORE_CONTEXT: (state, context) => {
    const exists = state.contextsHistory.find(ctxt => ctxt.id === context.id);
    if (typeof exists === 'undefined') {
      console.log(`Added new context in store with id ${context.id}`);
      state.contextsHistory.push(context);
    } else {
      console.log(`Context with id ${context.id} yet exists in contextHistory`);
    }
  },

  ADD_DATAFLOW: (state, dataflow) => {
    state.dataflow = dataflow;
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

  ADD_OBSERVATION: (state, { observation }) => {
    state.observations.push(observation);
    console.info(`Added observation: ${observation.label}`);
    console.debug(`Observation content: ${JSON.stringify(observation, null, 2)}`);
  },

  /**
   * Add node to tree
   * @param node
   */
  ADD_NODE: (state, { node, parentId, toUserTreeOnly = false }) => {
    const context = state.contexts.peek();
    if (context === null) {
      console.info(`Context is null, is it just resetted or is a new observation of previous search for this session, so added to orphans. ID: ${node.id}`);
      state.orphans.push(node);
      return;
    }
    if (node.rootContextId !== context.id) {
      console.warn(`Try to add to tree an observation of other context. Actual: ${context.id} / Node: ${node.rootContextId}`);
    }
    if (context.id === node.id) {
      console.error('Try to add context to tree, check it!');
      return;
    }
    staticAddToNode(state, context.id, { node, parentId, toUserTreeOnly });
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
      console.warn(`Folder with id ${nodeId} has no elements`);
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
    nodeId,
    visible,
  }) => {
    // set observation visible (for layer)
    const observationIdx = state.observations.findIndex(o => o.id === nodeId);
    const observation = state.observations[observationIdx];
    if (typeof observation !== 'undefined') {
      // store the offset, we need to set top to false only for observations with same offset
      const offset = observation.zIndexOffset;
      observation.visible = visible;
      observation.top = visible;
      // if hide, nothing else, else need to put down others
      if (visible) {
        state.observations.forEach((o) => {
          if (o.id !== nodeId && o.zIndexOffset === offset) {
            o.top = false;
          }
        });
      }
      // set node ticked (for tree view)
      const setNodeTicked = (tree) => {
        const node = findNodeById(tree, nodeId);
        if (node) {
          node.ticked = visible;
        }
      };
      setNodeTicked(state.tree);
      setNodeTicked(state.userTree);
      state.observations.splice(observationIdx, 1, observation);
    } else {
      console.warn(`Try to change visibility to no existing observations with id ${nodeId}`);
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
      if (last.offset + offsetToAdd + 1 >= last.total) {
        state.lasts.splice(lastIdx, 1);
        console.info(`Delete folder ${parentId}`);
      } else {
        last.observationId = observationId;
        last.offset += offsetToAdd;
        console.info(`Change folder ${parentId}. Now offset is ${last.offset} `);
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
    state.scaleReference = scaleReference;
  },

  UPDATE_SCALE_REFERENCE: (state, { type, resolution, unit }) => {
    state.scaleReference = {
      ...state.scaleReference,
      [`${type}Resolution`]: resolution,
      [`${type}Unit`]: unit,
      [`${type}ResolutionDescription`]: (resolution === 0 ? '' : `${resolution} `) + unit,
    };
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
};

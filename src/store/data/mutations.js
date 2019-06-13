import { /* getNodeFromObservation, */findNodeById } from 'shared/Helpers';
// import { DATAFLOW_STATUS } from 'shared/Constants';

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
    state.lasts = [];
    state.observations = [];
    state.dataflow = null;
    state.dataflowStatuses = [];
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

  ADD_OBSERVATION: (state, { observation }) => {
    state.observations.push(observation);
    console.info(`Added observation: ${observation.label}`);
    console.debug(`Observation content: ${JSON.stringify(observation, null, 2)}`);
  },

  /**
   * Add node to tree
   * @param node
   */
  ADD_NODE: (state, { node, parentId }) => {
    if (state.contexts.peek() === null) {
      console.info(`Context is null, is it just resetted or is a new observation of previous search for this session, so added to orphans. ID: ${node.id}`);
      state.orphans.push(node);
      return;
    }
    if (state.contexts.peek().id === node.id) {
      console.error('Try to add context to tree, check it!');
      return;
    }
    if (state.contexts.peek().id === parentId) {
      // is a tree root node
      state.tree.push(node);
    } else if (node.rootContextId === state.contexts.peek().id) {
      const parent = findNodeById(state.tree, parentId);
      if (parent !== null) {
        parent.children.push({
          ...node,
          idx: parent.children.length,
          siblingsCount: parent.childrenCount,
        });
        parent.disabled = false; // if was empty and now has children, it cannot be disabled
      } else {
        console.warn(`Orphan founded with id ${node.id}`);
        state.orphans.push(node);
      }
    } else {
      console.warn(`Try to add to tree an observation of other context. Actual: ${state.contexts.peek().id} / Node: ${node.rootContextId}`);
    }
  },

  RECALCULATE_TREE: (state, { taskId, fromTask }) => {
    const context = state.contexts.peek();
    if (context === null) {
      // context was reset while processing
      return;
    }
    const filtered = state.observations.filter(observation => observation.taskId.startsWith(taskId)); // state.observations.filter(observation => observation.taskId === taskId);
    const restored = typeof context.restored !== 'undefined' && context.restored;
    if (filtered.length === 0) {
      console.info('No recalculation needed, no observation for this task');
      return;
    }
    if (filtered.length === 1) {
      console.info('No recalculation needed, only one observation');
      return;
    }
    const idsToDelete = []; // only ids
    const mains = []; // main observations ids
    let main = null; // main observation id
    const children = []; // no main, children of main observation ids
    filtered.forEach((observation, index) => {
      if (observation.main) {
        if ((fromTask && index === filtered.length - 1) || (restored && index === 0)) {
          main = findNodeById(state.tree, observation.id);
        } else {
          mains.push(findNodeById(state.tree, observation.id));
        }
        idsToDelete.push(observation.id);
      } else if (observation.folderId === null) {
        children.push(findNodeById(state.tree, observation.id));
        idsToDelete.push(observation.id);
      }
    });
    if (main === null) {
      if (!restored) {
        console.warn('No main observation found, stopped?'); // if restoring, is possible to haven't main
      } else {
        console.info('No main observation found'); // if restoring, is possible to haven't main
      }
      return;
    }
    // main.header = 'main';
    // find index of first filtered occurence
    const firstOccurence = filtered[0];
    let folder = null;
    let insertionIndex = -1;
    if (firstOccurence.parentId === state.contexts.peek().id) {
      folder = state.tree;
      insertionIndex = state.tree.findIndex(c => c.id === firstOccurence.id);
    } else {
      const parentFolder = findNodeById(state.tree, firstOccurence.folderId || firstOccurence.parentId);
      if (parentFolder === null) {
        throw new Error(`Element is not first level but cannot find parent: folderId: ${firstOccurence.folderId}, parentId: ${firstOccurence.parentId}`);
      }
      folder = parentFolder.children;
      insertionIndex = folder.findIndex(c => c.id === firstOccurence.id);
    }
    if (children.length > 0) {
      children.forEach((child, idx) => {
        child.folderId = main.id;
        child.idx = idx;
        child.siblingsCount = children.length;
      });
      main.children.push(...children);
      main.disabled = false; // if was empty and now has children, it cannot be disabled
    } else {
      console.info('No children found');
    }
    if (folder !== null && insertionIndex !== -1) {
      // remove all elements from tree
      let i = folder.length;
      // eslint-disable-next-line no-plusplus
      while (i--) {
        if (idsToDelete.includes(folder[i].id)) {
          folder.splice(i, 1);
        }
      }
      folder.splice(insertionIndex, 0, main);
      if (mains.length > 0) {
        folder.splice(insertionIndex + 1, 0, ...mains);
      }
    }
  },

  SET_FOLDER_VISIBLE: (state, {
    nodeId,
    visible,
  }) => {
    const observation = state.observations.find(o => o.folderId === nodeId);
    if (typeof observation !== 'undefined') {
      const offset = observation.zIndexOffset;
      state.observations.forEach((o) => {
        if (o.folderId === nodeId) {
          o.visible = visible;
          o.top = visible;
        } else if (visible && o.zIndexOffset === offset) {
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
    const node = findNodeById(state.tree, nodeId);
    if (typeof node !== 'undefined' && node !== null && node.children.length > 0) {
      node.children.forEach((n) => {
        n.ticked = visible;
      });
      node.ticked = visible;
    }
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
      const node = findNodeById(state.tree, nodeId);
      if (node) {
        node.ticked = visible;
      }
      state.observations.splice(observationIdx, 1, observation);
    } else {
      console.warn(`Try to change visibility to no existing observations with id ${nodeId}`);
    }
  },

  STORE_RAW_SEARCH_RESULT: (state, result) => {
    state.searchResult = result;
  },

  ADD_LAST: (state, {
    folderId,
    observationId,
    offsetToAdd,
    total,
  }) => {
    const lastIdx = state.lasts.findIndex(l => folderId === l.folderId);
    if (lastIdx !== -1) {
      const last = state.lasts[lastIdx];
      if (last.offset + offsetToAdd + 1 >= last.total) {
        state.lasts.splice(lastIdx, 1);
        console.info(`Delete folder ${folderId}`);
      } else {
        last.observationId = observationId;
        last.offset += offsetToAdd;
        console.info(`Change folder ${folderId}. Now offset is ${last.offset} `);
      }
    } else {
      if (offsetToAdd + 1 === total) {
        console.info(`Nothing to do in folder ${folderId}. Offset is ${offsetToAdd} and total is ${total} `);
        return;
      }
      state.lasts.push({
        folderId,
        observationId,
        offset: offsetToAdd,
        total,
      });
      console.debug(`Added folder ${folderId}. Offset is ${offsetToAdd} `);
    }
  },

  REMOVE_LAST: (state, folderId) => {
    const idxToRemove = state.lasts.findIndex(l => l.folderId === folderId);
    if (idxToRemove !== -1) {
      state.lasts.splice(idxToRemove, 1);
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

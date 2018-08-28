import moment from 'moment';
import { Helpers } from 'shared/Helpers';

export default {

  /**
   * Set context object
   * As only a context can be active in a moment,
   * first store existing context and then reset everything
   * TODO: check if everything is good
   * @param context the new context
   */
  SET_CONTEXT: (state, context) => {
    if (state.context !== null) {
      // save context id in vuex store to future use
      // TODO use the local storage?
      state.history.push({
        time: moment(),
        contextId: state.context.id,
        contextLabel: state.context.label,
      });
    }
    state.context = context;
    state.tree = [];
    state.observations = [];
    state.nodeSelected = null;
  },

  ADD_OBSERVATION: (state, observation) => {
    // console.log(`Added observation:\n${JSON.stringify(observation, null, 2)}`);
    console.log(`Added observation: ${observation.label}`);
    state.observations.push(observation);
  },

  /**
   * Add node to tree
   * @param node
   */
  ADD_NODE: (state, { node, parentId }) => {
    if (state.context === null) {
      console.log('Context is null, is it just resetted?');
      return;
    }
    if (state.context.id === node.id) {
      console.error('Try to add context to tree, check it!');
      return;
    }
    if (state.context.id === parentId) {
      // is a tree root node
      state.tree.push(node);
    } else {
      const parent = Helpers.findNodeById(state.tree, parentId);
      if (parent !== null) {
        parent.children.push({
          ...node,
          idx: parent.children.length,
          siblingCount: parent.siblingCount,
        });
      } else {
        state.orphans.push(node);
      }
    }
  },

  SET_FOLDER_VISIBLE: (state, {
    folderId,
    visible,
    callback = null,
  }) => {
    const observation = state.observations.find(o => o.folderId === folderId);
    if (typeof observation !== 'undefined') {
      const offset = observation.zIndexOffset;
      state.observations.forEach((o) => {
        if (o.folderId === folderId) {
          o.visible = visible;
          o.top = visible;
          if (callback !== null) {
            callback(o);
          }
        } else if (visible && o.zIndexOffset === offset) {
          o.top = false;
        }
      });
    } else {
      console.warn(`Folder with id ${folderId} has no elements`);
    }
    // set node ticked (for tree view)
    const node = Helpers.findNodeById(state.tree, folderId);
    if (typeof node !== 'undefined' && node !== null && node.children.length > 0) {
      node.children.forEach((n) => {
        n.ticked = visible;
      });
      node.ticked = visible;
    }
  },

  SET_VISIBLE: (state, {
    id,
    visible,
    callback = null,
  }) => {
    // set observation visible (for layer)
    const observation = state.observations.find(o => o.id === id);
    if (typeof observation !== 'undefined') {
      // store the offset, we need to set top to false only for observations with same offset
      const offset = observation.zIndexOffset;
      observation.visible = visible;
      observation.top = visible;
      if (callback !== null) {
        callback(observation);
      }
      // if hide, nothing else, else need to put down others
      if (visible) {
        state.observations.forEach((o) => {
          if (o.id !== id && o.zIndexOffset === offset) {
            o.top = false;
          }
        });
      }
      // set node ticked (for tree view)
      const node = Helpers.findNodeById(state.tree, id);
      if (node) {
        node.ticked = visible;
      }
    } else {
      console.warn(`Try to change visibility to no existing observations with id ${id}`);
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
        console.log(`Delete folder ${folderId}`);
      } else {
        last.observationId = observationId;
        last.offset += offsetToAdd;
        console.log(`Change folder ${folderId}. Now offset is ${last.offset} `);
      }
    } else {
      if (offsetToAdd + 1 === total) {
        console.log(`Nothing to do in folder ${folderId}. Offset is ${offsetToAdd} and total is ${total} `);
        return;
      }
      state.lasts.push({
        folderId,
        observationId,
        offset: offsetToAdd,
        total,
      });
      console.log(`Added folder ${folderId}. Offset is ${offsetToAdd} `);
    }
  },

  REMOVE_LAST: (state, folderId) => {
    const idxToRemove = state.lasts.findIndex(l => l.folderId === folderId);
    if (idxToRemove !== -1) {
      state.lasts.splice(idxToRemove, 1);
    }
  },
};


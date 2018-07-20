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
    console.log(`Added observation:\n${JSON.stringify(observation, null, 2)}`);
    state.observations.push(observation);
  },

  /**
   * Add node to tree
   * @param node
   */
  ADD_NODE: (state, { node, parentId }) => {
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
        parent.children.push(node);
      } else {
        state.orphans.push(node);
      }
    }
  },

  SET_VISIBLE: (state, {
    id,
    visible,
    callback = null,
  }) => {
    // set observation visible (for layer)
    state.observations.forEach((observation) => {
      if (observation.id === id) {
        observation.visible = visible;
        observation.top = visible;
        if (callback !== null) {
          callback(observation);
        }
      } else {
        observation.top = false;
      }
    });
    // set node ticked (for tree view)
    const node = Helpers.findNodeById(state.tree, id);
    if (node) {
      node.ticked = visible;
    }
  },
};


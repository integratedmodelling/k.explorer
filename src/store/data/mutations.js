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
      // save old observations in vuex store
      // TODO use the local storage?
      state.history.push({
        time: moment(),
        context: state.context,
        tree: state.tree,
        observations: state.observations,
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
      const parent = Helpers.findParent(state.tree, parentId);
      if (parent !== null) {
        parent.children.push(node);
      } else {
        state.orphans.push(node);
      }
    }
  },

  /**
   * Set the selected leaf of tree
   * TODO: change when checkbox will be implemented
   * @param leafSelected the selected leaf
   */
  SET_NODE_SELECTED: (state, nodeSelected) => {
    state.nodeSelected = nodeSelected;
  },

  SET_VISIBLE: (state, { id, visible, callback = null }) => {
    state.observations.forEach((observation) => {
      if (observation.id === id) {
        observation.visible = visible;
        if (callback !== null) {
          callback(observation);
        }
      }
    });
  },
};


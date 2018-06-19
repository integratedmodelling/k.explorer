import moment from 'moment';

export default {

  /**
   * Set context object
   * TODO: check if everything is good
   * @param context the new context
   */
  SET_CONTEXT: (state, context) => {
    state.context = context;
  },

  /**
   * Reset everything
   */
  RESET_CONTEXT: (state) => {
    if (state.context !== null) {
      // save old observations in vuex store
      // TODO use the local storage?
      state.history.push({
        time: moment(),
        context: state.context,
        tree: state.tree,
      });
    }
    state.context = null;
    state.tree = [];
    state.lastViewerId = 0;
    state.leafSelected = null;
    state.viewersLayout = [];
  },

  /**
   * Add node to tree
   * @param node
   */
  ADD_NODE: (state, node) => {
    state.tree.push(node);
  },

  /**
   * Set the selected leaf of tree
   * TODO: change when checkbox will be implemented
   * @param leafSelected the selected leaf
   */
  SET_LEAF_SELECTED: (state, leafSelected) => {
    state.leafSelected = leafSelected;
  },
};


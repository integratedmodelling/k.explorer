export default {
  /**
   * The observations tree
   */
  tree: state => state.tree,

  /**
   * The actual checked leaf in tree
   * TODO: change to implement checkbox
   */
  nodeSelected: state => state.nodeSelected,

  /**
   * Return observations of a viewer
   * If viewer not exists, return empty array
   */
  observations: state => (viewerIdx) => {
    const obs = state.observations.filter(observation => observation.viewerIdx === viewerIdx);
    return obs;
  },

  /**
   * If no context, return null
   */
  hasContext: state => state.context !== null,

  contextLabel: (state) => {
    if (state.context !== null) {
      return state.context.label;
    }
    return null;
  },

  contextId: state => state.context.id,

  fullContext: state => state.context,

  /**
   * The session, very important accessing it using getter
   */
  session: state => state.session,
};


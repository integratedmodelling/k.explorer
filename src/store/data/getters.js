export default {
  /**
   * The observations tree
   */
  tree: state => state.tree,

  /**
   * The actual checked leaf in tree
   * TODO: change to implement checkbox
   */
  selectedId: state => state.selectedId,

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

  contextLabel: state => (state.context !== null ? state.context.label : null),

  contextId: state => (state.context !== null ? state.context.id : null),

  fullContext: state => state.context,

  /**
   * The session, very important accessing it using getter
   */
  session: state => state.session,

  /**
   * The search results
   */
  searchResult: state => state.searchResult,
};


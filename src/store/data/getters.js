import { Helpers } from 'shared/Helpers';

export default {
  /**
   * The observations tree
   */
  tree: state => state.tree,

  treeNode: state => id => Helpers.findNodeById(state.tree, id),

  lasts: state => state.lasts,

  hasTree: state => state.tree.length > 0,

  /**
   * Return observations of a viewer
   * If viewer not exists, return empty array
   */
  observations: state => (viewerIdx) => {
    const obs = state.observations.filter(observation => observation.viewerIdx === viewerIdx);
    return obs;
  },

  hasObservations: state => state.observations.length !== 0,

  dataflow: state => state.dataflow,

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

  scaleReference: state => state.scaleReference,

  isScaleLocked: state => state.scaleLocked,

  /**
   * The search results
   */
  searchResult: state => state.searchResult,
};

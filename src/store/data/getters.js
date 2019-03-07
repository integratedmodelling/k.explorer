/* eslint no-confusing-arrow: ["error", {"allowParens": true}] */
import { Helpers } from 'shared/Helpers';

export default {
  /**
   * The observations tree
   */
  tree: state => state.tree,

  visibleTree: state => (onlyNotified) => {
    if (onlyNotified) {
      const filterNode = node => node.filter(el => el.notified) // filter array first
        .map(obj => ({ // then re-map to new objects
          ...obj, // copy shallow fields
          children: obj.children && filterNode(obj.children), // filter children
        }));
      return filterNode(state.tree);
    }
    return state.tree;
  },

  treeNode: state => id => Helpers.findNodeById(state.tree, id),

  lasts: state => state.lasts,

  hasTree: state => state.tree.length > 0,

  /**
   * Return observations of a viewer
   * If viewer not exists, return empty array
   */
  observations: state => state.observations,
  observationsOfViewer: state => viewerIdx => state.observations.filter(observation => observation.viewerIdx === viewerIdx),

  hasObservations: state => state.observations.length !== 0,

  dataflow: state => state.dataflow,
  hasDataflow: state => state.dataflow !== null,

  dataflowStatuses: state => state.dataflowStatuses,

  /**
   * If no context, return null
   */
  hasContext: state => state.context !== null,

  contextLabel: state => (state.context !== null ? state.context.label : null),

  contextId: state => (state.context !== null ? state.context.id : null),

  fullContext: state => state.context,

  contextEncodedShape: state => (state.context !== null ? `${state.context.spatialProjection} ${state.context.encodedShape}` : ''),

  contextsHistory: (state) => {
    if (state.contextsHistory.length > 0) {
      state.contextsHistory.sort((c1, c2) => ((c1.creationTime === c2.creationTime) ? 0 : ((c1.creationTime > c2.creationTime) ? -1 : 1)));
    }
    return state.contextsHistory;
  },

  contextReloaded: state => state.context !== null && typeof state.context.restored !== 'undefined' && state.context.restored,


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

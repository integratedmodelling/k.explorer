/* eslint no-confusing-arrow: ["error", {"allowParens": true}] */
import { findNodeById } from 'shared/Helpers';

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

  treeNode: state => id => findNodeById(state.tree, id),

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

  contextsId: state => state.contexts.map(ctxt => ctxt.id),
  context: state => state.contexts.peek(),
  contextsCount: state => state.contexts.size(),
  previousContext: state => state.contexts.previous(),
  contextById: state => id => state.contexts.find(ctxt => ctxt.id === id),

  /**
   * If no context, return null
   */
  hasContext: (state, getters) => getters.context !== null,

  contextLabel: (state, getters) => (getters.context !== null ? getters.context.label : null),
  contextsLabels: (state, getters) => (getters.context !== null ? state.contexts.map(ctxt => ({ label: ctxt.label, contextId: ctxt.id })) : []),

  contextId: (state, getters) => (getters.context !== null ? getters.context.id : null),

  contextEncodedShape: (state, getters) => (getters.context !== null ? `${getters.context.spatialProjection} ${getters.context.encodedShape}` : ''),

  contextsHistory: (state) => {
    if (state.contextsHistory.length > 0) {
      state.contextsHistory.sort((c1, c2) => ((c1.creationTime === c2.creationTime) ? 0 : ((c1.creationTime > c2.creationTime) ? -1 : 1)));
    }
    return state.contextsHistory;
  },

  contextReloaded: (state, getters) => getters.context !== null && typeof getters.context.restored !== 'undefined' && getters.context.restored,


  /**
   * The session, very important accessing it using getter
   */
  session: state => state.session,

  scaleReference: (state, getters) => {
    if (getters.context !== null) {
      return getters.context.scaleReference;
    }
    return state.scaleReference;
  },

  isScaleLocked: state => state.scaleLocked,

  /**
   * The search results
   */
  searchResult: state => state.searchResult,

  /**
   * Interactive mode
   */
  interactiveMode: state => state.interactiveMode,
};

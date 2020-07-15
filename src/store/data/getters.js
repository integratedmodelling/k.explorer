/* eslint no-confusing-arrow: ["error", {"allowParens": true}] */
import { findNode, findNodeById } from 'shared/Helpers';
import { SCALE_TYPE } from 'shared/Constants';

export default {
  /**
   * Session reference
   *
   * @param state
   * @returns {null}
   */
  sessionReference: state => state.sessionReference,

  /**
   * The observations tree
   */
  tree: state => state.tree,

  treeNode: state => id => findNodeById(state.tree, id),

  lasts: state => state.lasts,

  hasTree: state => state.tree.length > 0,

  mainTreeHasNodes: state => (visible = false) => findNode(state.tree, '', (node) => {
    if (!node.userNode && (!visible || node.ticked)) {
      return node;
    }
    return null;
  }) !== null,

  userTree: state => state.userTree,

  /**
   * Return observations of a viewer
   * If viewer not exists, return empty array
   */
  observations: state => state.observations,
  observationsOfViewer: state => viewerIdx => state.observations.filter(observation => observation.viewerIdx === viewerIdx),

  hasObservations: state => state.observations.length !== 0,
  visibleObservations: state => state.observations.filter(observation => observation.visible),
  observationsIdOnTop: state => state.observations.filter(o => o.top).map(o => o.id),

  contextMenuObservationId: state => state.contextMenuObservationId,

  timeEvents: state => state.timeEvents,
  timeEventsOfObservation: state => id => state.timeEvents.filter(e => e.id === id),
  timeEventsUntil: state => timestamp => state.timeEventsEvents.filter(e => e.timestamp <= timestamp),
  modificationsTask: state => state.modificationsTask,

  visibleEvents: (state) => {
    const ids = state.observations.filter(observation => observation.visible).map(o => o.id);
    return state.timeEvents.filter(me => ids.includes(me.id));
  },

  timestamp: state => state.timestamp,
  engineTimestamp: state => state.engineTimestamp,

  dataflow: state => state.dataflow,
  hasDataflow: state => state.dataflow !== null,

  dataflowStatuses: state => state.dataflowStatuses,
  dataflowInfo: state => state.dataflowInfo,

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
  contextCustomLabel: state => (state.contextCustomLabel !== null ? state.contextCustomLabel : null),
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
  contextHasTime: (state, getters) => getters.context !== null && getters.context.scaleReference && getters.context.scaleReference.end !== 0,

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
  nextScale: state => state.nextScale,
  hasNextScale: state => (type = null) => state.nextScale !== null
    && (type === null || (type === SCALE_TYPE.ST_SPACE && state.nextScale.spaceChanged)
      || (type === SCALE_TYPE.ST_SPACE && state.nextScale.spaceChanged)),

  capabilities: state => state.capabilities,

  /**
   * The search results
   */
  searchResult: state => state.searchResult,

  /**
   * Interactive mode
   */
  interactiveMode: state => state.interactiveMode,

  /**
   * Is crossing IDL
   */
  isCrossingIDL: state => state.crossingIDL,
};

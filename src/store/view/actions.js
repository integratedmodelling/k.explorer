import moment from 'moment';
import { Helpers, Constants } from 'shared/Helpers';

export default {
  pushLogAction: ({ commit }, { type, payload }) => {
    commit('PUSH_LOG_ACTION', {
      type,
      payload,
      time: moment(),
    });
  },

  setContextLayer: ({ commit, dispatch }, contextData) => {
    // If context layer change, mutation reset everything
    commit('SET_CONTEXT_LAYER', Helpers.getLayerObject(contextData, { isContext: true }));
    // context need a viewer (if no observation, I need to see the context)
    dispatch('assignViewer', { observation: contextData, main: true });
  },

  /*
  addViewerElement: ({ commit }, { main = false, type }) => new Promise((resolve) => {
    commit('ADD_VIEWER_ELEMENT', { main, type, callback: resolve });
  }),
  */

  setMainViewer: ({ commit }, idx) => {
    commit('SET_MAIN_VIEWER', idx);
  },

  assignViewer: ({
    commit,
    getters,
    dispatch,
    rootGetters,
  }, { observation, main = false }) =>
    new Promise((resolve, reject) => {
      // check what we need to do with observation based on his type
      let viewerType;
      // set the viewer type.
      // TODO now using observation type, better way will be need
      if (observation.observationType) {
        switch (observation.observationType) {
          case Constants.OBSTYP_STATE:
            if (observation.valueCount === 1) {
              // if valueCount === 1, is added to tree but is not something to view in viewer
              viewerType = null;
            } else {
              // is a map but...
              viewerType = Constants.VIEW_MAP;
              // i need WKT from parent
              if (observation.parentId === rootGetters['data/contextId']) {
                // parent is context
                observation.encodedShape = rootGetters['data/fullContext'].encodedShape;
              } else {
                // search for parent in tree
                const parent = Helpers.findNodeById(rootGetters['data/tree'], observation.parentId);
                if (parent !== null) {
                  observation.encodedShape = parent.encodedShape;
                } else {
                  console.warn(`Need parent of ${observation.id} but doesn't find it. Parent id is ${observation.parentId}`);
                }
              }
            }
            break;
          case Constants.OBSTYP_INITIAL:
          case Constants.OBSTYP_SUBJECT:
            viewerType = Constants.VIEW_MAP;
            break;
          case Constants.OBSTYP_CONFIGURATION:
            viewerType = Constants.VIEW_GRAPH;
            break;
          case Constants.OBSTYP_EVENT:
          case Constants.OBSTYP_PROCESS:
          case Constants.OBSTYP_RELATIONSHIP:
            viewerType = Constants.VIEW_UNKNOWN;
            break;
          default:
            reject(new Error(`Unknown observation type ${JSON.stringify(observation)}`));
            break;
        }
      }
      if (viewerType !== null) {
        console.log(`Need a viewer of type ${viewerType}`);
        const viewer = getters.viewers.find(v => v.type === viewerType);
        // if no viewer, create it
        if (typeof viewer === 'undefined') {
          console.log(`Create new viewer of type ${viewerType}`);
          commit('ADD_VIEWER_ELEMENT', {
            main,
            type: viewerType,
            callback: (idx) => {
              resolve(idx);
            },
          });
        } else {
          if (main) {
            dispatch('setMainViewer', viewer.idx);
          }
          resolve(viewer.idx);
        }
      } else {
        resolve(null);
      }
    }),

  setSpinner: ({ commit }, {
    animated,
    color,
    owner = null,
    time = null,
    then = null,
    errorMessage = null,
  }) => {
    if (owner !== null) {
      // TODO implement this, only owner can change animated to false
    }
    commit('SET_SPINNER', { animated, color, errorMessage });
    if (time !== null && then !== null) {
      setTimeout(() => {
        commit('SET_SPINNER', { animated: then.animated, color: then.color });
      }, time * 1000);
    }
  },

  searchStart: ({ commit }) => {
    commit('SEARCH_ACTIVE', true);
  },

  searchStop: ({ commit }) => {
    commit('SEARCH_ACTIVE', false);
  },
};


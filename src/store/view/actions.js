import moment from 'moment';
import { Helpers, Constants } from 'shared/Helpers';
import { VIEWERS } from 'shared/Constants';
import { transform } from 'ol/proj';

export default {
  addToKexplorerLog: ({ commit }, { type, payload }) => {
    commit('ADD_TO_KEXPLORER_LOG', {
      type,
      payload,
      time: moment(),
    });
  },

  addToKlabLog: ({ commit }, {
    type, id, payload, timestamp,
  }) => {
    commit('ADD_TO_KLAB_LOG', {
      type,
      id,
      payload,
      time: moment(timestamp),
    });
  },

  setContextLayer: ({ commit, dispatch }, contextData) => {
    // If context layer change, mutation reset everything
    Helpers.getContextGeometry(contextData).then((layer) => {
      commit('SET_CONTEXT_LAYER', layer);
      commit('RESET_SEARCH'); // stop any search, if new context, previous search has no sense
      // context need a viewer (if no observation, I need to see the context)
      dispatch('assignViewer', { observation: contextData, main: true });
    });
  },

  resetContext: ({ commit }) => {
    commit('SET_CONTEXT_LAYER', null);
    commit('SET_MAIN_VIEWER', VIEWERS.DATA_VIEWER);
    commit('RESET_SEARCH');
    commit('SET_OBSERVATION_INFO', null);
  },
  /*
  addViewerElement: ({ commit }, { main = false, type }) => new Promise((resolve) => {
    commit('ADD_VIEWER_ELEMENT', { main, type, callback: resolve });
  }),
  */

  setMainViewer: ({ commit }, viewer) => {
    commit('SET_MAIN_VIEWER', viewer);
  },

  setMainDataViewer: ({ commit }, idx) => {
    commit('SET_MAIN_DATA_VIEWER', idx);
  },

  assignViewer: ({
    commit,
    getters,
    dispatch,
    rootGetters,
  }, { observation, main = false }) => new Promise((resolve, reject) => {
    // check what we need to do with observation based on his type
    let viewerType = null;
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
      const viewer = getters.dataViewers.find(v => v.type === viewerType);
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
          dispatch('setMainDataViewer', viewer.idx);
        }
        resolve(viewer.idx);
      }
    } else {
      resolve(null);
    }
  }),

  setSpinner: ({ commit, getters, dispatch }, {
    animated,
    color,
    time = null,
    then = null,
    errorMessage = null,
    owner,
  }) => new Promise((resolve) => {
    if (owner && owner !== null) {
      if (animated) {
        commit('ADD_TO_SPINNER_OWNERS', owner);
      } else {
        commit('REMOVE_FROM_SPINNER_OWNERS', owner);
        if (getters.spinnerOwners.length !== 0) {
          // there are other process waiting for spinner
          animated = true;
          if (color !== Constants.SPINNER_ERROR.color) {
            ({ color } = Constants.SPINNER_LOADING);
          }
        }
      }
      commit('SET_SPINNER', { animated, color, errorMessage });
      if (time !== null && then !== null) {
        // time and then for error are defined in Constants
        setTimeout(() => {
          dispatch('setSpinner', { ...then, owner });
        }, time * 1000);
      }
      resolve();
    } else {
      throw new Error('No spinner owner!');
    }
  }),

  searchStart: ({ commit }, char = null) => {
    commit('SEARCH_ACTIVE', { active: true, char });
  },

  searchStop: ({ commit }) => {
    commit('SEARCH_ACTIVE', { active: false });
  },

  searchFocus: ({ commit }, { focused, char = null }) => {
    commit('SEARCH_FOCUS', { focused, char });
  },

  resetSearchLostChar: ({ commit }) => {
    commit('RESET_SEARCH_LOST_CHAR');
  },

  storePreviousSearch: ({ commit }, searchArray) => {
    commit('STORE_SEARCH', searchArray);
  },

  setReloadReport: ({ commit }, reload) => {
    commit('SET_RELOAD_REPORT', reload);
  },

  setObservationInfo: ({ commit }, observation) => {
    commit('SET_OBSERVATION_INFO', observation);
  },

  setMapSelection: ({ commit, state }, { pixelSelected, layerSelected }) => {
    if (pixelSelected !== null && layerSelected !== null) {
      const url = `${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}data/${state.observationInfo.id}`;
      const coordinates = transform(pixelSelected, 'EPSG:3857', 'EPSG:4326');
      Helpers.getAxiosContent(`pv_${state.observationInfo.id}`, url, {
        params: {
          format: 'SCALAR',
          locator: `S0(1){latlon=[${coordinates[0]} ${coordinates[1]}]}`,
        },
      }, (response, callback) => {
        let value = 'No value';
        if (response && response.data) {
          value = response.data;
        }
        commit('SET_MAP_SELECTION', { pixelSelected, layerSelected, value });
        callback();
      });
    }
  },
};

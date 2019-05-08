import moment from 'moment';
import { getAxiosContent, getContextGeometry, findNodeById } from 'shared/Helpers';
import Constants, { VIEWERS, VIEWER_COMPONENTS, LEFTMENU_COMPONENTS, EMPTY_MAP_SELECTION } from 'shared/Constants';
import { transform } from 'ol/proj';

export default {
  addToKexplorerLog: ({ commit }, { type, payload, important = false }) => {
    commit('ADD_TO_KEXPLORER_LOG', {
      type,
      payload,
      important,
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

  addToStatusTexts: ({ commit }, { id, text }) => {
    commit('ADD_TO_STATUS_TEXTS', { id, text });
  },

  removeFromStatusTexts: ({ commit }, id) => {
    commit('REMOVE_FROM_STATUS_TEXTS', id);
  },

  setContextLayer: ({ commit, dispatch }, contextData) => {
    // If context layer change, mutation reset everything
    getContextGeometry(contextData).then((layer) => {
      commit('SET_CONTEXT_LAYER', layer);
      commit('RESET_SEARCH'); // stop any search, if new context, previous search has no sense
      // context need a viewer (if no observation, I need to see the context)
      dispatch('assignViewer', { observation: contextData, main: true });
    });
  },

  resetContext: ({ commit }) => {
    commit('SET_CONTEXT_LAYER', null);
    commit('RESET_SEARCH');
    commit('SET_OBSERVATION_INFO', null);
    const viewer = VIEWERS.DATA_VIEWER;
    //  (state.mainViewer && state.mainViewer.leftMenuContent === LEFTMENU_COMPONENTS.DOCKED_DATA_VIEWER_COMPONENT)
    //  ? VIEWERS.DOCKED_DATA_VIEWER : VIEWERS.DATA_VIEWER;
    commit('SET_LEFTMENU_CONTENT', viewer.leftMenuContent);
    commit('SET_LEFTMENU_STATE', viewer.leftMenuState);
    commit('SET_MAIN_VIEWER', viewer);
  },
  /*
  addViewerElement: ({ commit }, { main = false, type }) => new Promise((resolve) => {
    commit('ADD_VIEWER_ELEMENT', { main, type, callback: resolve });
  }),
  */

  setMainViewer: ({ state, commit, dispatch }, viewer) => {
    if (viewer && typeof state.mainViewer !== 'undefined') {
      if (state.mainViewer.leftMenuContent === LEFTMENU_COMPONENTS.DOCKED_DATA_VIEWER_COMPONENT) {
        commit('SET_MAIN_CONTROL_DOCKED', true);
      } else if (state.mainViewer.leftMenuContent === LEFTMENU_COMPONENTS.DATA_VIEWER_COMPONENT) {
        commit('SET_MAIN_CONTROL_DOCKED', false);
      }
    }
    commit('SET_MAIN_VIEWER', viewer);
    if (viewer) {
      dispatch('setLeftMenuState', viewer.leftMenuState);
      dispatch('setLeftMenuContent', viewer.leftMenuContent);
    }
  },

  setLeftMenuContent: ({ commit }, component) => {
    commit('SET_LEFTMENU_CONTENT', component);
  },

  setLeftMenuState: ({ commit }, visibility) => {
    commit('SET_LEFTMENU_STATE', visibility);
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
    let forceNew = false;
    let hiddenable = false;
    const visible = false; // for future implementation
    let label = null;
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
            let parent = null;
            if (observation.parentId === rootGetters['data/contextId']) {
              // parent is context
              parent = rootGetters['data/fullContext'];
            } else {
              // search for parent in tree
              parent = findNodeById(rootGetters['data/tree'], observation.parentId);
            }
            if (parent !== null) {
              observation.encodedShape = parent.encodedShape;
              ({ label } = parent);
            } else {
              console.warn(`Need parent of ${observation.id} but doesn't find it. Parent id is ${observation.parentId}`);
            }
          }
          break;
        case Constants.OBSTYP_INITIAL:
        case Constants.OBSTYP_SUBJECT:
        case Constants.OBSTYP_RELATIONSHIP: {
          viewerType = VIEWER_COMPONENTS.VIEW_MAP;
          // isn't context?
          let parent = null;
          if (observation.parentId !== null) {
            parent = findNodeById(rootGetters['data/tree'], observation.rootContextId);
            if (typeof parent === 'undefined') {
              console.warn(`Observation with id ${observation.id} has an invalid rootContextId: ${observation.rootContextId}`);
              parent = null;
            }
          }
          if (parent !== null) {
            ({ label } = parent);
          } else {
            ({ label } = observation);
          }
          break;
        }
        case Constants.OBSTYP_CONFIGURATION:
          viewerType = VIEWER_COMPONENTS.VIEW_GRAPH;
          forceNew = true;
          hiddenable = true;
          ({ label } = observation);
          break;
        case Constants.OBSTYP_EVENT:
        case Constants.OBSTYP_PROCESS:
          viewerType = VIEWER_COMPONENTS.VIEW_UNKNOWN;
          break;
        default:
          reject(new Error(`Unknown observation type ${JSON.stringify(observation)}`));
          break;
      }
    }
    if (viewerType !== null) {
      console.debug(`Need a viewer of type ${viewerType.component}`);
      let viewer;
      if (!forceNew) {
        viewer = getters.dataViewers.find(v => v.type === viewerType.component);
      }
      // if no viewer, create it
      if (typeof viewer === 'undefined') {
        console.info(`Create new viewer of type ${viewerType.component}`);
        commit('ADD_VIEWER_ELEMENT', {
          main,
          type: viewerType.component,
          label: label && label !== null ? label : viewerType.label,
          hiddenable,
          visible,
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

  setMapSelection: ({ commit, state }, { pixelSelected, layerSelected = null, observationId = null }) => {
    if (pixelSelected !== null) {
      if (observationId === null) {
        observationId = state.observationInfo.id;
      }
      const url = `${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}data/${observationId}`;
      const coordinates = transform(pixelSelected, 'EPSG:3857', 'EPSG:4326');
      getAxiosContent(`pv_${observationId}`, url, {
        params: {
          format: 'SCALAR',
          locator: `S0(1){latlon=[${coordinates[0]} ${coordinates[1]}]}`,
        },
      }, (response, callback) => {
        let value = 'No value';
        if (response && typeof response.data !== 'undefined') {
          value = response.data;
        }
        commit('SET_MAP_SELECTION', { pixelSelected, layerSelected, value });
        callback();
      });
    } else {
      commit('SET_MAP_SELECTION', EMPTY_MAP_SELECTION);
    }
  },

  setScaleEditing: ({ commit }, { active, type }) => {
    commit('SET_SCALE_EDITING', { active, type });
    commit('SET_MODAL_MODE', active);
  },

  setDrawMode: ({ commit }, drawMode) => {
    commit('SET_DRAW_MODE', drawMode);
    commit('SET_MODAL_MODE', drawMode);
  },

  setCustomContext: ({ commit }, customContext) => {
    commit('SET_CUSTOM_CONTEXT', customContext);
  },

  setTopLayer: ({ commit }, topLayer) => {
    commit('SET_TOP_LAYER', topLayer);
  },

  inputRequest: ({ commit }, inputRequest) => {
    commit('SET_INPUT_REQUEST', inputRequest);
    commit('SET_MODAL_MODE', true);
  },

  removeInputRequest: ({ commit, getters }, messageId) => {
    commit('REMOVE_INPUT_REQUEST', messageId);
    if (!getters.hasInputRequests) {
      commit('SET_MODAL_MODE', false);
    }
  },

  setModalMode: ({ commit }, modalMode) => {
    commit('SET_MODAL_MODE', modalMode);
  },
};

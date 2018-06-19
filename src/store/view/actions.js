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

  setContextLayer: ({ commit }, contextData) => {
    commit('SET_CONTEXT_LAYER', Helpers.getLayerShapeObject(contextData));
  },

  addViewerElement: ({ commit }, { main = false, type, observations }) => {
    commit('ADD_VIEWER_ELEMENT', { main, type, observations });
  },

  setMainViewer: ({ commit }, idx) => {
    commit('SET_MAIN_VIEWER', idx);
  },

  changeViewer: ({ commit }, selectedId) => {
    commit('SET_MAIN_VIEWER', selectedId);
  },

  assignViewer: ({ commit, getters, dispatch }, observation) => new Promise((resolve, reject) => {
    // find type of viewer using observation attribute shapeType
    // TODO this will change when a temporal observation would exists
    if (observation && observation.shapeType) {
      // TODO do something better than this shit
      const viewer = getters.viewersLayout.find(v => v.type === Constants.VIEW_MAP);
      if (typeof viewer === 'undefined') {
        dispatch('addViewerElement', {
          main: false,
          type: Constants.VIEW_MAP,
          observations: [observation],
        });
        resolve(getters.lastViewerId);
      } else {
        commit('ADD_OBSERVATION', { idx: viewer.idx, observation });
        resolve(viewer.idx);
      }
    } else {
      reject(new Error(`Unknown observation type ${JSON.stringify(observation)}`));
    }
  }),
};


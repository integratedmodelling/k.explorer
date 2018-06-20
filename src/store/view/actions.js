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
    // If context layer change, mutation reset everything
    commit('SET_CONTEXT_LAYER', Helpers.getLayerObject(contextData, true));
  },

  /*
  addViewerElement: ({ commit }, { main = false, type }) => new Promise((resolve) => {
    commit('ADD_VIEWER_ELEMENT', { main, type, callback: resolve });
  }),
  */

  setMainViewer: ({ commit }, idx) => {
    commit('SET_MAIN_VIEWER', idx);
  },

  assignViewer: ({ commit, /* getters, */ dispatch }, { observation, main = false }) => new Promise((resolve, reject) => {
    // find type of viewer using observation attribute shapeType
    // TODO this will change when a temporal observation would exists
    if (observation && observation.shapeType) {
      // TODO do something better than this shit
      // find a map viewer
      const viewer = undefined; // getters.viewersLayout.find(v => v.type === Constants.VIEW_MAP);

      // if no viewer, create it
      if (typeof viewer === 'undefined') {
        commit('ADD_VIEWER_ELEMENT', {
          main,
          type: Constants.VIEW_MAP,
          callback: (idx) => {
            commit('ADD_OBSERVATION', { idx, observation });
            resolve(idx);
          },
        });
      } else {
        commit('ADD_OBSERVATION', { idx: viewer.idx, observation });
        if (main) {
          dispatch('setMainViewer', viewer.idx);
        }
        resolve(viewer.idx);
      }
    } else {
      reject(new Error(`Unknown observation type ${JSON.stringify(observation)}`));
    }
  }),
};


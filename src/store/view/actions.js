import moment from 'moment';
import { Helpers } from 'shared/Helpers';

export default {
  pushLogAction: ({ commit }, { type, payload }) => {
    commit('PUSH_LOG_ACTION', {
      type,
      payload,
      time: moment(),
    });
  },

  setContextLayer: ({ commit }, contextData) => {
    commit('SET_CONTEXT_LAYER', Helpers.getContextShapeObject(contextData));
  },
  /*
  setOnIde: ({ commit }, payload) => {
    commit('SET_ON_IDE', payload);
    console.log(`On action: ${payload}`);
  },
  */
};


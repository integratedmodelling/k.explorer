import moment from 'moment';

export default {
  pushLogAction: ({ commit }, { type, payload }) => {
    commit('PUSH_LOG_ACTION', {
      type,
      payload,
      time: moment().valueOf(),
    });
  },
  /*
  setOnIde: ({ commit }, payload) => {
    commit('SET_ON_IDE', payload);
    console.log(`On action: ${payload}`);
  },
  */
};


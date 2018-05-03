export default {
  setOnIde: ({ commit }, payload) => {
    commit('SET_ON_IDE', payload);
    console.log(`On action: ${payload}`);
  },
};


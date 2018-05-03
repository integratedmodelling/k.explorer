export default {
  SET_ON_IDE: (state, payload) => {
    Object.keys(state.mainWin).forEach((k) => { state.mainWin[k] = !payload; });
  },
};


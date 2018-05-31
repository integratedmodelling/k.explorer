export default {
  PUSH_LOG_ACTION: (state, action) => {
    state.logActions.push(action);
  },
  /*
  SET_ON_IDE: (state, payload) => {
    Object.keys(state.mainWin).forEach((k) => { state.mainWin[k] = !payload; });
  },
  */
};


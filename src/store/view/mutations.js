import { Helpers } from 'shared/Helpers';

export default {
  PUSH_LOG_ACTION: (state, action) => {
    Helpers.pushElementInFixedQueue(state.logActions, action);
  },
  /*
  SET_ON_IDE: (state, payload) => {
    Object.keys(state.mainWin).forEach((k) => { state.mainWin[k] = !payload; });
  },
  */
};


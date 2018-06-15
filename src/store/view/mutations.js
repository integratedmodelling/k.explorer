import { Helpers } from 'shared/Helpers';

export default {
  PUSH_LOG_ACTION: (state, action) => {
    Helpers.pushElementInFixedQueue(state.logActions, action);
  },

  SET_CONTEXT_LAYER: (state, contextLayer) => {
    state.contextLayer = contextLayer;
  },
  /*
  SET_ON_IDE: (state, payload) => {
    Object.keys(state.mainWin).forEach((k) => { state.mainWin[k] = !payload; });
  },
  */
};


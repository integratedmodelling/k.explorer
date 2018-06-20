import Constants from 'shared/Constants';

export default {
  hasPalette: state => state.mainWin.paletteVisible,
  lastLogAction: state => (type) => {
    if (type === undefined) {
      type = Constants.TYPE_ALL;
    }
    if (state.logActions.length > 0) {
      return (type === Constants.TYPE_ALL) ?
        state.logActions[state.logActions.length - 1] :
        [...state.logActions].reverse().find(logAction => logAction.type === type);
    }
    return null;
  },
  contextLayer: state => state.contextLayer,
  /**
   * Created viewers
   */
  viewersLayout: state => state.viewersLayout,

  /**
   * The unique viewer with main: true
   */
  mainViewer: state => state.viewersLayout
    .find(viewer => viewer.main),


  lastViewerId: state => state.lastViewerId,

  /**
   * Return a viewer identify by idx.
   */
  viewer: state => (idx) => {
    if (state.viewersLayout.length > 0) {
      return state.viewersLayout.find(v => v.idx === idx);
    }
    return null;
  },

  /**
   * Return observations of a viewer
   * If viewer not exists, return empty array
   */
  observations: (state, getters) => (idx) => {
    const viewer = getters.viewer(idx);
    if (viewer !== null) {
      return viewer.observations;
    }
    return [];
  },
};

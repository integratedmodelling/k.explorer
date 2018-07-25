import Constants from 'shared/Constants';
import { colors } from 'quasar';

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
  viewers: state => state.viewers,

  /**
   * The unique viewer with main: true
   */
  mainViewer: state => state.viewers
    .find(viewer => viewer.main),


  lastViewerId: state => state.lastViewerId,

  /**
   * Return a viewer identify by idx.
   */
  viewer: state => (idx) => {
    if (state.viewers.length > 0) {
      return state.viewers.find(v => v.idx === idx);
    }
    return null;
  },

  spinnerColor: state => state.spinner.color,
  spinnerIsAnimated: state => state.spinner.animated,
  spinner: state => ({
    ...state.spinner,
    colorValue: colors.getBrand(state.spinner.color),
  }),

  searchIsActive: state => state.searchActive,
  searchIsFocused: state => state.searchFocus,
};

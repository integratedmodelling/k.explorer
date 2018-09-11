import { Helpers } from 'shared/Helpers';

export default {
  hasPalette: state => state.mainWin.paletteVisible,

  /**
   * LOGS
   */
  kexplorerLog: state => state.kexplorerLog,
  lastKexplorerLog: state => type => Helpers.lastFilteredLogElement(state.kexplorerLog, type),
  // reverseLogActions: state => state.kexplorerLog.slice().reverse(),
  klabLog: state => state.klabLog,
  lastKlabLog: state => type => Helpers.lastFilteredLogElement(state.klabLog, type),
  klabLogReversedAndFiltered: state => (type) => {
    if (state.klabLog.length === 0) {
      return state.klabLog;
    }
    const reversed = [...state.klabLog].reverse();
    if (type === undefined) {
      return reversed;
    }
    return reversed.find(log => log.type === type);
  },


  /**
   * Context layer
   */
  contextGeometry: state => state.contextGeometry,

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

  spinnerIsAnimated: state => state.spinner.animated,
  spinner: state => state.spinner,
  spinnerOwners: state => state.spinnerOwners,

  searchIsActive: state => state.searchActive,
  searchIsFocused: state => state.searchFocus,
  searchLostChar: state => state.searchLostChar,
  searchHistory: state => state.searchHistory,
};

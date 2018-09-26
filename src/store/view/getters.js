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
   * Return the main viewer
   * @param state
   */
  mainViewer: state => state.mainViewer,

  /**
   * Context layer
   */
  contextGeometry: state => state.contextGeometry,

  /**
   * Created dataViewers
   */
  dataViewers: state => state.dataViewers,

  /**
   * The unique viewer with main: true
   */
  mainDataViewer: state => state.dataViewers
    .find(dv => dv.main),


  lastViewerId: state => state.lastViewerId,

  /**
   * Return a viewer identify by idx.
   */
  viewer: state => (idx) => {
    if (state.dataViewers.length > 0) {
      return state.dataViewers.find(v => v.idx === idx);
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

  reloadReport: state => state.reloadReport,

  observationInfo: state => state.observationInfo,
  mapSelection: state => state.mapSelection,

  hasObservationInfo: state => state.observationInfo !== null,
  hasMapSelection: state => state.mapSelection.pixelSelected !== null,

  exploreMode: (state) => {
    if (state.observationInfo !== null
      && Helpers.isRaster(state.observationInfo)
      && state.observationInfo.dataSummary.histogram.length > 0
      && state.observationInfo.visible
      && state.observationInfo.top) {
      return true;
    }
    return false;
  },

};

import { lastFilteredLogElement, isRasterObservation } from 'shared/Helpers';
import { getColorObject } from 'shared/Utils';
import { LEFTMENU_CONSTANTS } from 'shared/Constants';

export default {
  /**
   * LOGS
   */
  kexplorerLog: state => state.kexplorerLog,
  lastKexplorerLog: state => type => lastFilteredLogElement(state.kexplorerLog, type),
  // reverseLogActions: state => state.kexplorerLog.slice().reverse(),
  klabLog: state => state.klabLog,
  lastKlabLog: state => type => lastFilteredLogElement(state.klabLog, type),
  klabLogReversedAndFiltered: state => (types = []) => {
    if (state.klabLog.length === 0) {
      return [];
    }
    const reversed = [...state.klabLog].reverse();
    if (types.length === 0) {
      return reversed;
    }
    return reversed.filter(log => types.includes(log.type));
  },
  levels: state => state.levels,

  statusTexts: state => state.statusTexts,
  statusTextsLength: state => state.statusTexts.length,
  statusTextsString: state => (state.statusTexts.length > 0 ? state.statusTexts.map(st => st.text).join(' - ') : ''),

  /**
   * Return the main viewer
   * @param state
   */
  mainViewer: state => state.mainViewer,
  mainViewerName: state => (state.mainViewer ? state.mainViewer.name : null),
  isTreeVisible: state => state.treeVisible,
  leftMenuContent: state => state.leftMenuContent,
  leftMenuState: state => state.leftMenuState,
  isDocked: state => state.leftMenuState !== LEFTMENU_CONSTANTS.LEFTMENU_HIDDEN,
  hasMainControl: state => state.mainViewer && state.mainViewer.mainControl,
  isMainControlDocked: state => state.mainControlDocked,
  // indicate if actual viewer admit search
  admitSearch: state => state.mainViewer && state.mainViewer.hasSearch,
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

  mainDataViewerIdx: state => state.mainDataViewerIdx,


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
  spinnerColor: state => (state.spinner !== 'undefined' && state.spinner !== null ? getColorObject(state.spinner.color) : null),
  spinnerErrorMessage: state => (state.spinner !== 'undefined' && state.spinner !== null ? state.spinner.errorMessage : null),

  searchIsActive: state => state.searchActive,
  searchIsFocused: state => state.searchFocus,
  searchLostChar: state => state.searchLostChar,
  searchHistory: state => state.searchHistory,
  searchInApp: state => state.searchInApp,

  dataflowInfoOpen: state => state.dataflowInfoOpen,

  observationInfo: state => state.observationInfo,
  mapSelection: state => state.mapSelection,

  hasObservationInfo: state => state.observationInfo !== null,

  /**
   * Store view of explorer mode
   * @returns {boolean} true if k.eplorer is in explore mode
   */
  exploreMode: (state) => {
    if (state.observationInfo !== null // an observation info is present
      && isRasterObservation(state.observationInfo) // is RASTER: TODO need to ampliate this
      && state.observationInfo.dataSummary.histogram.length > 0 // has histogram with values
      && state.observationInfo.visible // is visible
      && state.observationInfo.top) { // is on top
      return true;
    }
    return false;
  },

  isScaleEditing: state => state.scaleEditing.active,
  scaleEditingType: state => state.scaleEditing.type,

  isDrawMode: state => state.drawMode,
  hasCustomContext: state => state.customContext,

  topLayer: state => state.topLayer,
  topLayerId: state => (state.topLayer !== null ? state.topLayer.id : null),

  inputRequests: state => state.inputRequests,
  hasInputRequests: state => state.inputRequests.length !== 0,
  isInModalMode: state => state.modalMode,
  isHelpShown: state => state.helpShown,
  modalSize: state => state.modalSize,
  fuzzyMode: state => state.fuzzyMode,
  largeMode: state => state.largeMode,
  isTimeRunning: state => state.timeRunning,

  /**
   * Layout from k.LAB
   */
  layout: state => state.layout,
  modalWindow: state => state.modalWindow,
  hasHeader: state => (state.layout && (state.layout.header || state.layout.logo || state.layout.label || state.layout.description)),
  windowSide: state => state.windowSide,
  isApp: state => state.klabApp !== null,
  klabApp: state => state.klabApp,
  activeDialogs: state => state.dialogs.filter(a => !a.dismiss),

  engineEvents: state => state.engineEvents,
  engineEventsCount: state => state.engineEvents.length,
  hasShowSettings: state => state.showSettings,

  notificationsParams: state => state.notificationsParams,

  reloadViews: state => state.reloadViews,
  documentationView: state => state.documentationView,
  documentationSelected: state => state.documentationSelected,
  tableFontSize: state => state.tableFontSize,
  textFontSize: state => state.textFontSize,
};

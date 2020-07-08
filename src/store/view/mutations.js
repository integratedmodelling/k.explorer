import { pushElementInFixedQueue } from 'shared/Helpers';
import { CONSTANTS, WEB_CONSTANTS } from 'shared/Constants';
import { Cookies } from 'quasar';
import { ENGINE_EVENTS } from '../../shared/Constants';

export default {
  ADD_TO_KEXPLORER_LOG: (state, log) => {
    pushElementInFixedQueue(state.kexplorerLog, log);
    // console.debug(`${log.type}: ${JSON.stringify(log.payload, null, 4)}`);
  },

  ADD_TO_KLAB_LOG: (state, log) => {
    pushElementInFixedQueue(state.klabLog, log);
  },

  SET_LEVELS: (state, levels) => {
    if (levels) {
      state.levels = levels;
    }
  },

  TOGGLE_LEVEL: (state, level) => {
    const idx = state.levels.indexOf(level);
    if (idx === -1) {
      state.levels.push(level);
    } else {
      state.levels.splice(idx, 1);
    }
  },

  ADD_TO_STATUS_TEXTS: (state, { id, text }) => {
    state.statusTexts.push({ id, text });
  },

  REMOVE_FROM_STATUS_TEXTS: (state, id) => {
    const index = state.statusTexts.findIndex(st => st.id === id);
    if (index !== -1) {
      state.statusTexts.splice(index, 1);
    }
  },

  SET_CONTEXT_LAYER: (state, contextGeometry) => {
    // when a new context exists, we must reset everything
    state.dataViewers.splice(0, state.dataViewers.length);
    state.lastViewerId = 0;
    state.contextGeometry = contextGeometry;
    state.treeExpanded = [];
    state.treeTicked = [];
    state.statusTexts = [];
    state.treeSelected = null;
    state.topLayer = null;
  },

  /**
   * Set the main viewer in index page
   * @param viewer the viewer component name
   */
  SET_MAIN_VIEWER: (state, viewer) => {
    state.mainViewer = viewer;
  },

  /**
   * set the left menu content
   * @param state
   * @param visibility
   * @constructor
   */
  SET_LEFTMENU_CONTENT: (state, content) => {
    state.leftMenuContent = content;
  },

  /**
   * set the left menu visibility
   * @param state
   * @param visibility
   * @constructor
   */
  SET_LEFTMENU_STATE: (state, visibility) => {
    state.leftMenuState = visibility;
  },
  /**
   * Set the main data viewer by viewer index
   * @param idx the viewer idx
   */
  SET_MAIN_DATA_VIEWER: (state, { viewerIdx, visible }) => {
    if (visible) {
      state.dataViewers.forEach((viewer) => {
        if (viewer.idx === viewerIdx) {
          viewer.main = true;
          state.mainDataViewerIdx = viewerIdx;
        } else {
          viewer.main = false;
        }
        viewer.visible = !viewer.type.hideable || viewer.idx === viewerIdx || viewer.visible;
      });
    } else {
      let first = false;
      state.dataViewers.forEach((viewer) => {
        if (!first && (!viewer.type.hideable || viewer.visible)) {
          viewer.main = true;
          state.mainDataViewerIdx = viewer.idx;
          first = true;
        } else {
          viewer.main = false;
          if (viewer.type.hideable && viewer.idx === viewerIdx) {
            viewer.visible = false;
          }
        }
      });
    }
  },

  RESET_MAIN_DATA_VIEWER: (state) => {
    state.dataViewer = [];
    state.mainDataViewerIdx = 0;
  },

  SET_SAVE_DOCKED_STATUS: (state, saveDockedStatus) => {
    state.saveDockedStatus = saveDockedStatus;
  },

  SET_MAIN_CONTROL_DOCKED: (state, docked) => {
    state.mainControlDocked = docked;
    if (state.saveDockedStatus) {
      Cookies.set(WEB_CONSTANTS.COOKIE_DOCKED_STATUS, docked, {
        expires: 30,
        path: '/',
      });
    }
  },

  /**
   * Add a viewer to Main Viewer
   * No observation added
   * @param main if true, is the main viewer
   * @param type one of contstants.VIEWER_[TYPE]
   * @param data content of viewer
   */
  ADD_VIEWER_ELEMENT: (state, { main, type, label, visible, callback }) => {
    // if first, than main
    if (state.lastViewerId === 0) {
      main = true;
      // if new main, every before is false
    } else if (main === true) {
      state.dataViewers.forEach((viewer) => { viewer.main = false; });
    } // TODO do something if is false and all are false
    // first viewer has index = 1
    state.lastViewerId += 1;
    state.dataViewers.push({
      idx: state.lastViewerId,
      main,
      type,
      label,
      visible,
      observations: [],
    });
    if (typeof callback === 'function') {
      callback(state.lastViewerId);
    }
  },

  SET_SPINNER_ANIMATED: (state, animated) => {
    state.spinner.animated = animated;
  },
  SET_SPINNER_COLOR: (state, color) => {
    state.spinner.color = color;
  },
  SET_SPINNER: (state, { animated, color, errorMessage = null }) => {
    state.spinner = { animated, color, errorMessage };
  },
  ADD_TO_SPINNER_OWNERS: (state, owner) => {
    const index = state.spinnerOwners.indexOf(owner);
    if (index === -1) {
      state.spinnerOwners.push(owner);
    }
  },
  REMOVE_FROM_SPINNER_OWNERS: (state, owner) => {
    const index = state.spinnerOwners.indexOf(owner);
    if (index !== -1) {
      state.spinnerOwners.splice(index, 1);
    }
  },
  /**
   * Activate and deactivate search
   * @param active if true, search is active
   * @constructor
   */
  SEARCH_ACTIVE: (state, { active, char = '' }) => {
    if (state.searchActive !== active) {
      state.searchLostChar = char;
      state.searchActive = active;
    }
  },

  SEARCH_FOCUS: (state, { focused, char = '' }) => {
    if (state.searchFocus !== focused) {
      state.searchLostChar = char;
      state.searchFocus = focused;
    }
  },

  RESET_SEARCH_LOST_CHAR: (state) => {
    state.searchLostChar = '';
  },

  RESET_SEARCH: (state) => {
    state.searchActive = false;
    state.searchFocus = false;
    state.searchLostChar = '';
  },

  STORE_SEARCH: (state, searchArray) => {
    state.searchHistory.unshift(searchArray);
  },

  SET_RELOAD_REPORT: (state, reload) => {
    state.reloadReport = reload;
  },

  SET_RELOAD_DATAFLOW: (state, reload) => {
    state.reloadDataflow = reload;
  },

  SET_OBSERVATION_INFO: (state, observation) => {
    if (observation === null) {
      state.treeSelected = null;
      if (!state.mapSelection.locked) {
        state.mapSelection = CONSTANTS.EMPTY_MAP_SELECTION;
      }
      state.observationInfo = null;
    } else if (state.observationInfo === null || (observation.id !== state.observationInfo.id)) {
      // new observation selected
      state.observationInfo = observation;
      // we need to reset mapSelection if is not locked
      if (!state.mapSelection.locked) {
        state.mapSelection = CONSTANTS.EMPTY_MAP_SELECTION;
      }
      // and select it on tree
      state.treeSelected = observation.id;
    }
  },

  /**
   * map selection exists only if there is an observation info
   * Used to watch only this
   * @param mapSelection
   * @property pixelSelected
   * @property layerSelected
   * @constructor
   */
  SET_MAP_SELECTION: (state, mapSelection) => {
    const { pixelSelected, layerSelected, value = null, locked = false } = mapSelection;
    if (mapSelection === null || pixelSelected === null) { // map selection reset or strange values
      state.mapSelection = CONSTANTS.EMPTY_MAP_SELECTION;
    } else {
      state.mapSelection = {
        pixelSelected,
        layerSelected,
        value,
        locked,
      };
    }
    /*
    Now the selection can be made directly on map
    else if (state.observationInfo === null) {
      console.warn('Try to set pixel and layer without observationInfo, will be skipped');
    } else if (`cl_${state.observationInfo.id}` !== layerSelected.get('id')) {
      console.warn('Try to set pixel and layer with different observationInfo id, will be skipped');
    }
    */
  },

  SET_SCALE_EDITING: (state, { active, type }) => {
    state.scaleEditing = {
      active,
      type,
    };
  },

  SET_DRAW_MODE: (state, drawMode) => {
    state.drawMode = drawMode;
  },

  SET_CUSTOM_CONTEXT: (state, customContext) => {
    state.customContext = customContext;
  },

  SET_SAVE_LOCATION: (state, saveLocation) => {
    state.saveLocation = saveLocation;
  },

  SET_TOP_LAYER: (state, topLayer) => {
    state.topLayer = topLayer;
  },

  SET_MODAL_MODE: (state, modalMode) => {
    state.modalMode = modalMode;
  },

  SET_INPUT_REQUEST: (state, { payload, id }) => {
    state.inputRequests.push({
      messageId: id,
      ...payload,
    });
  },

  REMOVE_INPUT_REQUEST: (state, messageId) => {
    if (state.inputRequests.length > 0) {
      if (messageId === null) {
        state.inputRequests.splice(0, state.inputRequests.length);
      } else {
        const index = state.inputRequests.findIndex(ir => ir.messageId === messageId);
        if (index !== -1) {
          state.inputRequests.splice(index, 1);
        }
      }
    }
  },

  SET_MODAL_SIZE: (state, { width, height }) => {
    state.modalSize = { width, height };
  },
  SET_FUZZY_MODE: (state, fuzzyMode) => {
    state.fuzzyMode = fuzzyMode;
  },

  /**
   * Change the large mode using boolean
   * @param largeMode 0 = reset; true = increment; false = decrement
   * @constructor
   */
  SET_LARGE_MODE: (state, largeMode) => {
    if (largeMode < 0) {
      largeMode = 0;
    } else if (largeMode > 6) {
      largeMode = CONSTANTS.MAX_SEARCHBAR_INCREMENTS;
    }
    state.largeMode = largeMode;
  },

  SET_TIME_RUNNING: (state, timeRunning) => {
    state.timeRunning = timeRunning;
  },

  SET_LAYOUT: (state, layout) => {
    /*
    const panels = [
      ...layout.panels,
      ...layout.leftPanels,
      ...layout.rightPanels,
      layout.header,
      layout.footer,
    ].filter(p => p !== null);
    if (panels.length > 0) {
      const updateTree = (node) => {
        if (node.type === 'Tree') {
          node.ticked = [];
          node.expanded = [];
          node.selected = null;
        } else if (node.type === 'CheckButton') {
          node.selected = false;
        }
        if (node.components && node.components.length > 0) {
          node.components.forEach((c) => {
            updateTree(c);
          });
        }
      };
      panels.forEach((p) => {
        updateTree(p);
      });
    }
     */
    state.layout = layout;
    /*
    if (!state.layouts.find(l => l.id === layout.id)) {
      state.layouts.push(layout);
    }
    */
  },

  CREATE_VIEW_COMPONENT: (state, component) => {
    const findComponent = (layout, key = null) => {
      if (layout && key !== null) {
        const { reduce } = [];
        const find = (result, c) => {
          if (result || !c) {
            return result;
          }
          if (Array.isArray(c)) {
            return reduce.call(Object(c), find, result);
          }
          if (c.id === key) {
            return c;
          }
          if (c !== null && c.components && c.components.length > 0) {
            return find(null, c.components);
          }
          return null;
        };
        return find(null, layout);
      }
      return null;
    };
    const existingComponent = findComponent([
      ...state.layout.panels,
      ...state.layout.leftPanels,
      ...state.layout.rightPanels,
      state.layout.header,
      state.layout.footer,
    ], component.id);
    if (existingComponent) {
      console.log('Updating component: ', JSON.stringify(existingComponent, null, 2));
      Object.assign(existingComponent, component);
      console.log('Updated component: ', JSON.stringify(existingComponent, null, 2));
    } else {
      const parent = findComponent(state.layout, component.parentId);
      if (parent) {
        parent.children.push(component);
        console.warn('Update parent: ', parent);
      }
    }
  },

  SET_ENGINE_EVENT: (state, event) => {
    if (state.engineEvents !== null) {
      switch (event.type) {
        case ENGINE_EVENTS.RESOURCE_VALIDATION: {
          const eventIndex = state.engineEvents.findIndex(ee => ee.id === event.id);
          if (event.started) {
            if (eventIndex === -1) {
              state.engineEvents.push({ id: event.id, timestamp: event.timestamp });
            } else {
              console.debug('Try to start an existing engine event', event);
            }
          } else if (eventIndex !== -1) {
            state.engineEvents.splice(eventIndex, 1);
          } else {
            console.debug('Try to stop an unregistered engine event', event);
          }
          console.debug(`Engine event with id ${event.id} ${event.started ? 'start' : 'stop'} / total engine events: ${state.engineEvents.length}`);
          break;
        }
        default:
          break;
      }
    } else {
      console.debug('Receive an engine event before subscription');
    }
  },
};

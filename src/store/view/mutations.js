import { pushElementInFixedQueue, findInLayout, findComponent } from 'shared/Helpers';
import { CONSTANTS, WEB_CONSTANTS, ENGINE_EVENTS, APPS_COMPONENTS } from 'shared/Constants';
import { Cookies } from 'quasar';

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
    state.reloadViews.splice(0, state.reloadViews.length);
    state.documentationSelected = null;
    state.modalWindow = null;
  },

  /**
   * Set the main viewer in index page
   * @param viewer the viewer component name
   */
  SET_MAIN_VIEWER: (state, viewer) => {
    state.mainViewer = viewer;
  },

  SET_TREE_VISIBLE: (state, visible) => {
    state.treeVisible = visible;
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
        secure: true,
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

  SEARCH_INAPP: (state, inApp) => {
    state.searchInApp = inApp;
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

  SET_FLOWCHART_SELECTED: (state, selected) => {
    state.flowchartSelected = selected;
  },

  SET_DATAFLOW_INFO_OPEN: (state, open) => {
    state.dataflowInfoOpen = open;
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

  /*
  ADD_MODAL_WINDOW: (state, modal) => {
    const m = state.modalWindows.find(mw => mw.id === modal.id);
    if (m) {
      console.warn(`Modal with id ${modal.id} exists`);
      m.open = true;
    } else {
      state.modalWindows.push({
        ...modal,
        open: true,
      });
    }
  },
   */
  SET_MODAL_WINDOW: (state, modal) => {
    state.modalWindow = modal;
  },
  /*
  REMOVE_MODAL_WINDOW: (state, id) => {
    const idx = state.modalWindows.find(mw => mw.id === id);
    if (idx) {
      state.modalWindows.splice(idx, 1);
    } else {
      console.warn(`No modal with id ${id}`);
    }
  },
  */
  SET_WINDOW_SIDE: (state, side) => {
    state.windowSide = side;
  },

  CREATE_VIEW_COMPONENT: (state, component) => {
    if (component.type === APPS_COMPONENTS.ALERT || component.type === APPS_COMPONENTS.CONFIRM) {
      state.dialogs.push({
        ...component,
        dismiss: false,
      });
      return;
    }
    const existingComponent = state.layout && (findInLayout(state.layout, component.id) || (state.modalWindow && findInLayout(state.modalWindow, component.id)));
    if (existingComponent) {
      console.log('Updating component: ', JSON.stringify(existingComponent, null, 2));
      Object.assign(existingComponent, component);
      console.log('Updated component: ', JSON.stringify(existingComponent, null, 2));
    } else {
      const parent = findComponent(state.layout, component.parentId) || (state.modalWindow && findComponent(state.modalWindow, component.id));
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

  VIEW_ACTION: (state, action) => {
    if (action.component === null) {
      console.warn('Action component is null');
      return;
    }
    if (state.layout || state.modalWindow) {
      const component = findInLayout(state.layout, action.component.id) || (state.modalWindow !== null && findInLayout(state.modalWindow, action.component.id));
      if (component) {
        if (action.component.components.length === 0 && component.components.length !== 0) {
          delete action.component.components;
        }
        Object.assign(component, action.component);
      }
    }
  },

  SHOW_SETTINGS: (state, show) => {
    state.showSettings = show;
  },

  SET_NOTIFICATIONS_PARAMS: (state, params) => {
    state.notificationsParams = params;
  },

  SET_DOCUMENTATION_VIEW: (state, view) => {
    state.documentationView = view;
  },
  SET_DOCUMENTATION_SELECTED: (state, selected) => {
    state.documentationSelected = selected;
  },
  SET_RELOAD_VIEWS: (state, views) => {
    if (views) {
      views.forEach((v) => {
        if (state.reloadViews.indexOf(v) === -1) {
          state.reloadViews.push(v);
        }
      });
    }
  },
  REMOVE_RELOAD_VIEW: (state, view) => {
    if (state.reloadViews.indexOf(view) !== -1) {
      state.reloadViews.splice(state.reloadViews.indexOf(view), 1);
    }
  },
  SET_TABLE_FONT_SIZE: (state, size) => {
    state.tableFontSize = size;
  },
  SET_TEXT_FONT_SIZE: (state, size) => {
    state.textFontSize = size;
  },
  SET_VIEW_COORDINATES: (state, view) => {
    state.viewCoordinates = view;
  },
};

<template>
  <q-btn
    :icon="interactiveMode ? 'mdi-play' : 'mdi-chevron-right'"
    :color="interactiveMode ? 'mc-main-light' : 'black'"
    size="sm"
    round
    flat
    class="mcm-menubutton absolute-top-right"
  >
    <q-popover
      v-if="isVisible"
      anchor="top right"
      self="top left"
      ref="mcm-main-popover"
      :persistent="false"
    >
      <q-btn
        icon="mdi-close"
        class="mcm-icon-close-popover"
        @click="closeMenuPopups"
        color="grey-8"
        size="xs"
        flat
        round
      ></q-btn>
      <q-list dense>
        <q-list-header style="padding: 0 16px 0 16px; min-height: 0">
          {{ $t('label.mcMenuContext') }}
          <q-icon
            v-if="hasContext"
            name="mdi-content-copy"
            class="mcm-copy-icon"
            @click.native="copyContextES($event, contextEncodedShape)"
          >
            <q-tooltip :delay="1000" anchor="center right" self="center left" :offset="[10, 10]">
              {{ $t('tooltips.copyEncodedShapeToClipboard') }}
            </q-tooltip>
          </q-icon>
        </q-list-header>
        <q-item-separator></q-item-separator>
        <q-item v-if="hasContext">
          <div class="mcm-container">
            <div class="klab-menuitem klab-clickable" @click="closeAndCall(null)">
              <div class="klab-item mdi mdi-star-four-points-outline klab-icon"></div>
              <div class="klab-item klab-text klab-only-text">{{ $t('label.newContext') }}</div>
            </div>
          </div>
        </q-item>
        <q-item>
          <div class="mcm-container">
            <div class="klab-menuitem klab-clickable"
                 :class="{ 'klab-not-available': contextsHistory.length === 0 }"
                 @click="toggleContextsHistory"
            >
              <div class="klab-item mdi mdi-history klab-icon"></div>
              <div class="klab-item klab-text klab-only-text">{{ $t('label.previousContexts') }}</div>
              <div>
                <q-icon
                  name="mdi-chevron-right"
                  color="black"
                  size="sm"
                  class="mcm-contextbutton"
                ></q-icon>
                <q-popover
                  ref="mcm-contexts-popover"
                  anchor="top right"
                  self="top left"
                  :offset="[18,28]"
                >
                  <q-list dense >
                    <q-item v-for="context in contextsHistory" :key="context.id">
                      <q-item-main>
                        <div class="mcm-container mcm-context-label">
                          <div class="klab-menuitem"
                               @click="closeAndCall(context.id)"
                               :class="[ context.id === contextId ? 'klab-no-clickable' : 'klab-clickable']"
                          >
                            <div
                              class="klab-item klab-large-text"
                              :class="{ 'mcm-actual-context': context.id === contextId }"
                              :style="{ 'font-style': contextTaskIsAlive(context.id) ? 'italic' : 'normal' }"
                              @mouseover="tooltipIt($event, context.id)"
                            >
                              {{ formatContextTime(context) }}: {{ context.label }}
                              <q-tooltip v-show="needTooltip(context.id)" anchor="center right" self="center left" :offset="[10, 10]">
                                {{ context.label }}
                              </q-tooltip>
                            </div>
                          </div>
                          <q-icon
                            name="mdi-content-copy"
                            class="absolute-right mcm-copy-icon"
                            @click.native="copyContextES($event, `${context.spatialProjection} ${context.encodedShape}`)"
                          >
                            <q-tooltip :delay="1000" anchor="center right" self="center left" :offset="[10, 10]">
                              {{ $t('tooltips.copyEncodedShapeToClipboard') }}
                            </q-tooltip>
                          </q-icon>
                        </div>
                      </q-item-main>
                    </q-item>
                  </q-list>
                </q-popover>
              </div>
            </div>
          </div>
        </q-item>
        <template v-if="!(hasContext)">
          <q-item>
            <q-item-main>
              <div class="mcm-container">
                <div class="klab-menuitem klab-clickable" :class="[ isDrawMode ? 'klab-select' : '']" @click="startDraw()">
                  <div class="klab-item mdi mdi-vector-polygon klab-icon"></div>
                  <div class="klab-item klab-text klab-only-text">{{ $t('label.drawCustomContext') }}</div>
                </div>
              </div>
            </q-item-main>
          </q-item>
          <q-list-header style="padding: 8px 16px 0 16px; min-height: 0">{{ $t('label.mcMenuScale') }}</q-list-header>
          <q-item-separator></q-item-separator>
          <q-item>
            <q-item-main>
              <scale-reference width="180px" :light="true" scaleType="space" :editable="true" :full="true"></scale-reference>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <scale-reference width="180px" :light="true" scaleType="time" :editable="true" :full="true"></scale-reference>
            </q-item-main>
          </q-item>
        </template>
        <q-list-header style="padding: 8px 16px 0 16px; min-height: 0">{{ $t('label.mcMenuOption') }}</q-list-header>
        <q-item-separator></q-item-separator>
        <!--
        <q-item v-if="hasContext && contextReloaded">
          <div class="mcm-container">
            <div class="klab-menuitem">
              <div class="klab-item">{{ $t('label.optionShowAll') }}</div>
            </div>
            <q-item-side right>
              <q-toggle v-model="showAll" color="mc-main"></q-toggle>
            </q-item-side>
          </div>
        </q-item>
        -->
        <q-item>
          <div class="mcm-container">
            <div class="klab-menuitem">
              <div class="klab-item">{{ $t('label.interactiveMode') }}</div>
            </div>
            <q-item-side right>
              <q-toggle v-model="interactiveModeModel" color="mc-main"></q-toggle>
            </q-item-side>
          </div>
        </q-item>
        <q-item>
          <div class="mcm-container">
            <div class="klab-menuitem">
              <div class="klab-item">{{ $t('label.viewCoordinates') }}</div>
            </div>
            <q-item-side right>
              <q-toggle v-model="coordinates" color="mc-main"></q-toggle>
            </q-item-side>
          </div>
        </q-item>
        <template v-if="!hasContext">
          <q-list-header style="padding: 8px 16px 0 16px; min-height: 0">{{ $t('label.mcMenuSettings') }}</q-list-header>
          <q-item-separator></q-item-separator>
          <q-item>
            <div class="mcm-container">
              <div class="klab-menuitem">
                <div class="klab-item">{{ $t('label.optionSaveLocation') }}</div>
              </div>
              <q-item-side right>
                <q-toggle v-model="saveLocationVar" color="mc-main"></q-toggle>
              </q-item-side>
            </div>
          </q-item>
          <q-item>
            <div class="mcm-container">
              <div class="klab-menuitem">
                <div class="klab-item">{{ $t('label.saveDockedStatus') }}</div>
              </div>
              <q-item-side right>
                <q-toggle v-model="saveDockedStatusVar" color="mc-main"></q-toggle>
              </q-item-side>
            </div>
          </q-item>
        </template>
        <q-list-header style="padding: 8px 16px 0 16px; min-height: 0">{{ $t('label.mcMenuHelp') }}</q-list-header>
        <q-item-separator></q-item-separator>
        <q-item>
          <div class="mcm-container">
            <div class="klab-menuitem klab-clickable" @click="askTutorial">
              <div class="klab-item klab-font klab-im-logo klab-icon"></div>
              <div class="klab-item klab-text klab-only-text">{{ $t('label.showHelp') }}</div>
            </div>
          </div>
        </q-item>
        <q-item-separator></q-item-separator>
        <q-item>
          <div class="klab-version">Version: {{ $store.state.data.packageVersion }}/ Build {{ $store.state.data.packageBuild }}</div>
        </q-item>
      </q-list>
    </q-popover>
  </q-btn>
</template>

<script>
import moment from 'moment';
import { mapState, mapGetters, mapActions } from 'vuex';
import { CUSTOM_EVENTS, SETTING_NAMES, WEB_CONSTANTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import ScaleReference from 'components/ScaleReference.vue';
import TooltipIt from 'shared/TooltipItMixin';
import LoadContext from 'shared/LoadContextMixin';
import { Cookies } from 'quasar';
import { copyToClipboard, capitalizeFirstLetter } from 'shared/Utils';
import { DEFAULT_OPTIONS } from 'shared/MapConstants';


export default {
  name: 'MainControlMenu',
  mixins: [
    TooltipIt,
    LoadContext,
  ],
  components: {
    ScaleReference,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('data', [
      'contextsHistory',
      'hasContext',
      'contextId',
      'contextReloaded',
      'contextEncodedShape',
      'interactiveMode',
      'session',
    ]),
    ...mapState('stomp', [
      'subscriptions',
    ]),
    ...mapGetters('stomp', [
      'lastActiveTask',
      'contextTaskIsAlive',
    ]),
    ...mapGetters('view', [
      'searchIsActive',
      'isDrawMode',
      'isScaleEditing',
      'isMainControlDocked',
    ]),
    ...mapState('view', [
      'saveLocation',
      'saveDockedStatus',
    ]),

    saveLocationVar: {
      get() {
        return this.saveLocation;
      },
      set(saveLocation) {
        this.changeSaveLocation(saveLocation);
      },
    },
    saveDockedStatusVar: {
      get() {
        return this.saveDockedStatus;
      },
      set(saveDockedStatus) {
        this.changeSaveDockedStatus(saveDockedStatus);
      },
    },
    interactiveModeModel: {
      get() {
        return this.interactiveMode;
      },
      set(value) {
        this.setInteractiveMode(value);
      },
    },
    coordinates: {
      get() {
        return this.$store.state.view.viewCoordinates;
      },
      set(value) {
        this.$store.state.view.viewCoordinates = value;
      },
    },
    isVisible() {
      return !this.isDrawMode && !this.isScaleEditing;
    },
    /*
    cleanContextsHistory() {
      return this.contextsHistory.filter(ch => ch.id !== this.contextId);
    },

    taskIsAlive() {
      return contextId => typeof this.tasks.find(t => (t.contextId === contextId && t.alive)) !== 'undefined';
    },
    */
  },
  methods: {
    ...mapActions('data', [
      'setInteractiveMode',
    ]),
    ...mapActions('view', [
      'setDrawMode',
    ]),
    startDraw() {
      this.setDrawMode(!this.isDrawMode);
    },
    toggleContextsHistory() {
      if (this.contextsHistory.length > 0) {
        this.$refs['mcm-contexts-popover'].toggle();
      }
    },
    async closeAndCall(contextId) {
      if (this.contextId === contextId) {
        return;
      }
      this.closeMenuPopups();
      this.clearTooltip();
      this.loadOrReloadContext(contextId, this.closeMenuPopups());
    },
    formatContextTime(context) {
      let timestamp = context.lastUpdate;
      if (timestamp === 0) {
        timestamp = context.creationTime;
      }
      if (timestamp && timestamp !== null) {
        const dateTime = moment(timestamp);
        const isToday = moment().diff(dateTime, 'days') === 0;
        return isToday ? dateTime.format('HH:mm:ss') : dateTime.format('YYYY/mm/dd HH:mm:ss');
      }
      return '';
    },
    changeSaveLocation(saveLocation) {
      this.$store.commit('view/SET_SAVE_LOCATION', saveLocation, { root: true });
      Cookies.set(WEB_CONSTANTS.COOKIE_SAVELOCATION, saveLocation, {
        expires: 30,
        path: '/',
        secure: true,
      });
      if (!saveLocation) {
        Cookies.set(WEB_CONSTANTS.COOKIE_SAVELOCATION, saveLocation, {
          expires: 30,
          path: '/',
          secure: true,
        });
        Cookies.set(WEB_CONSTANTS.COOKIE_MAPDEFAULT, { center: DEFAULT_OPTIONS.center, zoom: DEFAULT_OPTIONS.zoom }, {
          expires: 30,
          path: '/',
          secure: true,
        });
      }
    },
    changeSaveDockedStatus(saveDockedStatus) {
      this.$store.commit('view/SET_SAVE_DOCKED_STATUS', saveDockedStatus, { root: true });
      if (saveDockedStatus) {
        Cookies.set(WEB_CONSTANTS.COOKIE_DOCKED_STATUS, this.isMainControlDocked, {
          expires: 30,
          path: '/',
          secure: true,
        });
      } else {
        Cookies.remove(WEB_CONSTANTS.COOKIE_DOCKED_STATUS);
      }
    },
    copyContextES(event, ctxShape) {
      event.stopPropagation();
      copyToClipboard(ctxShape);
      this.$q.notify({
        message: capitalizeFirstLetter(this.$t('messages.customCopyToClipboard', { what: this.$t('label.context') })),
        type: 'info',
        icon: 'mdi-information',
        timeout: 500,
      });
    },
    closeMenuPopups() {
      if (this.$refs['mcm-main-popover']) {
        this.$refs['mcm-main-popover'].hide();
      }
      if (this.$refs['mcm-contexts-popover']) {
        this.$refs['mcm-contexts-popover'].hide();
      }
    },
    sendInteractiveModeState(state) {
      this.sendStompMessage(MESSAGES_BUILDERS.SETTING_CHANGE_REQUEST({ setting: SETTING_NAMES.INTERACTIVE_MODE, value: state }, this.session).body);
    },
    viewerClickListener() {
      if (!this.isDrawMode) {
        this.closeMenuPopups();
      }
    },
    askTutorial() {
      this.$eventBus.$emit(CUSTOM_EVENTS.NEED_HELP);
      this.closeMenuPopups();
    },
  },
  watch: {
    hasContext() {
      this.closeMenuPopups();
    },
    searchIsActive(newValue) {
      if (newValue) {
        this.closeMenuPopups();
      }
    },
    interactiveModeModel(newValue) {
      this.sendInteractiveModeState(newValue);
    },
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.VIEWER_CLICK, this.viewerClickListener);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.VIEWER_CLICK, this.viewerClickListener);
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .mcm-icon-close-popover
    position absolute
    right 4px
    top 6px

  .mcm-menubutton
    top 6px
    right 5px

  .mcm-contextbutton
    right -5px

  .mcm-container
    height 100%
    display flex
    align-items center
    width 180px
    &.mcm-context-label
      width 250px

  #btn-reset-context
    width 15px
    height 15px

  #mc-eraserforcontext
    padding 0 0 0 3px

  .mcm-actual-context
    color #999

  .q-icon.mcm-contextbutton
    position absolute
    top 7px
    right 5px

  .mcm-context-label
    .klab-menuitem
      width calc(100% - 20px)
  .mcm-copy-icon
    padding 0 10px 0 5px
    color $grey-3
    &:hover
      cursor pointer
      color $grey-10

  .klab-version
    font-size 10px
    width 100%
    text-align right
    color $grey-6

</style>

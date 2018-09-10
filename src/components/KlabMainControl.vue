<template>
  <div ref="main-control-container" @search-on="searchActivated">
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <div
        id="spinner-lonely-div"
        class="spinner-div"
        :style="{ 'border-color': controlColor.value }"
        v-show="isHidden"
      >
      <klab-spinner
        id="spinner-lonely"
        :store-controlled="true"
        :color="controlColor.value"
        :size="35"
        :ball="22"
        wrapperId="spinner-lonely-div"
        @dblclick.native="show"
      ></klab-spinner>
      </div>
    </transition>
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
    <!-- :style="{background: hasContext ? `linear-gradient(to right, rgba(${hexToRgb(controlColor.value)},.3) 0%, rgba(${hexToRgb(controlColor.value)},.1) 50%, rgba(${hexToRgb(controlColor.value)},.3) 100%)` : 'transparent'}" -->
    <q-card
      :class="['no-box','shadow',hasContext ? '' : 'bg-transparent', hasContext ? 'with-context' : 'without-context', 'absolute-position']"
      :flat="true"
      v-show="!isHidden"
      v-draggable="draggableConfMain"
    >
      <q-card-title
        id="q-card-title"
        class="q-pa-xs"
        ref="dr-handler"
        :style="{ 'background-color': `rgba(${hexToRgb(controlColor.value)},${hasContext ? '.5' : '.3'})` }"
      >
        <div
          id="spinner-main"
          class="spinner-div"
        >
          <klab-spinner
            :store-controlled="true"
            :color="controlColor.value"
            :size="35"
            :ball="22"
            wrapperId="spinner-main"
            @dblclick.native="hide"
          ></klab-spinner>
        </div>

        <klab-search v-if="searchIsActive"></klab-search>
        <div id="mc-text-div" class="text-white" v-else>
          {{ contextLabel === null ? $t('label.noContext') : contextLabel }}
        </div>

        <q-btn
          :color="controlColor.name"
          round
          size="lg"
          @click="hide"
          icon="mdi-chevron-left"
          id="hide-btn"
        ></q-btn>
      </q-card-title>

      <q-card-main
        v-show="hasContext && !isHidden"
        class="no-margin relative-position"
      >
        <keep-alive>
          <transition name="component-fade" mode="out-in">
            <component :is="selectedTab"></component>
          </transition>
        </keep-alive>
      </q-card-main>
      <q-card-actions
        v-show="hasContext && !isHidden"
        class="no-margin"
        id="context-control"
      >
        <div id="mc-tabs">
          <div class="mc-tab-button"
            :class="['tab-button', { active: selectedTab === 'klab-log-pane' }]"
            @click="selectedTab = 'klab-log-pane'"
          ><q-icon name="mdi-console">
            <q-tooltip
              :offset="[0, 5]"
              self="top middle"
              anchor="bottom middle"
            >{{ $t('tooltips.logPane') }}</q-tooltip>
          </q-icon></div>
          <div class="mc-tab-button"
            :class="['tab-button', { active: selectedTab === 'klab-tree-pane' }]"
            @click="selectedTab = 'klab-tree-pane'"
          ><q-icon name="mdi-file-tree">
            <q-tooltip
              :offset="[0, 5]"
              self="top middle"
              anchor="bottom middle"
            >{{ $t('tooltips.treePane') }}</q-tooltip>
          </q-icon></div>
        </div>
        <div class="mc-tab-button fixed-bottom-right"
             @click="resetContext"
             v-if="!hasTasks"
        ><q-icon name="mdi-close-circle">
          <q-tooltip
            :offset="[0, 5]"
            self="top middle"
            anchor="bottom middle"
          >{{ $t('tooltips.resetContext') }}</q-tooltip>
        </q-icon></div>
      </q-card-actions
        >
    </q-card>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { Draggable } from 'draggable-vue-directive';
import KlabSpinner from 'components/KlabSpinner.vue';
import KlabTreePane from 'components/KlabTreePane.vue';
import KlabLogPane from 'components/KlabLogPane.vue';
import KlabSearch from 'components/KlabSearch.vue';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';

export default {
  name: 'klabMainControl',
  data() {
    return {
      isHidden: false,
      draggableConfMain: {
        handle: undefined,
        resetInitialPos: false,
        boundingElement: undefined,
      },
      selectedTab: 'klab-tree-pane',
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextLabel',
      'lasts',
      'tree',
    ]),
    ...mapGetters('view', [
      'spinner',
      'searchIsActive',
    ]),
    ...mapGetters('stomp', [
      'hasTasks',
    ]),
    controlColor() {
      return {
        value: this.spinner.colorValue,
        name: this.spinner.color,
      };
    },
  },
  methods: {
    ...mapActions('view', [
      'searchStop',
    ]),
    resetContext() {
      this.sendStompMessage(MESSAGES_BUILDERS.RESET_CONTEXT(this.$store.state.data.session).body);
    },
    hide() {
      this.draggableConfMain.resetInitialPos = false;
      this.isHidden = true;
    },
    show() {
      this.draggableConfMain.resetInitialPos = true;
      this.isHidden = false;
    },
    searchActivated() {
    },
  },
  watch: {
    hasContext() { // TODO really???
      this.draggableConfMain.resetInitialPos = true;
      Vue.nextTick(() => {
        this.draggableConfMain.resetInitialPos = false;
      });
    },
  },
  mounted() {
    this.draggableConfMain.handle = this.$refs['dr-handler'];
    this.draggableConfMain.boundingRect = document.getElementById('viewer-container').getBoundingClientRect();
    this.$eventBus.$on('map-size-changed', () => {
      this.draggableConfMain.boundingRect = document.getElementById('viewer-container').getBoundingClientRect();
    });
  },
  directives: {
    Draggable,
  },
  components: {
    KlabTreePane,
    KlabLogPane,
    KlabSpinner,
    KlabSearch,
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .spinner-div {
    background-color: white;
    -webkit-border-radius: 40px;
    -moz-border-radius: 40px;
    border-radius: 40px;
    padding: 3px;
    margin: 0;
  }
  #spinner-main {
    float: left;
    border: none;
    width: 40px;
    height: 40px;
  }
  #spinner-lonely-div {
    position:absolute;
    left: .8em;
    top: 1.5em;
    border: 2px solid;
    width: 44px;
    height: 44px;
  }
  #hide-btn {
    position: absolute;
    top:30px;
    right:18px;
    display:none;
  }
  .q-card {
    width: $main-control-width;
    overflow: auto;
    top:1.5em;
  }
  .q-card.without-context {
    left: 50%;
    top: 1.5em;
    margin-left: -($main-control-width / 2);
  }
  #q-card-title {
    border-radius: 30px;
    cursor: move;
    width: $main-control-width;
  }
  .q-card-title {
    line-height: inherit;
  }
  #mc-search-div {
    width: 85%;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;
    position: absolute;
    left: 50px;
    margin-top: 6px;
  }
  #mc-text-div {
    text-shadow: 0 0 1px #555;
  }
  .q-card.with-context
    left: .5em;
    top: 1.5em;
    background-color rgba(35, 35, 35 ,.3);
    border-radius: 5px;
    #q-card-title
      margin 5px;
      width: $main-control-width - 10;
    #mc-text-div
      padding-left 5px
      float: left
      margin-top 10px
    #mc-search-div
      left 55px
  .q-card-main {
    overflow: auto;
    line-height: inherit;
    max-height: 70vh;
    background-color: alpha($faded, 85%);
    padding: 0; /* 0 0 10px 0;*/
  }

  #context-control {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 0
    margin: 0
  }
  .mc-tab-button {
    padding: 6px 10px;
    cursor: pointer;
    display: inline-block;
    font-size: 18px;
  }
  .mc-tab-button:hover {
    background: #e0e0e0;
  }
  .mc-tab-button.active {
    background-color: alpha($faded, 85%);
    color: white;
    cursor: auto;
  }
  #btn-reset-context {
    width: 15px;
    height: 15px;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
</style>

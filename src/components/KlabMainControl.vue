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
        :style="{ border: '2px solid '+controlColor.value }"
        v-show="isHidden"
      >
      <klab-spinner
        id="spinner-lonely"
        :store-controlled="true"
        :color="controlColor.value"
        :size="40"
        :ball="25"
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
            :size="40"
            :ball="25"
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
          size="sm"
          @click="hide"
          icon="ion-ios-arrow-back"
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
        <q-tabs
          id="klab-tabs"
          dense
          v-model="selectedTab"
          position="bottom"
          no-pane-border
          :color="controlColor.name"
          text-color="white"
        >
          <q-tab class="q-pa-xs q-ma-xs" slot="title" name="klab-log-pane" icon="ion-md-paper" />
          <q-tab class="q-pa-xs q-ma-xs" slot="title" name="klab-tree-pane" icon="ion-ios-list" />
        </q-tabs>
        <div class="q-ma-xs">&nbsp;</div>
        <q-btn
          round
          size="md"
          class="no-padding"
          id="btn-reset-context"
          icon="ion-close-circle"
          :color="controlColor.name"
          @click="resetContext"
          v-if="!hasTasks"
        ><q-tooltip
          :offset="[0, 5]"
          self="top middle"
          anchor="bottom middle"
        >{{ $t('label.btnContextReset') }}</q-tooltip>
        </q-btn>
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
    padding:3px;
    width: 45px;
    height: 45px;
    margin: 2px;
  }
  #spinner-main {
    float: left;
    border: none;
  }
  #spinner-lonely-div {
    position:absolute;
    left:.5em;
    top:1.5em;
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
  .q-card.with-context
    left: .5em;
    top: 1.5em;
    background-color rgba(35, 35, 35 ,.5);
    border-radius: 5px;
    #q-card-title
      margin 5px;
      width: $main-control-width - 15;

  #q-card-title {
    border-radius: 30px;
    cursor: move;
    width: $main-control-width;
  }
  .q-card-title {
    line-height: inherit;
  }
  .q-card-main {
    overflow: auto;
    line-height: inherit;
    max-height: 70vh;
    background-color: alpha($faded, 75%);
    padding: 0; /* 0 0 10px 0;*/
  }
  #mc-text-div {
    text-shadow: 0 0 1px #555;
    padding: 14px 5px;
    float: left;
  }
  #context-control {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 0
    margin: 0
  }
  #btn-reset-context {
    margin: 18px 15px 5px 0;
    width: 15px;
    height: 15px;
    position: absolute;
    right: 0;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
  /* TABS */
  #klab-tabs .q-tabs-head{
    border-bottom-left-radius: 5px;
  }
  #klab-tabs .q-tab-icon {
    font-size: 20px;
  }
</style>

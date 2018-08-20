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
    <q-card
      :class="['no-box','shadow','bg-transparent',hasContext ? 'with-context' : 'without-context', 'absolute-position']"
      :flat="true"
      v-show="!isHidden"
      v-draggable="draggableConfMain"
    >
      <q-card-title
        id="q-card-title"
        :class="[ hasContext ? 'no-b-radius': '', 'q-pa-xs', 'no-margin']"
        ref="dr-handler"
        :style="{ 'background-color': `rgba(${hexToRgb(controlColor.value)},.3)` }"
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
        <div id="mc-text-div" class="q-pa-md text-white" v-else>
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
        <div data-simplebar>
        <klab-splitter :margin="0" :hidden="additionalContentType === '' ? 'right' : ''" @close-metadata="additionalContentType = ''">
          <div slot="left-pane">
            <component :is="content" id="mc-main-content"></component>
          </div>
          <div slot="right-pane">
            <transition
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
            <component :is="additionalContentType" id="mc-additional-content">{{ additionalContent }}</component>
            </transition>
          </div>
        </klab-splitter>
        </div>
      </q-card-main>
      <q-card-actions
        v-show="hasContext && !isHidden"
        class="no-margin"
        id="context-control"
        :style="{ 'background-color': `rgba(${hexToRgb(controlColor.value)},.3)` }"
        align="end"
      >
        <div class="q-ma-xs">&nbsp;</div>
        <q-btn
          flat
          round
          size="md"
          class="no-padding"
          id="btn-reset-context"
          icon="ion-close-circle-outline"
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
import { mapGetters, mapActions } from 'vuex';
import { Draggable } from 'draggable-vue-directive';
import KlabSpinner from 'components/KlabSpinner.vue';
import KlabTree from 'components/KlabTree.vue';
import KlabSearch from 'components/KlabSearch.vue';
import KlabSplitter from 'components/KlabSplitter.vue';
import Metadata from 'components/additional/Metadata.vue';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
import Vue from 'vue';


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
      content: 'KlabTree',
      additionalContentType: '', // 'Metadata',
      additionalContent: 'Test de additionalContent',
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextLabel',
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
    ...mapActions('data', [
      'resetContext',
    ]),
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
    KlabTree,
    KlabSpinner,
    KlabSearch,
    KlabSplitter,
    Metadata,
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
  .q-card.with-context {
    left: .5em;
    top: 1.5em;
  }
  #q-card-title {
    background-color: alpha($indigo-5, 50%);
    border-radius: 30px;
    cursor: move;
    width: 100%;
  }
  #q-card-title.no-b-radius {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
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
  .q-tree .text-white {
    text-shadow: 1px 0 0 #aaa;
  }
  #mc-text-div {
    max-height: 50px;
    text-shadow: 1px 0 0 #aaa;
    text-align: center;
  }
  #context-control {
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    padding: 0
  }
  #btn-reset-context {
    margin: 5px 15px 5px 0;
    width: 2em;
    height 2em;
  }
  #mc-additional-content {
    color:white;
    padding: 2px 5px;
  }
</style>

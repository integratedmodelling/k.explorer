<template>
  <div ref="main-control-container" @search-on="searchActivated">
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <q-btn
        class="fixed shadow-1"
        style="left:.5em; top:1.5em;"
        :color="controlColor.name"
        round
        size="17px"
        @click="show"
        icon="ion-ios-bookmarks"
        v-show="isHidden"
      ></q-btn>
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
      v-draggable="draggableConfig"
    >
      <q-card-title
        id="q-card-title"
        :class="[ hasContext ? 'no-b-radius': '', 'q-pa-xs', 'no-margin', 'q-ma-xs']"
        ref="dr-handler"
        :style="{ 'background-color': `rgba(${hexToRgb(controlColor.value)},.3)` }"
      >
        <div
          id="spinner-div"
          :style="{ border: '2px solid '+controlColor.value }"
        >
          <klab-spinner
            id="main-spinner"
            :store-controlled="true"
            :color="controlColor.value"
            :size="40"
            :ball="25"
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
        class="q-pa-xs no-margin"
      >
        <component :is="content"></component>
      </q-card-main>
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

export default {
  name: 'klabMainControl',
  data() {
    return {
      isHidden: false,
      draggableConfig: {
        handle: undefined,
        resetInitialPos: false,
        boundingElement: undefined,
      },
      content: 'KlabTree',
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
    hide() {
      this.draggableConfig.resetInitialPos = false;
      this.isHidden = true;
    },
    show() {
      this.draggableConfig.resetInitialPos = true;
      this.isHidden = false;
    },
    searchActivated() {
    },
  },
  watch: {
  },
  mounted() {
    this.draggableConfig.handle = this.$refs['dr-handler'];
    this.draggableConfig.boundingRect = document.getElementById('viewer-container').getBoundingClientRect();
    this.$eventBus.$on('map-size-changed', () => {
      this.draggableConfig.boundingRect = document.getElementById('viewer-container').getBoundingClientRect();
    });
  },
  directives: {
    Draggable,
  },
  components: {
    KlabTree,
    KlabSpinner,
    KlabSearch,
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  #spinner-div {
    float: left;
    background-color: white;
    -webkit-border-radius: 40px;
    -moz-border-radius: 40px;
    border-radius: 40px;
    padding:3px;
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
    margin-left: -($main-control-width / 2);
  }
  .q-card.with-context {
    left: .5em;
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
    max-height: 70vh;
    background-color: alpha($faded, 75%);
    padding-bottom:10px;
    border-bottom-left-radius: 3px !important;
    border-bottom-right-radius: 3px !important;
  }
  .q-tree .text-white {
    text-shadow: 1px 0 0 #aaa;
  }
  #mc-text-div {
    max-height: 55px;
    text-shadow: 1px 0 0 #aaa;
    text-align: center;
  }
</style>

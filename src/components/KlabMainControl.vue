<template>
  <div ref="main-control-container">
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
        size="md"
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
      class="fixed no-box-shadow bg-transparent"
      style="left:1vw; top:1vw;border-radius:20px;"
      :flat="true"
      v-show="!isHidden"
      v-draggable="draggableValue"
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
          @dblclick.native="hide"
        />
        </div>
        <div id="text-div" class="q-pa-md text-white">{{ contextLabel }}
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
import { mapGetters } from 'vuex';
import { Draggable } from 'draggable-vue-directive';
import KlabSpinner from 'components/KlabSpinner.vue';
import KlabTree from 'components/KlabTree.vue';

export default {
  name: 'klabMainControl',
  data() {
    return {
      isHidden: false,
      draggableValue: {
        handle: undefined,
        resetInitialPos: false,
      },
      content: 'KlabTree',
    };
  },
  computed: {
    ...mapGetters('data', [
      'contextLabel',
      'hasContext',
    ]),
    ...mapGetters('view', [
      'spinner',
    ]),
    controlColor() {
      return {
        value: this.spinner.colorValue,
        name: this.spinner.color,
      };
    },
  },
  methods: {
    hide() {
      this.draggableValue.resetInitialPos = false;
      this.isHidden = true;
    },
    show() {
      this.draggableValue.resetInitialPos = true;
      this.isHidden = false;
    },
  },
  watch: {
  },
  mounted() {
    this.draggableValue.handle = this.$refs['dr-handler'];
  },
  directives: {
    Draggable,
  },
  components: {
    KlabTree,
    KlabSpinner,
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  #text-div {
    float: left;
    width: 300px;
    max-height: 85px;
    padding: 10px;
    overflow-wrap: break-word;
    overflow: hidden;
    text-shadow: 1px 0 0 #aaa;
    text-align: center;
  }
  #spinner-div {
    float: left;
    background-color: white;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
  }
  #hide-btn {
    position: absolute;
    top:30px;
    right:18px;
    display:none;
  }
  #q-card-title {
    background-color: alpha($indigo-5, 30%);
    border-radius: 30px;
    border: 1px solid #ccc;
    width: 400px;
    cursor: move;
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
    background-color: alpha($faded, 50%);
    padding-bottom:10px;
  }
  .q-tree .text-white {
    text-shadow: 1px 0 0 #aaa;
  }
</style>

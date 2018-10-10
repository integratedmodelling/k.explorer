<template>
  <div id="sr-container" :style="{ width: width }" :class="[ light ? 'sr-light' : 'sr-dark']" @click="scaleEditing = editable">
    <div id="sr-scalereference" v-if="hasScale" :class="[ full ? 'sr-full' : '']">
      <div
        v-if="full"
        id="sr-locked"
        class="sr-item mdi sr-icon"
        :class="[ isScaleLocked[scaleType] ? 'mdi-lock-outline' : 'mdi-lock-open-outline']"
        :style="{ cursor: isScaleLocked[scaleType] ? 'pointer' : 'default' }"
        @click.prevent="isScaleLocked ? unlockScale($event) : false"
      >
        <q-tooltip
          v-show="isScaleLocked[scaleType]"
          anchor="bottom middle"
          self="top middle"
          :offset="[0, 5]"
        >{{ $t('label.clickToUnlock') }}</q-tooltip>
      </div>
      <div id="sr-editables" :style="{ cursor: editable ? 'pointer' : 'default' }" >
        <div class="sr-item" :class="[ scaleType === 'space' ? `mdi ${type} sr-icon` : '']" id="sr-scaletype">{{ scaleType === 'time' ? type : '' }}</div>
        <div id="sr-description" class="sr-item">{{ description }}</div>
        <div id="sr-spacescale" class="sr-item">{{ scale }}</div>
        <q-tooltip
          v-if="editable"
          anchor="bottom middle"
          self="top middle"
          :offset="[0, 5]"
        >{{ $t('label.clickToEditScale') }}</q-tooltip>
      </div>
    </div>
    <div id="sr-no-scalereference" v-else>
      <p>{{ $t('label.noScaleReference') }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';

export default {
  name: 'ScaleReference',
  props: {
    scaleType: {
      type: String,
      validator: value => ['space', 'time'].indexOf(value) !== -1,
      default: 'space',
    },
    width: {
      type: String,
      default: '150px',
    },
    light: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    // this field indicate if lock must be showed
    full: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
      // 'timeReference',
      'isScaleLocked',
    ]),
    resolution() {
      return this.scaleType === 'space' ? this.scaleReference.spaceResolution : '';
    },
    unit() {
      return this.scaleType === 'space' ? this.scaleReference.spaceUnit : moment().year();
    },
    type() {
      return this.scaleType === 'space' ? 'mdi-grid' : 'YEAR'; // TODO implement different type
    },
    description() {
      // return this.scaleType === 'space' ? this.scaleReference.spaceResolutionDescription : moment().year();
      return this.scaleType === 'space' ? `${this.resolution} ${this.unit}` : this.unit;
    },
    scale() {
      return this.scaleType === 'space' ? this.scaleReference.spaceScale : '3'; // this.scaleReference.timeScale;
    },
    hasScale() {
      return this.scaleReference !== null;
    },
    scaleEditing: {
      get() {
        return this.$store.getters['view/isScaleEditing'];
      },
      set(active) {
        this.setScaleEditing({ active, type: this.scaleType });
      },
    },
  },
  methods: {
    ...mapActions('data', [
      'setScaleLocked',
    ]),
    ...mapActions('view', [
      'setScaleEditing',
    ]),
    unlockScale(event) {
      event.stopPropagation();
      this.sendStompMessage(MESSAGES_BUILDERS.SCALE_REFERENCE({
        scaleReference: this.scaleReference,
        unlockSpace: this.scaleType === 'space',
        unlockTime: this.scaleType === 'time',
        session: this.$store.state.data.session,
      }).body);
      this.setScaleLocked({ scaleType: this.scaleType, scaleLocked: false });
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  $sr-scaletype-width = 40px
  $sr-lock-width = 30px
  #sr-container
    height 100%
    display flex
    align-items center
    &.sr-light
      color #333
      text-shadow 0 0 1px #ccc
      #sr-spacescale
        background-color #333
        color #ccc
    &.sr-dark
      color #ccc
      text-shadow 0 0 1px #333
      #sr-spacescale
        background-color #ccc
        color #333
  #sr-editables
    display inline
  #sr-scalereference
  #sr-no-scalereference
    width 100%
    position relative
    .sr-item
      padding 0 3px
      display inline-block
      vertical-align middle
      &.lighter
        color #ccc
        text-shadow 0 0 1px #333
      $sr-lock-width = 40px
    #sr-scaletype
      width $sr-scaletype-width
    #sr-locked
      width $sr-lock-width
    #sr-scaletype
    #sr-locked
      text-align center
      font-size 12px
      &.sr-icon
        font-size 20px
    #sr-description
      font-size 12px
      width "calc(100% - %s - 20px)" % $sr-scaletype-width
    #sr-spacescale
      font-size 9px
      height 20px
      width 20px
      border-radius 10px
      text-align center
      padding 5px 0 0 0
    &.sr-full
      #sr-description
        width "calc(100% - %s - 20px)" % ($sr-scaletype-width + $sr-lock-width)
  .modal-scroll
    overflow hidden
  /*
  &:hover
    background-color #fff
  */
</style>

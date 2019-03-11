<template>
  <div class="sr-container" :style="{ width: width }" :class="[ light ? 'sr-light' : 'sr-dark', orientation === 'vertical' ? 'sr-vertical' : '']" @click="scaleEditing = editable">
    <div class="sr-scalereference klab-menuitem" v-if="hasScale" :class="{ 'sr-full': full, 'klab-clickable': editable }">
      <div
        v-if="full"
        class="sr-locked klab-item mdi sr-icon"
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
      <div class="sr-editables" :style="{ cursor: editable ? 'pointer' : 'default' }" >
        <div class="sr-scaletype klab-item" :class="[ scaleType === 'space' ? `mdi ${type} sr-icon` : '']">{{ scaleType === 'time' ? type : '' }}</div>
        <div class="sr-description klab-item">{{ description }}</div>
        <div class="sr-spacescale klab-item">{{ scale }}</div>
        <q-tooltip
          v-if="editable"
          anchor="bottom middle"
          self="top middle"
          :offset="[0, 5]"
        >{{ $t('label.clickToEditScale') }}</q-tooltip>
      </div>
    </div>
    <div class="sr-no-scalereference" v-else>
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
    orientation: {
      type: String,
      default: 'horizontal',
    },
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
      // 'timeReference',
      'isScaleLocked',
    ]),
    resolution() {
      return this.scaleType === 'space' ? this.scaleReference.spaceResolutionConverted : '';
    },
    unit() {
      return this.scaleType === 'space' ? this.scaleReference.spaceUnit : moment().year();
    },
    type() {
      return this.scaleType === 'space' ? 'mdi-grid' : 'YEAR'; // TODO implement different type
    },
    description() {
      return this.scaleType === 'space' ? this.scaleReference.spaceResolutionDescription : this.unit;
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
      }, this.$store.state.data.session).body);
      this.setScaleLocked({ scaleType: this.scaleType, scaleLocked: false });
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  $sr-scaletype-width = 40px
  $sr-lock-width = 30px
  .sr-container
    height 100%
    display flex
    align-items center
    &.sr-light
      color #333
      text-shadow 0 0 1px #ccc
      .sr-spacescale
        background-color #333
        color #ccc
    &.sr-dark
      color #ccc
      text-shadow 0 0 1px #333
      .sr-spacescale
        background-color #ccc
        color #333

    .sr-editables
      display inline
      .klab-item
        text-align center
    .sr-scalereference
    .sr-no-scalereference
      .sr-scaletype
        width $sr-scaletype-width
      .sr-locked
        width $sr-lock-width
      .sr-scaletype
      .sr-locked
        text-align center
        font-size 12px
        &.sr-icon
          font-size 20px
      .sr-description
        font-size 12px
        width "calc(100% - %s - 20px)" % $sr-scaletype-width
      .sr-spacescale
        font-size 9px
        height 20px
        width 20px
        border-radius 10px
        text-align center
        padding 5px 0 0 0
        display inline-block
      &.sr-full
        .sr-description
          width "calc(100% - %s - 20px)" % ($sr-scaletype-width + $sr-lock-width)
    &.sr-vertical
      margin 5px 0
      .klab-item
        float left
        width 100%
        margin 5px 0
      .sr-spacescale
        width 20px
        margin-left calc(50% - 10px)
  .modal-scroll
    overflow hidden
  /*
  &:hover
    background-color #fff
  */
</style>

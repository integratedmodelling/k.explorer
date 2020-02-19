<template>
  <div class="sr-container" :style="{ width: width }" :class="[ light ? 'sr-light' : 'sr-dark', orientation === 'vertical' ? 'sr-vertical' : '']" @click="scaleEditing = editable">
    <div class="sr-scalereference klab-menuitem" v-if="hasScale" :class="{ 'sr-full': full, 'klab-clickable': editable }">
      <div
        v-if="full"
        class="sr-locked klab-item mdi sr-icon"
        :class="[ isScaleLocked[scaleType] ? 'mdi-lock-outline' : 'mdi-lock-open-outline']"
        @click.prevent="lockScale($event)"
      >
        <q-tooltip
          anchor="bottom middle"
          self="top middle"
          :offset="[0, 5]"
        >{{ isScaleLocked[scaleType] ? $t('label.clickToUnlock') : $t('label.clickToLock')}}</q-tooltip>
      </div>
      <div class="sr-editables" :style="{ cursor: editable ? 'pointer' : 'default' }" >
        <div class="sr-scaletype klab-item" :class="[ /* type.startsWith('mdi') ?  */ `mdi ${type} sr-icon` /* : '' */]">
          <!-- <span v-if="!type.startsWith('mdi')">{{ type }}</span> -->
        </div>
        <div class="sr-description klab-item">{{ description }}</div>
        <div class="sr-spacescale klab-item">{{ scale }}</div>
        <q-tooltip
          v-if="editable"
          anchor="bottom middle"
          self="top middle"
          :offset="[0, 5]"
        ><div v-if="scaleType === SCALE_TYPE.ST_TIME && timeLimits !== ''" class="sr-tooltip sr-time-tooltip" v-html="timeLimits"></div><div class="sr-tooltip">{{ $t('label.clickToEditScale') }}</div></q-tooltip>
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
import { SCALE_TYPE, SCALE_UNITS, SETTING_NAMES, CUSTOM_EVENTS } from 'shared/Constants';

export default {
  name: 'ScaleReference',
  props: {
    scaleType: {
      type: String,
      validator: value => [SCALE_TYPE.ST_SPACE, SCALE_TYPE.ST_TIME].indexOf(value) !== -1,
      default: SCALE_TYPE.ST_SPACE,
    },
    useNext: {
      type: Boolean,
      default: false,
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
  data() {
    return {
      SCALE_TYPE,
    };
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
      'isScaleLocked',
      'nextScale',
    ]),
    scaleObj() {
      return this.useNext ? this.nextScale : this.scaleReference;
    },
    resolution() {
      return this.scaleType === SCALE_TYPE.ST_SPACE
        ? this.scaleObj.spaceResolutionConverted
        : this.scaleObj.timeUnit;
    },
    unit() {
      return this.scaleType === SCALE_TYPE.ST_SPACE
        ? this.scaleObj.spaceUnit
        : this.scaleObj.timeUnit;
    },
    type() {
      // return this.scaleType === SCALE_TYPE.ST_SPACE ? 'mdi-grid' : ((this.scaleObj.timeResolutionDescription && this.scaleObj.timeResolutionDescription !== '') ? this.scaleObj.timeResolutionDescription : 'mdi-clock-outline');
      return this.scaleType === SCALE_TYPE.ST_SPACE ? 'mdi-grid' : 'mdi-clock-outline';
    },
    description() {
      return this.scaleType === SCALE_TYPE.ST_SPACE
        ? this.scaleObj.spaceResolutionDescription
        : this.scaleObj.timeUnit === null ? 'YEAR' : this.scaleObj.timeUnit;
    },
    scale() {
      return this.scaleType === SCALE_TYPE.ST_SPACE
        ? this.scaleObj.spaceScale
        : this.unit ? SCALE_UNITS.find(u => u.value === this.unit).index : this.scaleObj.timeScale;
    },
    hasScale() {
      return this.useNext ? this.nextScale !== null : this.scaleReference !== null;
    },
    timeLimits() {
      return this.scaleObj.start === 0 && this.scaleObj.end === 0 ? '' : `${moment(this.scaleObj.start).format('L HH:mm:ss')}<br />${moment(this.scaleObj.end).format('L HH:mm:ss')}`;
    },
    scaleEditing: {
      get() {
        return this.$store.getters['view/isScaleEditing'];
      },
      set(active) {
        this.$store.dispatch('view/setScaleEditing', { active, type: this.scaleType });
      },
    },
  },
  methods: {
    ...mapActions('data', [
      'setScaleLocked',
    ]),
    lockScale(event) {
      event.stopPropagation();
      const lock = !this.isScaleLocked[this.scaleType];
      this.sendStompMessage(MESSAGES_BUILDERS.SETTING_CHANGE_REQUEST({
        setting: this.scaleType === SCALE_TYPE.ST_SPACE ? SETTING_NAMES.LOCK_SPACE : SETTING_NAMES.LOCK_TIME,
        value: lock,
      }, this.$store.state.data.session).body);
      this.setScaleLocked({ scaleType: this.scaleType, scaleLocked: lock });
      if (!lock) {
        this.$eventBus.$emit(CUSTOM_EVENTS.SEND_REGION_OF_INTEREST);
      }
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  $sr-scaletype-width = 30px
  $sr-lock-width = 30px
  $sr-scalescale-width = 30px
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
        span
          display block
          height 24px
          line-height 24px
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
        width "calc(100% - %s)" % ($sr-scaletype-width + $sr-scalescale-width)
      .sr-spacescale
        font-size 9px
        height 20px
        width 20px
        border-radius 10px
        text-align center
        padding 5px 0 0 0
        display inline-block
        margin 0 5px
      &.sr-full
        .sr-description
          width "calc(100% - %s)" % ($sr-scaletype-width + $sr-lock-width + $sr-scalescale-width)
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
    max-height 600px
  /*
  &:hover
    background-color #fff
  */
  .mdi-lock-outline
    color $main-control-main-color

  .sr-tooltip
    text-align center
    padding 4px 0
    &.sr-time-tooltip
      color $main-control-yellow

</style>

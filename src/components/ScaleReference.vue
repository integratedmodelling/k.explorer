<template>
  <div id="sr-container" :style="{ width: width }" :class="[ light ? 'sr-light' : 'sr-dark']">
    <div id="sr-scalereference" v-if="hasScale">
      <div class="sr-item" :class="[ scaleType === 'space' ? `mdi ${spaceIconType} sr-icon` : '']" id="sr-scaletype">{{ timeTextType }}</div>
      <div id="sr-res-description" class="sr-item">{{ description }}</div>
      <div id="sr-spacescale" class="sr-item">{{ scale }}</div>
    </div>
    <div id="sr-no-scalereference" v-else>
      <p>{{ $t('label.noScaleReference') }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
      // 'timeReference',
    ]),
    spaceIconType() {
      return 'mdi-grid'; // TODO implement different type
    },
    timeTextType() {
      return this.scaleType === 'time' ? 'YEAR' : '';
    },
    description() {
      return this.scaleType === 'space' ? this.scaleReference.resolutionDescription : '2018';
    },
    scale() {
      return this.scaleType === 'space' ? this.scaleReference.spaceScale : '3';
    },
    hasScale() {
      return this.scaleType === 'space' ? this.scaleReference !== null : true;
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  $sr-scaletype-width = 40px
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
    #sr-scaletype
      width $sr-scaletype-width
      text-align center
      font-size 12px
      &.sr-icon
        font-size 20px
    #sr-res-description
      font-size 12px
      width "calc(100% - %s - 20px)" % $sr-scaletype-width
    #sr-spacescale
      font-size 9px
      height 20px
      width 20px
      border-radius 10px
      text-align center
      padding 5px 0 0 0

  /*
  &:hover
    background-color #fff
  */
</style>

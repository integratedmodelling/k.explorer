<template>
  <div id="sr-container" :style="{ width: width }" :class="[ light ? 'sr-light' : 'sr-dark']" @click="scaleEditing = editable">
    <div id="sr-scalereference" v-if="hasScale" :style="{ cursor: editable ? 'pointer' : 'default' }">
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
    <div id="sr-no-scalereference" v-else>
      <p>{{ $t('label.noScaleReference') }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

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
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
      // 'timeReference',
    ]),
    type() {
      return this.scaleType === 'space' ? 'mdi-grid' : 'YEAR'; // TODO implement different type
    },
    description() {
      return this.scaleType === 'space' ? this.scaleReference.spaceResolutionDescription : moment().year();
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
    ...mapActions('view', [
      'setScaleEditing',
    ]),
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
  .modal-scroll
    overflow hidden
  /*
  &:hover
    background-color #fff
  */
</style>

<template>
  <div class="sb-scales">
    <div
      class="klab-button klab-action"
      :class="[{ active: showSpaceScalePopup }]"
      @mouseover="toggleScalePopup('space', true)"
      @mouseleave="toggleScalePopup('space', false)"
    >
      <q-icon name="mdi-earth">
        <q-popover
          v-model="showSpaceScalePopup"
          :anchor-click="false"
          :anchor="anchorType"
          :self="selfType"
          :offset="offsets"
        >
          <div id="mc-spacereference" class="mc-scalereference">
            <scale-reference :width="spaceWidth ? spaceWidth : scaleWidth" scale-type="space" :light="true" :editable="false"></scale-reference>
          </div>
        </q-popover>
      </q-icon>
    </div>
    <!-- TIME -->
    <div
      class="klab-button klab-action"
      :class="[{ active: showTimeScalePopup }]"
      @mouseover="toggleScalePopup('time', true)"
      @mouseleave="toggleScalePopup('time', false)"
    >
      <q-icon name="mdi-clock">
        <q-popover
          v-model="showTimeScalePopup"
          :anchor-click="false"
          :anchor="anchorType"
          :self="selfType"
          :offset="offsets"
        >
          <div id="mc-timereference" class="mc-scalereference">
            <scale-reference :width="timeWidth ? timeWidth : scaleWidth" scale-type="time" :light="true" :editable="false"></scale-reference>
          </div>
        </q-popover>
      </q-icon>
    </div>
  </div>
</template>

<script>
import ScaleReference from 'components/ScaleReference.vue';

export default {
  name: 'ScaleButtons',
  components: {
    ScaleReference,
  },
  props: {
    docked: {
      type: Boolean,
      required: true,
    },
    offset: {
      type: Number,
      default: 8,
    },
    scaleWidth: {
      type: String,
      default: '140px',
    },
    timeWidth: {
      type: String,
      default: undefined,
    },
    spaceWidth: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      showSpaceScalePopup: false,
      showTimeScalePopup: false,
      anchorType: this.docked ? 'center right' : 'bottom left',
      selfType: this.docked ? 'center left' : 'top left',
      offsets: this.docked ? [this.offset, 0] : [0, this.offset],
    };
  },

  methods: {
    toggleScalePopup(type, value) {
      if (type === 'space') {
        this.showSpaceScalePopup = value;
        this.showTimeScalePopup = false;
      } else if (type === 'time') {
        this.showSpaceScalePopup = false;
        this.showTimeScalePopup = value;
      }
    },
  },
};
</script>
<style lang="stylus">
  .sb-scales *
    cursor default
</style>

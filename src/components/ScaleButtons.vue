<template>
  <div class="sb-scales">
    <div
      class="klab-button klab-action mdi-next-scale"
    >
      <q-icon
        name="mdi-refresh"
        v-if="hasNextScale()"
        color="mc-yellow"
        @click.native="rescaleContext"
      >
        <q-tooltip
          :anchor="anchorType"
          :self="selfType"
          :offset="offsets"
        >{{ $t('tooltips.refreshScale') }}</q-tooltip>
      </q-icon>
    </div>
    <div
      class="klab-button klab-action"
      :class="[{ active: showSpaceScalePopup }]"
      @mouseover="toggleScalePopup('space', true)"
      @mouseleave="toggleScalePopup('space', false)"
      @click="scaleEditing = { active: true, type: SCALE_TYPE.ST_SPACE }"
    >
      <q-icon name="mdi-earth" :class="{ 'mdi-next-scale': hasNextScale(SCALE_TYPE.ST_SPACE) }">
        <q-popover
          v-model="showSpaceScalePopup"
          :anchor-click="false"
          :anchor="anchorType"
          :self="selfType"
          :offset="offsets"
        >
          <div id="mc-spacereference" class="mc-scalereference">
            <scale-reference
              :width="spaceWidth ? spaceWidth : scaleWidth"
              scale-type="space"
              :light="true"
              :editable="false"
            ></scale-reference>
            <scale-reference
              v-if="hasNextScale(SCALE_TYPE.ST_SPACE)"
              :width="spaceWidth ? spaceWidth : scaleWidth"
              scale-type="space"
              :use-next="true"
              :light="true"
              :editable="false"
              class="sb-next-scale"
            ></scale-reference>
            <div class="sb-tooltip">{{ $t('tooltips.clickToEdit', { type: SCALE_TYPE.ST_SPACE }) }}</div>
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
      @click="noTimeScaleChange"
    >
      <q-icon name="mdi-clock" :class="{ 'mdi-next-scale': hasNextScale(SCALE_TYPE.ST_TIME) }">
        <q-popover
          v-model="showTimeScalePopup"
          :anchor-click="false"
          :anchor="anchorType"
          :self="selfType"
          :offset="offsets"
        >
          <div id="mc-timereference" class="mc-scalereference">
            <scale-reference
              :width="timeWidth ? timeWidth : scaleWidth"
              scale-type="time"
              :light="true"
              :editable="false">
            </scale-reference>
            <scale-reference
              v-if="hasNextScale(SCALE_TYPE.ST_TIME)"
              width="timeWidth ? timeWidth : scaleWidth"
              scale-type="time"
              :light="true"
              :editable="false"
              :use-next="true"
              class="sb-next-scale"
            ></scale-reference>
            <div class="sb-tooltip">{{ $t('tooltips.clickToEdit', { type: SCALE_TYPE.ST_TIME }) }}</div>
          </div>
        </q-popover>
      </q-icon>
    </div>
  </div>
</template>

<script>
import ScaleReference from 'components/ScaleReference.vue';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import { mapGetters } from 'vuex';
import { SCALE_TYPE } from 'shared/Constants';

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
      SCALE_TYPE,
    };
  },
  computed: {
    ...mapGetters('data', [
      'nextScale',
      'hasNextScale',
      'scaleReference',
      'contextId',
    ]),
    scaleEditing: {
      get() {
        return this.$store.getters['view/isScaleEditing'];
      },
      set({ active, type }) {
        this.$store.dispatch('view/setScaleEditing', { active, type });
      },
    },
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
    rescaleContext() {
      if (this.hasNextScale()) {
        /*
        this.$q.dialog({
          title: this.$t('label.appWarning'),
          message: this.$t('messages.confirmRescaleContext'),
          ok: this.$t('label.appOK'),
          cancel: this.$t('label.appCancel'),
        }).then(() => {
        */
        this.sendStompMessage(MESSAGES_BUILDERS.SCALE_REFERENCE({
          scaleReference: this.scaleReference,
          contextId: this.contextId,
          ...(this.hasNextScale(SCALE_TYPE.ST_SPACE) && { spaceResolutionConverted: this.nextScale.spaceResolutionConverted }),
          ...(this.hasNextScale(SCALE_TYPE.ST_SPACE) && { spaceUnit: this.nextScale.spaceUnit }),
          ...(this.hasNextScale(SCALE_TYPE.ST_TIME) && { timeResolution: this.nextScale.timeResolution }),
          ...(this.hasNextScale(SCALE_TYPE.ST_TIME) && { timeUnit: this.nextScale.timeUnit }),
        }, this.$store.state.data.session).body);
        /*
        }).catch(() => {
          // nothing to do
        });
        */
      }
    },
    noTimeScaleChange() {
      this.$q.notify({
        message: this.$t('messages.availableInFuture'),
        type: 'info',
        icon: 'mdi-information',
        timeout: 1000,
      });
    },
  },
};
</script>
<style lang="stylus">
  @import '~variables'
  .mdi-next-scale
    color $main-control-yellow
    opacity .6
    &:hover
      opacity 1
  .sb-scales *
    cursor pointer
  .sb-next-scale
    background-color alpha($main-control-yellow, 0.7)
  .sb-tooltip
    text-align center
    font-size .7em
    color white
    background-color $grey-8
    padding 2px 0
</style>

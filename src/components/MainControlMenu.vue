<template>
  <q-btn
    icon="mdi-chevron-right"
    color="black"
    size="sm"
    round
    flat
    class="mc-menubutton absolute-top-right"
  >
    <q-popover
      v-if="!searchIsActive && !isDrawMode"
      anchor="top right"
      self="top left"
    >
      <q-list dense>
        <q-list-header style="padding: 6px 16px 0 16px; min-height: 0">{{ $t('label.mcMenuContext') }}</q-list-header>
        <q-item-separator></q-item-separator>
        <q-item>
          <div class="mc-container">
            <div class="mc-menuitem mc-no-clickable" :class="{ 'mc-not-available': contextsHistory.length === 0 }">
              <div class="mc-item mdi mdi-history mc-icon"></div>
              <div class="mc-item mc-text mc-only-text">{{ $t('label.previousContexts') }}</div>
              <q-btn
                icon="mdi-chevron-right"
                color="black"
                size="sm"
                round
                flat
                class="mc-contextbutton absolute-top-right"
                :disable="contextsHistory.length === 0"
              >
                <q-popover
                  ref="mc-contexts-popover"
                  anchor="top right"
                  self="top left"
                >
                  <q-list dense>
                    <q-item v-for="context in contextsHistory" :key="context.id">
                      <q-item-main>
                        <div class="mc-container mcm-context-label">
                          <div class="mc-menuitem mc-clickable">
                            <div class="mc-item mc-large-text" @mouseover="tooltipIt($event, context.id)" @click="closeAndCall(context.id)">
                              {{ formatContextCreationTime(context.creationTime) }}: {{ context.label }}
                              <q-tooltip v-show="needTooltip(context.id)" anchor="center right" self="center left" :offset="[10, 10]">
                                {{ context.label }}
                              </q-tooltip>
                            </div>
                          </div>
                        </div>
                      </q-item-main>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </div>
          </div>
        </q-item>
        <q-item>
          <q-item-main>
            <div class="mc-container">
              <div class="mc-menuitem mc-clickable" :class="[ isDrawMode ? 'mc-select' : '']" @click="startDraw()">
                <div class="mc-item mdi mdi-vector-polygon mc-icon"></div>
                <div class="mc-item mc-text mc-only-text">{{ $t('label.drawCustomContext') }}</div>
              </div>
            </div>
          </q-item-main>
        </q-item>
        <q-list-header style="padding: 0 16px; min-height: 0">{{ $t('label.mcMenuScale') }}</q-list-header>
        <q-item-separator></q-item-separator>
        <q-item>
          <q-item-main>
            <scale-reference width="180px" :light="true" scaleType="space" :editable="true" :full="true"></scale-reference>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <scale-reference width="180px" :light="true" scaleType="time" :editable="false" :full="true"></scale-reference>
          </q-item-main>
        </q-item>

      </q-list>
    </q-popover>
  </q-btn>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
import ScaleReference from 'components/ScaleReference.vue';
import TooltipIt from 'shared/TooltipItMixin';

export default {
  name: 'MainControlMenu',
  mixins: [TooltipIt],
  data() {
    return {};
  },
  computed: {
    ...mapGetters('data', [
      'contextsHistory',
    ]),
    ...mapGetters('view', [
      'searchIsActive',
      'isDrawMode',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'loadContext',
    ]),
    ...mapActions('view', [
      'setDrawMode',
    ]),
    startDraw() {
      this.setDrawMode(!this.isDrawMode);
    },
    closeAndCall(contextId) {
      this.$refs['mc-contexts-popover'].hide();
      this.clearTooltip();
      this.loadContext(contextId);
    },
    formatContextCreationTime(timestamp) {
      if (timestamp && timestamp !== null) {
        const dateTime = moment(timestamp);
        const isToday = moment().diff(dateTime, 'days') === 0;
        return isToday ? dateTime.format('HH:mm:ss') : dateTime.format('YYYY/mm/dd HH:mm:ss');
      }
      return '';
    },
  },
  mounted() {
    console.debug(`Contexts: ${JSON.stringify(this.contextsHistory, null, 4)}`);
  },
  components: {
    ScaleReference,
  },
};
</script>

<style lang="stylus">

  .mc-menubutton
    top 6px
    right 10px

  .mc-contextbutton
    right -10px

  .mc-container
    height 100%
    display flex
    align-items center
    width 180px
    &.mcm-context-label
      width 250px

  .mc-menuitem
    width 100%
    position relative
    padding 2px 5px
    &.mc-clickable
      cursor pointer
    &.mc-no-clickable
      cursor default
    &.mc-not-available
      cursor not-allowed
    &.mc-select
      background-color $main-control-main-color
      color #fff
    .mc-item
      padding 0 3px
      display inline-block
      vertical-align middle
      font-size 13px
      &.mc-only-text
        width calc(100% - 30px)
      &.mc-large-text
        width 100%;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      &.lighter
        color #ccc
        text-shadow 0 0 1px #333
      &.mc-icon
        font-size 20px
        width 30px
      &.mc-text
        padding-left 10px

  #btn-reset-context
    width 15px
    height 15px

  #mc-eraserforcontext
    padding 0 0 0 3px

</style>

<template>
  <q-btn
    icon="mdi-chevron-right"
    color="black"
    size="sm"
    round
    flat
    class="mcm-menubutton absolute-top-right"
  >
    <q-popover
      v-if="!isDrawMode"
      anchor="top right"
      self="top left"
      ref="mcm-main-popover"
      :persistent="true"
    >
      <q-list dense>
        <q-list-header style="padding: 6px 16px 0 16px; min-height: 0">{{ $t('label.mcMenuContext') }}</q-list-header>
        <q-item-separator></q-item-separator>
        <q-item v-if="hasContext">
          <div class="mc-container">
            <div class="mc-menuitem mc-clickable" @click="closeAndCall(null)">
              <div class="mc-item mdi mdi-star-four-points-outline mc-icon"></div>
              <div class="mc-item mc-text mc-only-text">{{ $t('label.newContext') }}</div>
            </div>
          </div>
        </q-item>
        <q-item>
          <div class="mc-container">
            <div class="mc-menuitem mc-clickable"
                 :class="{ 'mc-not-available': contextsHistory.length === 0 }"
                 @click="toggleContextsHistory"
            >
              <div class="mc-item mdi mdi-history mc-icon"></div>
              <div class="mc-item mc-text mc-only-text">{{ $t('label.previousContexts') }}</div>
              <div>
                <q-icon
                  name="mdi-chevron-right"
                  color="black"
                  size="sm"
                  class="mcm-contextbutton"
                ></q-icon>
                <q-popover
                  ref="mcm-contexts-popover"
                  anchor="top right"
                  self="top left"
                  :offset="[18,28]"
                >
                  <q-list dense >
                    <q-item v-for="context in contextsHistory" :key="context.id">
                      <q-item-main>
                        <div class="mc-container mcm-context-label">
                          <div class="mc-menuitem"
                               @click="closeAndCall(context.id)"
                               :class="[ context.id === contextId ? 'mc-no-clickable' : 'mc-clickable']"
                          >
                            <div
                              class="mc-item mc-large-text"
                              :class="{ 'mcm-actual-context': context.id === contextId }"
                              :style="{ 'font-style': taskIsAlive(context.id) ? 'italic' : 'normal' }"
                              @mouseover="tooltipIt($event, context.id)"
                            >
                              {{ formatContextTime(context) }}: {{ context.label }}
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
              </div>
            </div>
          </div>
        </q-item>
        <template v-if="!(searchIsActive || hasContext)">
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
        </template>
      </q-list>
    </q-popover>
  </q-btn>
</template>

<script>
import moment from 'moment';
import { mapState, mapGetters, mapActions } from 'vuex';
import Constants from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import ScaleReference from 'components/ScaleReference.vue';
import TooltipIt from 'shared/TooltipItMixin';

export default {
  name: 'MainControlMenu',
  mixins: [TooltipIt],
  data() {
    return {
      waitingForReset: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'contextsHistory',
      'hasContext',
      'contextId',
    ]),
    ...mapState('stomp', [
      'subscriptions',
    ]),
    ...mapGetters('stomp', [
      'lastActiveTask',
      'tasks',
    ]),
    ...mapGetters('view', [
      'searchIsActive',
      'isDrawMode',
    ]),
    /*
    cleanContextsHistory() {
      return this.contextsHistory.filter(ch => ch.id !== this.contextId);
    },
    */
    taskIsAlive() {
      return contextId => typeof this.tasks.find(t => t.task.contextId === contextId) !== 'undefined';
    },
  },
  methods: {
    ...mapActions('data', [
      'loadContext',
      'setWaitinForReset',
    ]),
    ...mapActions('view', [
      'setDrawMode',
      'setSpinner',
    ]),
    startDraw() {
      this.setDrawMode(!this.isDrawMode);
    },
    toggleContextsHistory() {
      if (this.contextsHistory.length > 0) {
        this.$refs['mcm-contexts-popover'].toggle();
      }
    },
    async closeAndCall(contextId) {
      if (this.contextId === contextId) {
        return;
      }
      this.$refs['mcm-main-popover'].hide();
      this.$refs['mcm-contexts-popover'].hide();
      this.clearTooltip();
      if (contextId !== null) {
        this.setSpinner({ ...Constants.SPINNER_LOADING, owner: contextId });
      }
      if (this.hasContext) {
        /*
        const task = this.lastActiveTask;
        if (task !== null) {
          const subscriptionObject = this.subscriptions.find(ts => ts.id === task.id);
          if (typeof subscriptionObject !== 'undefined') {
            subscriptionObject.subscription.unsubscribe();
          }
        }
        */
        this.sendStompMessage(MESSAGES_BUILDERS.RESET_CONTEXT(this.$store.state.data.session).body);
        if (contextId !== null) {
          this.setWaitinForReset(contextId);
        } else {
          this.$refs['mcm-main-popover'].hide();
        }
      } else {
        this.loadContext(contextId);
      }
    },
    formatContextTime(context) {
      let timestamp = context.lastUpdate;
      if (typeof timestamp === 'undefined' || timestamp === null) {
        timestamp = context.creationTime;
      }
      if (timestamp && timestamp !== null) {
        const dateTime = moment(timestamp);
        const isToday = moment().diff(dateTime, 'days') === 0;
        return isToday ? dateTime.format('HH:mm:ss') : dateTime.format('YYYY/mm/dd HH:mm:ss');
      }
      return '';
    },

  },
  watch: {
    hasContext(newValue) {
      if (newValue && this.waitingForReset !== null) {
        this.loadContext(this.waitingForReset);
        this.waitingForReset = null;
      }
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

  .mcm-menubutton
    top 6px
    right 5px

  .mcm-contextbutton
    right -5px

  .mc-container.mcm-context-label
    width 250px

  #btn-reset-context
    width 15px
    height 15px

  #mc-eraserforcontext
    padding 0 0 0 3px

  .mcm-actual-context
    color #999

  .q-icon.mcm-contextbutton
    position absolute
    top 7px
    right 5px

</style>

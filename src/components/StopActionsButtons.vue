<template>
  <div class="klab-destructive-actions">
    <div class="klab-button klab-reset-context"
         @click="resetContext"
         v-if="!hasTasks(contextId)"
    ><q-icon name="mdi-close-circle-outline">
      <q-tooltip
        :offset="[0, 8]"
        :self="tooltipAnchor('top')"
        :anchor="tooltipAnchor('bottom')"
      >{{ $t('tooltips.resetContext') }}</q-tooltip>
    </q-icon></div>
    <div class="klab-button klab-interrupt-task"
         @click="interruptTask"
         v-if="hasTasks(contextId)"
    ><q-icon name="mdi-stop-circle-outline">
      <q-tooltip
        :offset="[0, 8]"
        :self="tooltipAnchor('top')"
        :anchor="tooltipAnchor('bottom')"
      >{{ $t('tooltips.interruptTask',{ taskDescription: lastActiveTaskText }) }}</q-tooltip>
    </q-icon></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { FAKE_TEXTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import LoadContext from 'shared/LoadContextMixin';

export default {
  name: 'StopActionsButtons',
  mixins: [
    LoadContext,
  ],
  data() {
    return {};
  },
  computed: {
    ...mapGetters('data', [
      'contextId',
      'previousContext',
    ]),
    ...mapGetters('stomp', [
      'hasTasks',
      'lastActiveTask',
    ]),
    lastActiveTaskText() {
      const text = this.lastActiveTask(this.contextId) === null ? '' : this.lastActiveTask(this.contextId).description;
      if (text === FAKE_TEXTS.UNKNOWN_SEARCH_OBSERVATION) {
        return this.$t('messages.unknownSearchObservation');
      }
      return text;
    },
  },
  methods: {
    tooltipAnchor(where) {
      return `${where} ${this.orientation === 'horizontal' ? 'middle' : 'left'}`;
    },
    resetContext() {
      /*
      TODO: if context is reset, we doesn't load the previous in stack, we reset everything
      this is useful for context navigation!
      if (this.previousContext !== null) {
        this.loadOrReloadContext(this.previousContext.id);
      } else {
      */
      this.sendStompMessage(MESSAGES_BUILDERS.RESET_CONTEXT(this.$store.state.data.session).body);
      // }
    },
    interruptTask() {
      const task = this.lastActiveTask(this.contextId);
      if (task !== null && task.alive) {
        this.sendStompMessage(MESSAGES_BUILDERS.TASK_INTERRUPTED({
          taskId: task.id,
        }, this.$store.state.data.session).body);
      }
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .klab-destructive-actions .klab-button
    color $main-control-red !important
</style>

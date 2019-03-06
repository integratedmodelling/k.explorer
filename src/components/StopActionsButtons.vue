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

export default {
  name: 'StopActionsButtons',
  data() {
    return {};
  },
  computed: {
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
      this.sendStompMessage(MESSAGES_BUILDERS.RESET_CONTEXT(this.$store.state.data.session).body);
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

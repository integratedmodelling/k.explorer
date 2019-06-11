import { mapGetters, mapActions } from 'vuex';
import { SPINNER_CONSTANTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';

export default {
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextId',
      'session',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'loadContext',
      'setWaitinForReset',
    ]),
    ...mapActions('view', [
      'setSpinner',
    ]),
    loadOrReloadContext(contextId, callbackIfNothing) {
      if (contextId !== null) {
        this.setSpinner({ ...SPINNER_CONSTANTS.SPINNER_LOADING, owner: contextId });
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
        } else if (typeof callbackIfNothing === 'function') {
          this.callbackIfNothing();
        }
      } else {
        this.loadContext(contextId);
      }
    },
  },
};

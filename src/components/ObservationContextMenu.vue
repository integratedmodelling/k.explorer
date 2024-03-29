<template>
  <q-context-menu ref="observations-context" v-show="enableContextMenu" @hide="hide">
    <q-list dense no-border style="min-width: 150px">
      <template v-for="(action, index) in itemActions" v-if="action.enabled">
        <q-item-separator :key="action.actionId" v-if="action.separator && index !== 0"></q-item-separator>
        <q-item v-if="!action.separator && action.enabled" link :key="action.actionId" @click.native="askForAction(action.actionId)">
          <q-item-main :label="action.actionLabel"></q-item-main>
        </q-item>
        <q-item v-if="!action.separator && !action.enabled" :key="action.actionId" disabled>
          <q-item-main :label="action.actionLabel"></q-item-main>
        </q-item>
      </template>
    </q-list>
  </q-context-menu>
</template>

<script>
import { mapActions } from 'vuex';
import { OBSERVATION_CONSTANTS, OBSERVATION_CONTEXT_ITEMS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';

export default {
  name: 'ObservationContextMenu',
  props: {
    observationId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      enableContextMenu: false,
      itemActions: [],
      itemObservation: null,
    };
  },
  methods: {
    ...mapActions('data', [
      'setContext',
      'loadContext',
      'setContextMenuObservationId',
    ]),
    initContextMenu() {
      const observation = this.$store.state.data.observations.find(o => o.id === this.observationId);
      if (!observation) {
        this.resetContextMenu();
        return;
      }
      this.resetContextMenu(false);
      if (observation && observation.actions && observation.actions.length > 1) {
        this.itemActions = observation.actions.slice(); // .slice(1);
        this.itemObservation = observation;
        /*
        else {
          this.itemActions = [{
            actionId: null,
            actionLabel: this.$t('messages.noActionForObservation'),
            enabled: false,
            separator: false,
          }];
          this.itemObservationId = null;
        }
        */
      } else {
        this.resetContextMenu();
      }
      if (observation.observationType !== OBSERVATION_CONSTANTS.TYPE_STATE && observation.observationType !== OBSERVATION_CONSTANTS.TYPE_GROUP) {
        this.itemActions.push(OBSERVATION_CONTEXT_ITEMS.SEPARATOR_ITEM);
        this.itemActions.push(OBSERVATION_CONTEXT_ITEMS.RECONTEXTUALIZATION_ITEM);
        this.itemObservation = observation;
      }
      if (this.itemActions && this.itemActions.length > 0) {
        this.enableContextMenu = (this.itemActions && this.itemActions.length > 0);
      } else {
        this.enableContextMenu = false;
      }
    },
    resetContextMenu(close = true) {
      this.itemActions = [];
      this.itemObservation = null;
      if (close) {
        this.enableContextMenu = false;
      }
    },
    hide(event) {
      this.resetContextMenu();
      this.$emit('hide', event);
    },
    askForAction(actionId) {
      if (this.itemObservation !== null) {
        console.debug(`Will ask for ${actionId} of observation ${this.itemObservation.id}`);
        switch (actionId) {
          case 'Recontextualization':
            this.sendStompMessage(MESSAGES_BUILDERS.CONTEXTUALIZATION_REQUEST(
              { contextId: this.itemObservation.id, parentContext: this.itemObservation.contextId },
              this.$store.state.data.session,
            ).body);
            // this.setContext({ context: this.itemObservation, isRecontext: true });
            this.loadContext(this.itemObservation.id);
            break;
          case 'AddToCache':
            console.log('Ask for Add to cache, no action for now'); // TODO: add to cache action on engine
            break;
          default:
            break;
        }
      }
      this.enableContextMenu = false;
    },
  },
  watch: {
    observationId() {
      if (this.observationId !== null) {
        this.initContextMenu();
      } else {
        this.resetContextMenu();
      }
    },
  },
  mounted() {
    if (this.observationId !== null) {
      this.initContextMenu();
    }
  },
};
</script>

<style>
</style>

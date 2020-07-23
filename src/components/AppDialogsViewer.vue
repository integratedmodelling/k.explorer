<template>
  <q-modal
    v-model="hasActiveDialogs"
    v-if="activeDialog"
    content-classes="kaa-container"
  >
    <div class="kaa-content" v-html="activeDialog.content"></div>
    <div class="kaa-button">
      <q-btn
        color="app-title-color"
        @click="dialogAction(activeDialog, true)"
        :label="$t('label.appOK')"
      />
      <q-btn
        v-if="activeDialog.type === APPS_COMPONENTS.CONFIRM"
        color="app-title-color"
        @click="dialogAction(activeDialog, false)"
        :label="$t('label.appCancel')"
      />
    </div>
  </q-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import { APPS_COMPONENTS, APPS_OPERATION, CUSTOM_EVENTS } from 'shared/Constants';

export default {
  name: 'AppDialogViewer',
  data() {
    return {
      activeDialog: null,
      APPS_COMPONENTS,
    };
  },
  computed: {
    ...mapGetters('view', [
      'layout',
      'activeDialogs',
    ]),
    hasActiveDialogs: {
      get() {
        return this.activeDialogs.length > 0;
      },
      set() {
        // nothing to do
      },
    },
  },
  methods: {
    setActiveDialog() {
      if (this.activeDialogs.length > 0) {
        this.activeDialog = this.activeDialogs[this.activeDialogs.length - 1];
      } else {
        this.$nextTick(() => {
          this.activeDialog = null;
        });
      }
    },
    dialogAction(component, value) {
      this.activeDialog.dismiss = true;
      if (component.type === APPS_COMPONENTS.CONFIRM) {
        this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
          operation: APPS_OPERATION.USER_ACTION,
          component: {
            ...component,
            components: [],
          },
          booleanValue: value,
        });
      }
    },
  },
  watch: {
    activeDialogs() {
      this.setActiveDialog();
    },
  },
  mounted() {
    this.setActiveDialog();
  },
};
</script>

<style lang="stylus">
  .kaa-container
    background-color rgba(253,253,253,.8)
    padding 15px
    border-radius 5px
    .kaa-content
      border 1px solid var(--app-main-color)
      border-radius 5px
      padding 20px
      color var(--app-title-color)
    .kaa-button
      margin 10px 0 0 0
      width 100%
      text-align right
      .q-btn
        margin-left 10px
</style>

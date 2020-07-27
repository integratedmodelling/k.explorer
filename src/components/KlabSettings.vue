<template>
  <div class="klab-settings-container">
    <div class="klab-settings-button" :class="{ 'klab-fab-open': fabVisible }">
      <q-fab
        ref="klab-settings"
        color="app-main-color"
        text-color="app-background-color"
        icon="mdi-settings"
        direction="up"
        v-model="fabVisible"
        @mouseenter.native="mouseFabEnter"
        @mouseleave.native="mouseFabLeave"
      >
        <q-fab-action
          v-if="layout !== null"
          text-color="app-main-color"
          color="app-background-color"
          @click="setLayout(null)"
          icon="mdi-exit-to-app"
        >
          <q-tooltip class="klab-setting-tooltip" anchor="center left" self="center right" :offset="[20, 0]">{{ $t('label.appClose') }}</q-tooltip>
        </q-fab-action>
        <q-fab-action
          color="app-background-color"
          text-color="app-main-color"
          icon="mdi-account-circle"
          @mouseenter.native="mouseActionEnter('userDetails')"
          @mouseleave.native="mouseActionLeave('userDetails')"
        >
          <!-- <q-tooltip class="klab-setting-tooltip" anchor="center left" self="center right" :offset="[16, 0]">{{ $t('label.userDetails') }}</q-tooltip> -->
          <q-popover
            id="klab-user-details"
            v-model="models.userDetails"
            anchor="bottom left"
            self="bottom right"
            :offset="[8, 0]"
            class="ks-container"
            @mouseenter.native="mousePopupEnter('userDetails')"
            @mouseleave.native="mousePopupLeave('userDetails')"
          >
            <!--
            <div class="ks-close-button">
              <q-btn round size="xs" flat color="app-title-color" @click="userDetailsVisible = false" icon="mdi-close"></q-btn>
            </div>
            -->
            <div class="ks-title">{{ $t('label.userDetails') }}</div>
            <div class="kud-owner">
              <div class="kud-owner-unknown" v-if="owner.unknown">{{ owner.unknown }}</div>
              <template v-else>
                <div class="kud-owner-id"><span class="kud-label">{{ $t('label.userId') }}</span><span class="kud-value">{{ owner.id }}</span></div>
                <div class="kud-owner-email"><span class="kud-label">{{ $t('label.userEmail') }}</span><span class="kud-value">{{ owner.email }}</span></div>
                <div class="kud-owner-lastlogin"><span class="kud-label">{{ $t('label.userLastLogin') }}</span><span class="kud-value">{{ owner.lastLogin }}</span></div>
                <div class="kud-owner-groups"><span class="kud-label kud-group">{{ $t('label.userGroups') }}</span>
                  <span v-if="owner.groups.length == 0" class="kud-value">{{ $t('message.noGroupsAssigned') }}</span>
                  <span v-else v-for="group in owner.groups" :key="group.id" class="kud-value kud-group">
                    <img width="30" :src="group.iconUrl ? group.iconUrl : 'statics/unknown-group-icon.png'" />
                    <q-tooltip class="klab-setting-tooltip" anchor="bottom middle" self="top middle" :offset="[0, 5]">
                      <div class="kud-group-id">{{ group.id }}</div>
                      <div v-if="group.description !== null" class="kud-group-detail">{{ group.description }}</div>
                    </q-tooltip>
                  </span>
                </div>
              </template>
            </div>
          </q-popover>
        </q-fab-action>
        <q-fab-action
          color="app-background-color"
          text-color="app-main-color"
          icon="mdi-apps"
          @mouseenter.native="mouseActionEnter('appsList')"
          @mouseleave.native="mouseActionLeave('appsList')"
        >
          <!-- <q-tooltip class="klab-setting-tooltip" anchor="center left" self="center right" :offset="[16, 0]">{{ $t('label.appsList') }}</q-tooltip> -->
          <q-popover
            id="klab-apps-list"
            v-model="models.appsList"
            anchor="bottom left"
            self="bottom right"
            :offset="[8, 0]"
            class="ks-container"
            @mouseenter.native="mousePopupEnter('appsList')"
            @mouseleave.native="mousePopupLeave('appsList')"
          >
            <!--
            <div class="ks-close-button">
              <q-btn round size="xs" flat color="app-title-color" @click="appsListVisible = false" icon="mdi-close"></q-btn>
            </div>
            -->
            <div class="ks-title">{{ $t('label.appsList') }}</div>
            <div class="kal-apps disable-select">
              <div class="kal-no-apps" v-if="appsList.length === 0">{{ $t('message.noAppsAvailable') }}</div>
              <template v-else>
                <div  v-for="(app, index) in appsList" :key="index" class="kal-app">
                  <p class="kal-name" @click="runApp(app)">{{ app }}</p>
                </div>
              </template>
            </div>
          </q-popover>
        </q-fab-action>
      </q-fab>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';

export default {
  name: 'KlabSettings',
  data() {
    return {
      models: {
        userDetails: false,
        appsList: false,
      },
      popupsOver: {
        userDetails: false,
        appsList: false,
      },
      fabVisible: false,
      closeTimeout: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'sessionReference',
    ]),
    ...mapGetters('view', [
      'layout',
    ]),
    modalsAreFocused() {
      return this.popupsOver.userDetails || this.popupsOver.appsList;
    },
    owner() {
      return (this.sessionReference && this.sessionReference.owner) ? this.sessionReference.owner : {
        unknown: this.$t('label.unknownUser'),
      };
    },
    appsList() {
      return (this.sessionReference && this.sessionReference.appUrns) ? this.sessionReference.appUrns : [];
    },
  },
  methods: {
    ...mapActions('view', [
      'setLayout',
    ]),
    runApp(app) {
      this.sendStompMessage(MESSAGES_BUILDERS.RUN_APPLICATION(
        { applicationId: app },
        this.$store.state.data.session,
      ).body);
      this.$nextTick(() => {
        this.appsListVisible = false;
      });
    },
    mouseActionEnter(actionName) {
      // console.warn(`Enter in action ${actionName}`);
      this.$nextTick(() => {
        this.models[actionName] = true;
      });
    },
    mouseActionLeave(actionName) {
      // console.warn(`Exit from action ${actionName}`);
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
      this.closeTimeout = setTimeout(() => {
        if (!this.popupsOver[actionName]) {
          this.models[actionName] = false;
        }
      }, 100);
    },
    mousePopupEnter(actionName) {
      this.popupsOver[actionName] = true;
    },
    mousePopupLeave(actionName) {
      this.popupsOver[actionName] = false;
      this.models[actionName] = false;
    },
    mouseFabEnter() {
      // console.warn('Enter fab');
      this.fabVisible = true;
    },
    mouseFabLeave() {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
      this.closeTimeout = setTimeout(() => {
        if (!this.modalsAreFocused) {
          this.fabVisible = false;
          this.models.userDetails = false;
          this.models.appsList = false;
        }
      }, 100);
    },
    mouseEnter(popupName) {
      if (this.closingPopupTimeout[popupName]) {
        clearTimeout(this.closingPopupTimeout[popupName]);
        this.closingPopupTimeout[popupName] = null;
      }
    },
    mouseLeave(popupName) {
      if (this.closingPopupTimeout[popupName]) {
        clearTimeout(this.closingPopupTimeout[popupName]);
        this.closingPopupTimeout[popupName] = null;
      }
      this.closingPopupTimeout[popupName] = setTimeout(() => {
        switch (popupName) {
          case 'userDetails':
            this.userDetailsVisible = false;
            break;
          case 'appsList':
            this.appsListVisible = false;
            break;
          default:
            // none
        }
      }, 100);
    },
  },
  /*
  watch: {
    fabVisible() {
      console.warn(`FabOpen is ${this.fabVisible}`);
    },
    models: {
      deep: true,
      handler() {
        console.warn('Models', JSON.stringify(this.models, null, 4));
      },
    },
    popupsOver: {
      deep: true,
      handler() {
        console.warn('popupsOver', JSON.stringify(this.popupsOver, null, 4));
      },
    },
  },
   */
};
</script>

<style lang="stylus">
  .klab-settings-container
    .klab-settings-button
      position fixed
      bottom 28px
      right 26px
      opacity 0.2
      .q-btn-fab
        height 32px
        width 32px
        .q-icon
          font-size 16px
      .q-btn-fab-mini
        height 24px
        width 24px
        .q-icon
          font-size 12px
      &.klab-fab-open
        opacity 1
        .q-btn-fab
          height 56px
          width 56px
          .q-icon
            font-size 28px
        .q-btn-fab-mini
          height 48px
          width 48px
          .q-icon
            font-size 24px

    .q-fab-up
      bottom 100%
      padding-bottom 10%

  .klab-setting-tooltip
    background-color var(--app-main-color)
    color var(--app-background-color)

  .ks-container
    background-color rgba(253,253,253,.8)
    padding 15px 20px
    border-radius 5px
    width 500px
    .ks-title
      font-size 1.3em
      color var(--app-title-color)
      font-width: 400;
      margin-bottom 10px
    .kal-apps
    .kud-owner
      border 1px solid var(--app-main-color)
      border-radius 5px
    .kud-owner
      padding 20px
      .kud-label
        display inline-block
        width 100px
        line-height 2.5em
        vertical-align middle
        color var(--app-title-color)
      .kud-value
        display inline-block
        vertical-align middle
        &.kud-group
          padding-right 10px

    .kal-apps
      padding 10px
      border-top 1px solid var(--app-main-color)
      color var(--app-title-color)
      .kal-name
        border 1px solid transparent
        cursor pointer
        line-height 1.5em
        margin 0
        padding 5px 10px
        width 100%
        width 300
        border-radius 6px
        &:hover
          background-color var(--app-main-color)
          color var(--app-background-color)
        &:active
          border 1px solid var(--app-main-color)
          background-color transparent
          color var(--app-main-color)
    // modals are out of container
    .ks-close-button
      position absolute
      width 10px
      height 10px
      top 5px
      right 20px
    .kud-group-id
    .kud-group-detail
      text-align center
    .kud-group-detail
      font-style italic


</style>

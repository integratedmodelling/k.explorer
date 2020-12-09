<template>
  <div class="klab-settings-container" v-show="hasShowSettings">
    <div class="klab-settings-button" :class="{ 'klab-fab-open': fabVisible }">
      <q-fab
        ref="klab-settings"
        color="app-main-color"
        text-color="app-background-color"
        icon="mdi-cog"
        direction="up"
        v-model="fabVisible"
        @mouseenter.native="mouseFabEnter"
        @mouseleave.native="mouseFabLeave"
      >
        <q-fab-action
          v-if="layout !== null || !isLocal"
          color="app-background-color"
          text-color="app-main-color"
          @click="exitApp"
          icon="mdi-exit-to-app"
          >
          <q-tooltip
            class="klab-app-tooltip"
            anchor="center right"
            self="center left"
            :offset="[8, 0]"
            :delay="600">{{ isApp || !isLocal ? $t('label.appsLogout') : $t('label.appsClose') }}</q-tooltip>
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
                  <div v-if="owner.groups.length == 0" class="kud-value">{{ $t('message.noGroupsAssigned') }}</div>
                  <div v-else v-for="group in owner.groups" :key="group.id" class="kud-value kud-group">
                    <img v-if="group.iconUrl" :src="group.iconUrl" class="kud-img-logo" :alt="group.id" />
                    <div v-else class="kud-no-group-icon">{{ group.id.charAt(0).toUpperCase() }}</div>
                    <q-tooltip class="klab-app-tooltip" anchor="bottom middle" self="top middle" :offset="[0, 5]">
                      <div class="kud-group-id">{{ group.id }}</div>
                      <div v-if="group.description !== null" class="kud-group-detail">{{ group.description }}</div>
                    </q-tooltip>
                  </div>
                </div>
              </template>
            </div>
          </q-popover>
        </q-fab-action>
        <q-fab-action
          v-if="!isApp"
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
            <div class="ks-title">
              <div class="ks-title-text">{{ $t('label.appsList') }}</div>
              <div class="ks-reload-button">
                <q-btn round size="sm" flat color="app-title-color" @click="loadSessionReference" icon="mdi-refresh">
                  <q-tooltip class="klab-setting-tooltip" anchor="center right" self="center left" :offset="[8, 0]" :delay="1000">{{ $t('label.reloadApplications') }}</q-tooltip>
                </q-btn>
              </div>
            </div>
            <div class="kal-apps disable-select">
              <div class="kal-no-apps" v-if="appsList.length === 0">{{ $t('messages.noAppsAvailable') }}</div>
              <template v-else>
                <div  v-for="(app, index) in appsList" :key="index" class="kal-app" :class="{ 'kal-active':layout && layout.name === app.name }">
                  <div class="kal-logo">
                    <img valign="middle" :src="app.logoSrc"/>
                  </div>
                  <div class="kal-info" @click="runApp(app.name)">
                    <div class="kal-name" v-html="app.label ? app.label : app.name ? app.name : $t('label.noLayoutLabel')"></div>
                    <div class="kal-description" v-html="app.description ? app.description : $t('label.noLayoutDescription')"></div>
                  </div>
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
import { axiosInstance } from 'plugins/axios';
import { mapGetters, mapActions } from 'vuex';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import { getBase64Resource } from 'shared/Helpers';
import { APPS_DEFAULT_VALUES } from 'shared/Constants';

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
      appsList: [],
    };
  },
  computed: {
    ...mapGetters('data', [
      'sessionReference',
      'isLocal',
    ]),
    ...mapGetters('view', [
      'isApp',
      'hasShowSettings',
      'layout',
    ]),
    modalsAreFocused() {
      return Object.keys(this.popupsOver).some(key => this.popupsOver[key]);
    },
    owner() {
      return (this.sessionReference && this.sessionReference.owner) ? this.sessionReference.owner : {
        unknown: this.$t('label.unknownUser'),
      };
    },
  },
  methods: {
    ...mapActions('data', [
      'loadSessionReference',
    ]),
    ...mapActions('view', [
      'setLayout',
    ]),
    loadApplications() {
      this.appsList.splice(0);
      if (this.sessionReference && this.sessionReference.publicApps) {
        const apps = this.sessionReference.publicApps.filter(app => app.platform === 'WEB' || app.platform === 'ANY');
        apps.forEach((app) => {
          if (app.logo) {
            getBase64Resource(app.projectId, app.logo)
              .then((logo) => {
                if (logo !== null) {
                  app.logoSrc = logo;
                } else {
                  app.logoSrc = APPS_DEFAULT_VALUES.DEFAULT_LOGO;
                }
                this.appsList.push(app);
              })
              .catch((error) => {
                console.error(error);
                app.logoSrc = APPS_DEFAULT_VALUES.DEFAULT_LOGO;
                this.appsList.push(app);
              });
          } else {
            app.logoSrc = APPS_DEFAULT_VALUES.DEFAULT_LOGO;
            this.appsList.push(app);
          }
        });
      }
    },
    runApp(app) {
      if (this.layout && this.layout.name === app.name) {
        // the same app is loaded
        return;
      }
      this.sendStompMessage(MESSAGES_BUILDERS.RUN_APPLICATION(
        { applicationId: app },
        this.$store.state.data.session,
      ).body);
      this.$nextTick(() => {
        this.models.appsList = false;
        this.fabVisible = false;
      });
    },
    exitApp() {
      if (!this.isLocal) {
        this.$nextTick(() => {
          if (this.isApp && this.sessionReference.publicApps.length > 1) {
            window.location = `${process.env.WS_BASE_URL}${process.env.ENGINE_LOGIN}`;
          } else {
            this.logout();
          }
        });
      } else if (this.layout) {
        this.setLayout(null);
      }
    },
    logout() {
      if (this.token !== null) {
        axiosInstance.post(`${process.env.WS_BASE_URL}${process.env.API_LOGOUT}`, {})
          .then(({ status }) => {
            if (status === 205 /* Reset Content */) {
              window.location = `${process.env.WS_BASE_URL}${process.env.ENGINE_LOGIN}`;
            } else {
              this.$q.notify({
                message: this.$t('messages.errorLoggingOut'),
                type: 'negative',
                icon: 'mdi-alert-circle',
                timeout: 2000,
              });
              console.error(`Strange status: ${status}`);
            }
          }).catch((error) => {
            this.$q.notify({
              message: this.$t('messages.errorLoggingOut'),
              type: 'negative',
              icon: 'mdi-alert-circle',
              timeout: 2000,
            });
            if (error.response && error.response.status === 403) {
              console.error('Probably bad token');
            }
            console.error(`Error logging out: ${error}`);
          });
      } else {
        window.location = `${process.env.WS_BASE_URL}${process.env.ENGINE_LOGIN}`;
      }
    },
    mouseActionEnter(actionName) {
      // console.warn(`Enter in action ${actionName}`);
      this.$nextTick(() => {
        this.models[actionName] = true;
        Object.keys(this.models).forEach((key) => {
          if (key !== actionName) {
            this.models[key] = false;
          }
        });
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
      // wait for animation
      setTimeout(() => {
        this.fabVisible = true;
      }, 300);
    },
    mouseFabLeave() {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
      this.closeTimeout = setTimeout(() => {
        if (!this.modalsAreFocused) {
          this.fabVisible = false;
          Object.keys(this.models).forEach((key) => {
            this.models[key] = false;
          });
        }
      }, 100);
    },
  },
  watch: {
    sessionReference() {
      this.loadApplications();
    },
  },
  created() {
    this.loadApplications();
  },
};
</script>

<style lang="stylus">
  .klab-settings-container
    background-color var(--app-background-color) !important
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

  .ks-container
    // background-color rgba(253,253,253,.8)
    background-color var(--app-background-color)
    padding 15px 20px
    border-radius 5px
    width 500px
    .ks-title
      font-size 1.3em
      color var(--app-title-color)
      font-weight 400
      margin-bottom 10px
      .ks-title-text
        display inline-block
      .ks-reload-button
        display inline-block
        padding-left 10px
        opacity .3
        &:hover
          opacity 1
    .kud-owner
      border 1px solid var(--app-main-color)
      border-radius 5px
      padding 20px
      .kud-label
        display inline-block
        width 100px
        line-height 2.5em
        vertical-align middle
        color var(--app-title-color)
      .kud-value
        display inline-block
        line-height 30px
        vertical-align middle
        color var(--app-text-color)
        &.kud-group
          padding-right 10px

    .kal-apps
      .kal-app
        display flex
        padding 8px 16px
        border 1px solid transparent
        border-radius 6px
        &:not(.kal-active)
          cursor pointer
        &.kal-active
          border-color var(--app-darken-main-color)
        &:hover
          border-color var(--app-main-color)
        .kal-logo
          align-self start;
          flex 0 0 auto
          width 50px
          height 50px
          margin 0 16px 0 0
          img
            display block
            max-width 50px
            max-height 50px
            vertical-align middle
        .kal-info
          flex: 1 1 auto;
          .kal-name
            color var(--app-title-color)
            font-weight 400
          .kal-description
            color var(--app-text-color)
            font-size 80%


            font-size 80%

    // modals are out of container
    .kud-group-id
    .kud-group-detail
      text-align center
    .kud-group-detail
      font-style italic
    .kud-no-group-icon
      background-color var(--app-title-color)
      text-align center
      color var(--app-background-color)
      padding 2px 0 0 0
      cursor default
      width 30px
      height 30px
      border-radius 15px
      line-height 30px
    .kud-img-logo
      line-height 30px
      width 30px
      height 30px
      display inline-block
      vertical-align middle
  .klab-setting-tooltip
    background-color var(--app-main-color)


</style>

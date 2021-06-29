<template>
  <q-dialog
    v-model="showNotifications"
    prevent-close
    class="kn-modal-container"
  >
    <!-- This or use "title" prop on <q-dialog> -->
    <div slot="title" class="kn-title">{{ actualNotification.title }}</div>

    <!-- This or use "message" prop on <q-dialog> -->
    <div slot="message" class="kn-content" v-html="actualNotification.content"></div>

    <template slot="buttons" slot-scope="props">
      <q-checkbox
        v-model="remember"
        :keep-color="true"
        color="app-main-color"
        :label="$t('label.rememberDecision')"
        class="kn-checkbox"
      ></q-checkbox>
      <q-btn color="app-main-color" :label="$t('label.appAccept')" @click="onOk" />
    </template>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { APP_URLS, CUSTOM_EVENTS, WEB_CONSTANTS } from 'shared/Constants';
import jsonp from 'jsonp';
import { Cookies } from 'quasar';

// Vue.use(VueJsonp);
// const { height, width } = dom;

export default {
  name: 'KlabNotifications',
  data() {
    return {
      notifications: [],
      actualNotificationIndex: -1,
      remember: false,
      cooked: [],
    };
  },
  computed: {
    ...mapGetters('stomp', [
      'connectionUp',
    ]),
    ...mapGetters('view', [
      'isInModalMode',
    ]),
    showNotifications: {
      get() {
        return this.actualNotificationIndex !== -1 && !this.actualNotificationIndex.read;
      },
      set() {
        // nothing to do
      },
    },
    actualNotification() {
      if (this.actualNotificationIndex === -1) {
        return {
          id: -1,
          title: '',
          content: '',
        };
      }
      return this.notifications[this.actualNotificationIndex];
    },
  },
  methods: {
    ...mapActions('view', [
      'setModalMode',
    ]),
    onOk() {
      const notification = this.notifications[this.actualNotificationIndex];
      notification.read = true;
      if (this.remember) {
        if (this.cooked.findIndex(c => c === notification.id)) {
          this.cooked.push(notification.id);
        }
        Cookies.set(WEB_CONSTANTS.COOKIE_NOTIFICATIONS, this.cooked, {
          expires: 365,
          path: '/',
          secure: true,
        });
        this.remember = false;
      }
      this.$nextTick(() => {
        do {
          this.actualNotificationIndex += 1;
        } while (this.actualNotificationIndex < this.notifications.length && this.notifications[this.actualNotificationIndex].read);
        if (this.actualNotificationIndex === this.notifications.length) {
          this.actualNotificationIndex = -1;
        }
      });
    },
    initNotifications(params = {}) {
      this.notificationsLoading = true;
      if (Cookies.has(WEB_CONSTANTS.COOKIE_NOTIFICATIONS)) {
        this.cooked = Cookies.get(WEB_CONSTANTS.COOKIE_NOTIFICATIONS);
      }
      this.notifications.splice(0, this.notifications.length);
      try {
        let qs = '';
        if (params) {
          const { groups, apps } = params;
          qs = [
            ...groups.map(r => `groups[]=${r}`),
            ...apps.map(r => `apps[]=${r}`),
          ].join('&');
        }
        jsonp(`${APP_URLS.NOTIFICATIONS_URL}${qs !== '' ? `?${qs}` : ''}`, { param: 'callback', timeout: 5000 }, (error, notifications) => {
          if (error) {
            console.error(`Error loading notifications: ${error.message}`);
          } else if (notifications.length > 0) {
            notifications.forEach((n, index) => {
              const read = this.cooked.findIndex(c => c === `${n.id}`) !== -1;
              this.notifications.push({
                ...n,
                read,
              });
              if (this.actualNotificationIndex === -1 && !read) {
                this.actualNotificationIndex = index;
              }
            });
          } else {
            console.debug('No notification');
          }
          this.presentationsLoading = false;
        });
      } catch (error) {
        console.error(`Error loading notifications: ${error.message}`);
        this.presentationsLoading = false;
      }
    },
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.SHOW_NOTIFICATIONS, this.initNotifications);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.SHOW_NOTIFICATIONS, this.initNotifications);
  },
};
</script>

<style lang="stylus">
@import '~variables'
  .kn-modal-container .modal-content
    max-width 640px !important
  .kn-title
    font-size var(--app-title-size)
    color var(--app-title-color)
  .kn-content
    font-size var(--app-text-size)
    color var(--app-text-color)
  .kn-checkbox
    position absolute
    left 20px
    bottom 16px
    font-size 10px
    color var(--app-text-color)
</style>

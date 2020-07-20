<template>
  <div class="klab-settings-container">
    <div class="klab-settings-button">
      <q-fab
        ref="klab-settings"
        color="app-main-color"
        text-color="app-background-color"
        icon="mdi-settings"
        direction="up"
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
          @click="userDetailsVisible = true"
        >
          <q-tooltip class="klab-setting-tooltip" anchor="center left" self="center right" :offset="[16, 0]">{{ $t('label.userDetails') }}</q-tooltip>
        </q-fab-action>
      </q-fab>
    </div>
    <q-modal
      id="klab-user-details"
      :content-classes="['kud-container']"
      v-model="userDetailsVisible"
    >
      <div class="kud-button">
        <q-btn round size="xs" flat color="app-title-color" @click="userDetailsVisible = false" icon="mdi-close"></q-btn>
      </div>
      <div class="kud-title">{{ $t('label.userDetails') }}</div>
      <div class="kud-owner">
        <div class="kud-owner-unknown" v-if="owner.unknown">{{ owner.unknown }}</div>
        <template v-else>
          <div class="kud-owner-id"><span class="kud-label">{{ $t('label.userId') }}</span><span class="kud-value">{{ owner.id }}</span></div>
          <div class="kud-owner-email"><span class="kud-label">{{ $t('label.userEmail') }}</span><span class="kud-value">{{ owner.email }}</span></div>
          <div class="kud-owner-lastlogin"><span class="kud-label">{{ $t('label.userLastLogin') }}</span><span class="kud-value">{{ owner.lastLogin }}</span></div>
          <div class="kud-owner-groups"><span class="kud-label">{{ $t('label.userGroups') }}</span><span class="kud-value">{{ owner.groups }}</span></div>
        </template>
      </div>
    </q-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'KlabSettings',
  data() {
    return {
      userDetailsVisible: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'sessionReference',
    ]),
    ...mapGetters('view', [
      'layout',
    ]),
    owner() {
      return (this.sessionReference && this.sessionReference.owner) ? this.sessionReference.owner : {
        unknown: this.$t('label.unknownUser'),
      };
    },
  },
  methods: {
    ...mapActions('view', [
      'setLayout',
    ]),
  },
};
</script>

<style lang="stylus">
  .klab-settings-container
    .klab-settings-button
      position fixed
      bottom 36px
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
    .q-fab-up
      bottom 100%
      padding-bottom 10%
    .klab-settings-button
    .q-fab-actions
      &:hover
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

  .klab-setting-tooltip
    background-color var(--app-main-color)
    color var(--app-background-color)

  .kud-container
    background-color rgba(253,253,253,.8)
    padding 15px
    border-radius 5px
    width 500px
    .kud-title
      font-size 1.3em
      color var(--app-title-color)
      font-width: 400;
    .kud-owner
      border 1px solid var(--app-main-color)
      border-radius 5px
      padding 20px
      .kud-label
        display inline-block
        width 100px
        line-height 1.5em
        color var(--app-title-color)
      .kud-value
        display inline-block
        line-height 1.5em
    .kud-button
      position absolute
      width 10px
      height 10px
      top 5px
      right 20px

</style>

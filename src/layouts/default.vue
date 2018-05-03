<template>
  <q-layout view="hHh lpR fFf">
    <q-layout-header v-if="!isOnIde">
      <q-toolbar
        color="primary"
        inverted
      >
        <q-btn v-if="hasPalette"
          flat
          dense
          round
          size="lg"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <img alt="Menu" src="~assets/palette_icon.svg" />
          <!-- <q-icon name="menu"></q-icon> -->
        </q-btn>

        <q-toolbar-title>
          {{$t('label.appTitle')}}
          <div slot="subtitle">{{ $t('label.running',{ version: $q.version}) }}</div>
        </q-toolbar-title>
        <app-locale-switcher></app-locale-switcher>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-if="hasPalette"
      overlay
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Palette content</q-list-header>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
          <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer v-if="!isOnIde">
      <q-toolbar-title>
        Layout Footer
      </q-toolbar-title>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import { mapGetters, mapActions } from 'vuex';
import AppLocaleSwitcher from '../components/AppLocaleSwitcher.vue';

export default {
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: !this.$q.platform.is.desktop,
      isOnIde: ['ide'].indexOf(this.$route.name) > -1,
    };
  },
  methods: {
    openURL,
    ...mapActions('view', [
      'setOnIde',
    ]),
  },
  components: {
    AppLocaleSwitcher,
  },
  computed: {
    ...mapGetters('view', [
      'hasPalette',
    ]),
  },
  mounted() {
    this.$store.state.data.tree = [
      {
        label: 'Satisfied customers',
        children: [
          {
            label: 'Good food',
            children: [
              { label: 'Quality ingredients' },
              { label: 'Good recipe' },
            ],
          },
          {
            label: 'Good service (disabled node)',
            disabled: true,
            children: [
              { label: 'Prompt attention' },
              { label: 'Professional waiter' },
            ],
          },
          {
            label: 'Pleasant surroundings',
            children: [
              { label: 'Happy atmosphere' },
              { label: 'Good table presentation' },
              { label: 'Pleasing decor' },
            ],
          },
        ],
      },
    ];
  },
};
</script>

<style scoped lang="stylus">
.q-toolbar-title
  height = 60px !important
</style>

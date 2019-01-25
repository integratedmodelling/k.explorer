<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import { mapGetters } from 'vuex';
import AppLocaleSwitcher from 'components/AppLocaleSwitcher.vue';

export default {
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: !this.$q.platform.is.desktop,
    };
  },
  computed: {
    ...mapGetters('view', [
      'hasPalette',
    ]),
    isOnIde() {
      return this.$mode === this.$constants.PARAMS_MODE_IDE;
    },
  },
  methods: {
    openURL,
  },
  components: {
    AppLocaleSwitcher,
  },
  mounted() {
  },
};
</script>

<style scoped lang="stylus">
.q-toolbar-title
  height = 60px !important
</style>

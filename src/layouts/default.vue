<template>
  <q-layout view="hHh lpR fFf">
    <q-layout-drawer
      side="left"
      :overlay="false"
      v-model="leftDrawerVisible"
      :width="100"
      :content-style="{ 'background-color': 'rgba(0,0,0,0)' }"
    >
      <klab-left-menu></klab-left-menu>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import KlabLeftMenu from 'components/KlabLeftMenu.vue';

export default {
  name: 'LayoutDefault',
  components: {
    KlabLeftMenu,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('view', [
      'hasPalette',
      'mainViewer',
    ]),
    leftDrawerVisible: {
      get() {
        return typeof this.mainViewer !== 'undefined' && this.mainViewer.leftMenu;
      },
      set(visible) {
        this.$store.state.view.mainViewer.leftMenu = visible;
      },
    },
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style scoped lang="stylus">
</style>

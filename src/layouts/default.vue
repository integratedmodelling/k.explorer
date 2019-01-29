<template>
  <q-layout view="hHh lpR fFf">
    <q-layout-drawer
      side="left"
      :overlay="false"
      v-model="leftMenuVisible"
      :width="leftMenuState === LEFTMENU_VISIBILITY.LEFTMENU_MAXIMIZED ? LEFTMENU_VISIBILITY.LEFTMENU_MAXSIZE + 10 : LEFTMENU_VISIBILITY.LEFTMENU_MINSIZE + 10"
      :content-class="[ 'klab-left' ]"
      class="print-hide"
    >
      <klab-left-menu></klab-left-menu>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LEFTMENU_VISIBILITY } from 'shared/Constants';
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
      'leftMenuState',
    ]),
    leftMenuVisible: {
      get() {
        return this.leftMenuState !== LEFTMENU_VISIBILITY.LEFTMENU_HIDDEN;
      },
      set(visibility) {
        this.setLeftMenuState(visibility);
      },
    },
  },
  methods: {
    ...mapActions('view', [
      'setLeftMenuState',
    ]),
  },
  created() {
    this.LEFTMENU_VISIBILITY = LEFTMENU_VISIBILITY;
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .klab-left
    background-color rgba(35, 35, 35, 0)
</style>

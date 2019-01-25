<template>
  <q-layout view="hHh lpR fFf">
    <q-layout-drawer
      side="left"
      :overlay="false"
      v-model="leftDrawerVisible"
      :width="isLeftMenuMaximized ? LEFTMENU_VISIBILITY.LEFTMENU_MAXSIZE : LEFTMENU_VISIBILITY.LEFTMENU_MINSIZE"
      :content-class="[ 'klab-left' ]"
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
      'isLeftMenuMaximized',
      'isLeftMenuHidden',
    ]),
    leftDrawerVisible: {
      get() {
        return !this.isLeftMenuHidden;
      },
      set(visible) {
        this.$store.state.view.mainViewer.leftMenu = visible;
      },
    },
  },
  methods: {
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

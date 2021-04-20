<template>
  <div class="dh-container full-width row items-center">
    <div class="dh-spinner col-1 justify-start">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div
          id="kd-spinner"
          class="klab-spinner-div item-center"
        >
          <klab-spinner
            id="spinner-documentation"
            :store-controlled="true"
            :size="28"
            :ball="22"
            wrapperId="kd-spinner"
          ></klab-spinner>
        </div>
      </transition>
    </div>
    <div class="dh-tabs col justify-start">
      <q-tabs
        v-model="selectedTab"
        color="mc-main"
        underline-color="mc-main"
      >
        <q-tab slot="title" :name="DOCUMENTATION_VIEWS.REPORT" class="klab-tab" icon="mdi-text-box-outline" />
        <q-tab slot="title" :name="DOCUMENTATION_VIEWS.TABLES" class="klab-tab" icon="mdi-table" />
        <q-tab slot="title" :name="DOCUMENTATION_VIEWS.FIGURES" class="klab-tab" icon="mdi-image" />
        <q-tab slot="title" :name="DOCUMENTATION_VIEWS.RESOURCES" class="klab-tab" icon="mdi-database-outline" />
        <q-tab slot="title" :name="DOCUMENTATION_VIEWS.MODELS" class="klab-tab" icon="mdi-graph-outline" />
      </q-tabs>
    </div>
    <div class="dh-actions col justify-end self-center">
      <q-btn icon="mdi-refresh" round class="dv-doc-reload" size="sm" color="mc-main" @click="forceReload">
        <q-tooltip
          :offset="[0, 8]"
          self="bottom middle"
          anchor="top middle"
          :delay="1000"
        >{{ $t('label.appReload')}}</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { DOCUMENTATION_VIEWS, CUSTOM_EVENTS } from 'shared/Constants';
import KlabSpinner from 'components/KlabSpinner';

export default {
  name: 'DocumentationHeader',
  components: {
    KlabSpinner,
  },
  data() {
    return {
      DOCUMENTATION_VIEWS,
    };
  },
  computed: {
    ...mapGetters('stomp', [
      'hasTasks',
    ]),
    selectedTab: {
      get() {
        return this.$store.getters['view/documentationView'];
      },
      set(value) {
        this.$store.dispatch('view/setDocumentationView', value, { root: true });
      },
    },
  },
  methods: {
    forceReload() {
      this.$eventBus.$emit(CUSTOM_EVENTS.REFRESH_DOCUMENTATION);
    },
  },
};
</script>

<style lang="stylus">
@import '~variables'
.dh-container
  background-color rgba(35,35,35,0.8)
  .dh-spinner
    width 28px
    margin-left 16px
    margin-right 16px
  .dh-tabs
    .q-tabs-head
      background-color rgba(0, 0, 0, 0)
      padding 0 !important
      .q-tab
        padding 10px 16px
        &.active
          color $main-control-main-color !important
  .dh-actions
    text-align right
    padding-right 16px
</style>

<template>
  <div class="col column no-padding">
  <div class="col no-padding full-height full-width">

    <component :is="actualViewer"></component>
  </div>
  <div class="col-2" v-if="hasViews">OLD-MAPS</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mapViewer from 'components/MapViewer.vue';

export default {
  name: 'viewer',
  data() {
    return {
      actualViewer: 'mapViewer',
    };
  },
  computed: {
    ...mapState('data', [
      'saved',
    ]),
    hasViews() {
      return this.saved.length;
    },
  },
  components: {
    mapViewer,
  },
};
</script>

<style>
</style>

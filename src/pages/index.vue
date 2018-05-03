<template>
  <q-page class="column">
      <div class="col row full-height">
        <div class="col-3" v-if="hasTree">
          <klab-tree></klab-tree>
        </div>
        <div class="col column no-padding">
          <div class="col no-padding full-height full-width">
            <component :is="actualViewer"></component>
          </div>
          <div class="col-2" v-if="hasViews">OLD-MAPS</div>
        </div>
      </div>
      <div class="col-1" v-if="hasLog">STATUS</div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import mapViewer from 'components/MapViewer.vue';
import chartViewer from 'components/CharViewer.vue';
import klabTree from 'components/KLabTree.vue';

export default {
  /* eslint-disable object-shorthand */
  name: 'PageIndex',
  data: function () {
    return {
      actualViewer: 'mapViewer',
    };
  },
  computed: {
    ...mapGetters('data', [
      'tree',
      'saved',
      'status',
    ]),
    hasTree: function () {
      return this.tree.length;
    },
    hasViews: function () {
      return this.saved.length;
    },
    hasLog: function () {
      return this.status.length;
    },
  },
  components: {
    mapViewer,
    chartViewer,
    klabTree,
  },
  methods: {
  },
  watch: {
  },
};
</script>
<style scoped>
  .row div{
    padding: 10px 15px;
    background: rgba(86, 61, 124, .15);
    border: 1px solid rgba(86, 61, 124, .2)
  }
  .small {
    widht:10px;
  }
</style>


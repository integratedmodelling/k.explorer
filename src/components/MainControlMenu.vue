<template>
  <q-btn
    id="mc-menubutton"
    icon="mdi-chevron-right"
    color="black"
    size="sm"
    round
    flat
    class="absolute-top-right"
  >
    <q-popover
      v-if="!searchIsActive && !isDrawMode"
      anchor="top right"
      selr="top left"
    >
      <q-list dense>
        <q-list-header style="padding: 0 16px; min-height: 0">{{ $t('label.mcMenuScale') }}</q-list-header>
        <q-item-separator></q-item-separator>
        <q-item>
          <q-item-main>
            <scale-reference width="180px" :light="true" scaleType="space" :editable="true" :full="true"></scale-reference>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <scale-reference width="180px" :light="true" scaleType="time" :editable="false" :full="true"></scale-reference>
          </q-item-main>
        </q-item>
        <q-list-header style="padding: 16px 16px 0 16px; min-height: 0">{{ $t('label.mcMenuCustomContext') }}</q-list-header>
        <q-item-separator></q-item-separator>
        <q-item>
          <q-item-main>
            <div class="mc-container">
              <div class="mc-menuitem mc-clickable" id="" :class="[ isDrawMode ? 'mc-select' : '']" @click="startDraw()">
                <div class="mc-item mdi mdi-vector-polygon mc-icon"></div>
                <div class="mc-item mc-text mc-only-text">{{ $t('label.drawCustomContext') }}</div>
              </div>
            </div>
          </q-item-main>
        </q-item>
      </q-list>
    </q-popover>
  </q-btn>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ScaleReference from 'components/ScaleReference.vue';

export default {
  name: 'MainControlMenu',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('view', [
      'searchIsActive',
      'isDrawMode',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setDrawMode',
    ]),
    startDraw() {
      this.setDrawMode(!this.isDrawMode);
    },
  },
  components: {
    ScaleReference,
  },
};
</script>

<style lang="stylus">

  #mc-menubutton
    top 5px
    right 10px
  .mc-container
    height 100%
    display flex
    align-items center
    width 180px

</style>

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
      self="top left"
    >
      <q-list dense>
        <q-list-header style="padding: 16px 16px 0 16px; min-height: 0">{{ $t('label.mcMenuContext') }}</q-list-header>
        <q-item-separator></q-item-separator>
        <q-item>
          <div class="mc-container">
            <div class="mc-menuitem mc-clickable">
              <div class="mc-item mdi mdi-history mc-icon"></div>
              <div class="mc-item mc-text mc-only-text" @hover="$refs['mc-contexts-popover'].show();">{{ $t('label.previousContexts') }}</div>
              <q-btn
                id="mc-contextbutton"
                icon="mdi-chevron-right"
                color="black"
                size="sm"
                round
                flat
                class="absolute-top-right"
                :disable="contextsHistory.length === 0"
              >
                <q-popover
                  ref="mc-contexts-popover"
                  anchor="top right"
                  self="top left"
                >
                  <q-list dense>
                    <q-item v-for="context in contextsHistory" :key="context.contextId">
                      <q-item-main>
                        <div class="mc-container">
                          <div class="mc-menuitem mc-clickable">
                            <div class="mc-item mc-text mc-only-text" @click="closeAndCall(context.contextId)">{{ context.time }}</div>
                          </div>
                        </div>
                      </q-item-main>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </div>
          </div>
        </q-item>
        <q-item>
          <q-item-main>
            <div class="mc-container">
              <div class="mc-menuitem mc-clickable" :class="[ isDrawMode ? 'mc-select' : '']" @click="startDraw()">
                <div class="mc-item mdi mdi-vector-polygon mc-icon"></div>
                <div class="mc-item mc-text mc-only-text">{{ $t('label.drawCustomContext') }}</div>
              </div>
            </div>
          </q-item-main>
        </q-item>
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
    ...mapGetters('data', [
      'contextsHistory',
    ]),
    ...mapGetters('view', [
      'searchIsActive',
      'isDrawMode',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'loadContext',
    ]),
    ...mapActions('view', [
      'setDrawMode',
    ]),
    startDraw() {
      this.setDrawMode(!this.isDrawMode);
    },
    closeAndCall(contextId) {
      this.$refs['mc-contexts-popover'].hide();
      this.loadContext(contextId);
    },
  },
  mounted() {
    console.log(`Contexts: ${JSON.stringify(this.contextsHistory, null, 4)}`);
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
  #mc-contextbutton
    right -10px
  .mc-container
    height 100%
    display flex
    align-items center
    width 180px

</style>

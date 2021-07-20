<template>
  <div class="kbc-container" v-if="contextsCount > 1">
    <span
      v-for="(element, index) in contextsLabels"
      :key="element.id"
      @click="load(element.contextId, index)"
    >{{ element.label }}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoadContext from 'shared/LoadContextMixin';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';

export default {
  name: 'KlabBreadcrumbs',
  mixins: [
    LoadContext,
  ],
  computed: {
    ...mapGetters('data', [
      'contextsLabels',
      'contextsCount',
      'contextById',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'loadContext',
    ]),
    load(contextId, index) {
      if (index !== this.contextsCount - 1) {
        const observation = this.$store.state.data.observations.find(o => o.id === contextId);
        let context;
        if (observation) {
          context = observation;
        } else {
          context = this.contextById(contextId);
        }
        this.sendStompMessage(MESSAGES_BUILDERS.CONTEXTUALIZATION_REQUEST(
          { contextId: context.id, ...(context.contextId && { parentContext: context.contextId }) },
          this.$store.state.data.session,
        ).body);
        this.loadContext(contextId);
      }
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .kbc-container
    position relative
    height $main-control-spc-height
    font-size 10px
    padding 2px 5px
    span
      color #eee
      &:not(:last-child)
        cursor pointer
        color $main-control-main-color
        &:hover
          color $main-control-yellow
        &:after
          content ' / '
          color #eee


</style>

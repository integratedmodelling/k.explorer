<template>
  <div class="klab-menu-component dip-container full-height" data-simplebar>
    <div class="dip-close">
      <q-btn
        flat
        round
        size="sm"
        class="no-padding"
        icon="mdi-close"
        @click.native="closePanel"
      ></q-btn>
    </div>
    <div class="dip-scroll-container">
      <div class="dip-content" v-html="dataflowInfo.html"></div>
    </div>
    <!-- TODO implementation server side
    <div class="dip-bottom" v-if="dataflowInfo !== null && dataflowInfo.rateable">
      <div class="dip-comment">
        <q-icon
          size="1.2em"
          name="mdi-comment"
          color="grey-8"
          @click.native="activateComment"
        >
          <q-tooltip
            :offset="[0, 8]"
            self="top left"
            anchor="bottom left"
          >{{ $t('tooltips.commentIt') }}</q-tooltip>
        </q-icon>
      </div>
      <div class="dip-rating">
        <klab-q-rating
          :max="5"
          color="white"
          v-model="rating"
          customIcon="klab-font klab-im-logo"
          size="18px"
        ></klab-q-rating>
        <q-tooltip
          :offset="[0, 8]"
          self="top middle"
          anchor="bottom middle"
        >{{ $t('tooltips.rateIt') }}</q-tooltip>
      </div>
    </div>
    <q-dialog
      v-model="commentOpen"
      @ok="commentOk"
      @show="$refs['dpi-comment-input'].focus()"
      color="info"
    >
      <span slot="title">{{ $t('label.titleCommentResource') }}</span>
      <div slot="body">
        <q-input
          v-model="commentContent"
          ref="dpi-comment-input"
          type="textarea"
          color="info"
        ></q-input>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn color="info" outline :label="$t('label.appCancel')" @click="props.cancel"></q-btn>
        <q-btn color="info" :label="$t('label.sendComment')" @click="props.ok"></q-btn>
      </template>
    </q-dialog>
    -->
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import KlabQRating from 'components/custom/KlabQRating';

export default {
  name: 'DataflowInfoPane',
  components: {
    KlabQRating,
  },
  data() {
    return {
      commentOpen: false,
      commentContent: '',
    };
  },
  computed: {
    ...mapGetters('data', [
      'dataflowInfo',
      'contextId',
    ]),
    ...mapGetters('view', [
      'mainViewer',
    ]),
    rating: {
      set(rating) {
        this.$store.commit('data/SET_DATAFLOW_INFO', { ...this.dataflowInfo, rating });
        this.changeDataflowRating();
      },
      get() {
        return this.dataflowInfo !== null ? this.dataflowInfo.rating : -1;
      },
    },
  },
  methods: {
    ...mapActions('view', [
      'setLeftMenuState',
      'setLeftMenuContent',
      'setModalMode',
    ]),
    activateComment() {
      this.commentContent = '';
      this.commentOpen = true;
    },
    changeDataflowRating(comment = null) {
      this.sendStompMessage(MESSAGES_BUILDERS.DATAFLOW_NODE_RATING({
        nodeId: this.dataflowInfo.elementId,
        contextId: this.contextId,
        rating: this.dataflowInfo.rating,
        comment,
      }, this.session).body);
    },
    commentOk() {
      this.changeDataflowRating(this.commentContent);
      this.$q.notify({
        message: this.$t('messages.thankComment'),
        type: 'info',
        icon: 'mdi-information',
        timeout: 1000,
      });
    },
    closePanel() {
      this.$emit('closepanel');
    },
  },
  watch: {
    commentOpen(newValue) {
      this.setModalMode(newValue);
    },
  },
};

</script>

<style lang="stylus">
  @import '~variables'
  opaque(variable, opacity = 1)
    s('rgba(var(%s), %s)', variable, opacity)
  .dip-container
    color white
    padding-top 30px
    width 100%
    .dip-content
      margin-bottom 40px
    .dip-close
      width 100%
      text-align right
      position absolute
      left 0
      top 0
      color white
    .simplebar-scrollbar:before
      background #888
    article
      padding 0 10px
      hr
        height: 1px;
        border-left none
        border-right none
        border-top 1px solid rgba(24,24,24,0.5)
        border-bottom 1px solid #444
      h1
        color $main-control-main-color
        font-size 1.4em
        margin 0 0 10px 0
        font-weight bold
        word-break break-all
      .dfe-fixed
        color rgba(255, 255, 255, .6)
        font-size .7em
        p
          margin 0 0 .6em 0
      .dfe-content
        font-size .8em
        table
          padding 10px 0
          th
            color $main-control-yellow
            text-align left
            border-bottom 1px solid
            margin 0
          tr
            &:nth-child(even)
              background-color rgba(152, 152, 152, .1)
        mark
          background-color transparent
          color $main-control-yellow
          font-weight bold
        div
          margin .2em 0 .8em 0
          padding 5px
          border-radius 5px
          background-color rgba(152, 152, 152, .4)
          word-break break-all
          p
            margin-bottom .5em
  .kd-is-app
    .dip-container
      color var(--app-text-color)
    .dip-close
      color var(--app-main-color)
    .simplebar-scrollbar:before
      background var(--app-main-color)
    article
      hr
        // border-top 1px solid var(--app-lighten-main-color)
        border-top none
        border-bottom 1px solid var(--app-main-color)
      h1
        color var(--app-title-color)
      .dfe-fixed
        color var(--app-lighten-main-color)
      .dfe-content
        table
          th
            color var(--app-title-color)
          tr
            &:nth-child(even)
              background-color var(--app-darken-background-color, .1)
        mark
          color var(--app-title-color)
        div
          background-color var(--app-darken-background-color, .4)
          p
            margin-bottom .5em
    /*
    .dip-bottom
      background-color rgb(57, 57, 57)
      height 36px
      width 100%
      position absolute
      bottom 0
    .dip-comment
      position absolute
      bottom 5px
      height 25px
      line-height 25px
      vertical-align middle
      margin-left 8px
      &:hover
        cursor pointer
        i
          color white !important

    .dip-rating
      position absolute
      bottom 5px
      right 0
      height 25px
      line-height 25px
      vertical-align middle
      margin-right 8px
      .q-rating i:not(.active)
        color $grey-8
        opacity 1

     */
</style>

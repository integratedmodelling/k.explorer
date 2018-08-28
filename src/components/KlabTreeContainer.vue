<template>
  <div id="simplebar-tree-div">
    <klab-splitter :margin="0" :hidden="additionalContentType === '' ? 'right' : ''" @close-metadata="additionalContentType = ''">
      <div slot="left-pane">
        <klab-tree id="mc-main-content"></klab-tree>
      </div>
      <div slot="right-pane">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <component :is="additionalContentType" id="mc-additional-content">{{ additionalContent }}</component>
        </transition>
      </div>
    </klab-splitter>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Helpers, Constants } from 'shared/Helpers';
import KlabTree from 'components/KlabTree.vue';
import KlabSplitter from 'components/KlabSplitter.vue';
import Metadata from 'components/additional/Metadata.vue';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

export default {
  name: 'klabTreeContainer',
  data() {
    return {
      content: 'KlabTree',
      additionalContentType: '', // 'Metadata',
      additionalContent: 'Test de additionalContent',
      scrollElement: null,
      askingForSiblings: false,
    };
  },
  methods: {
    ...mapActions('data', [
      'askForSiblings',
    ]),
  },
  mounted() {
    this.scrollElement = (new SimpleBar(document.getElementById('simplebar-tree-div'))).getScrollElement();
    this.scrollElement.addEventListener('scroll', (event) => {
      if (this.askingForSiblings || this.lasts.length === 0) {
        event.preventDefault();
        return;
      }
      const { bottom } = this.scrollElement.getBoundingClientRect(); // - this.scrollElement.getBoundingClientRect().top;
      this.lasts.forEach((last) => {
        const ltc = document.getElementById(`node-${last.observationId}`);
        if (ltc !== null) {
          const ltcBoundingClinetRect = ltc.getBoundingClientRect();
          if (ltcBoundingClinetRect.bottom !== 0 && ltcBoundingClinetRect.bottom < bottom) {
            console.log('Ask for more siblings');
            this.askingForSiblings = true;
            const folder = Helpers.findNodeById(this.tree, last.folderId);
            this.askForSiblings({
              nodeId: last.observationId,
              folderId: last.folderId,
              offset: last.offset,
              count: Constants.SIBLINGS_TO_ASK_FOR,
              visible: typeof folder.ticked === 'undefined' ? false : folder.ticked,
            }).then(() => {
              this.askingForSiblings = false;
              this.$eventBus.$emit('updateFolder', { folderId: last.folderId, visible: typeof folder.ticked === 'undefined' ? false : folder.ticked });
            });
          }
        }
      });
    });
  },
  components: {
    KlabTree,
    KlabSplitter,
    Metadata,
  },
};
</script>
<style lang="stylus">
  .q-tree .text-white {
    text-shadow: 1px 0 0 #aaa;
  }
  #mc-additional-content {
    color:white;
    padding: 2px 5px;
  }
</style>

<template>
  <div id="klab-tree-pane">
    <klab-splitter :margin="0" :hidden="additionalContentType === '' ? 'right' : ''" @close-metadata="additionalContentType = ''">
      <div slot="left-pane">
        <klab-tree></klab-tree>
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
import KlabTree from 'components/KlabTree.vue';
import KlabSplitter from 'components/KlabSplitter.vue';
import Metadata from 'components/additional/Metadata.vue';

export default {
  name: 'klabTreeContainer',
  data() {
    return {
      content: 'KlabTree',
      additionalContentType: 'Metadata',
      additionalContent: 'Test de additionalContent',
    };
  },
  methods: {
  },
  mounted() {
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

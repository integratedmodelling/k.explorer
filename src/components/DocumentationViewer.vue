<template>
  <div class="dv-documentation">
    <div class="dv-documentation-wrapper">
      <div class="dv-empty-documentation" v-if="content === ''">{{ $t('messages.noDocumentation') }}</div>
      <div class="dv-content" v-html="content" v-else></div>
      <q-btn icon="mdi-refresh" round class="dv-doc-reload" color="mc-main" @click="forceReload">
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
import { mapGetters, mapActions } from 'vuex';
import { DOCUMENTATION_TYPES } from 'shared/Constants';
import { flattenTree } from 'shared/Helpers';
import { CUSTOM_EVENTS } from '../shared/Constants';

export default {
  name: 'DocumentationViewer',
  data() {
    return {
      content: '',
      rawDocumentation: [],
    };
  },
  computed: {
    ...mapGetters('data', [
      'documentationTrees',
      'documentationContent',
    ]),
    ...mapGetters('view', [
      'documentationView',
      'documentationSelected',
    ]),
    tree() {
      return this.documentationTrees.find(dt => dt.view === this.documentationView).tree;
    },
  },
  methods: {
    ...mapActions('view', [
      'setNeedReloadDoc',
    ]),
    forceReload() {
      this.setNeedReloadDoc(true);
    },
  },
  watch: {
    tree() {
      this.rawDocumentation.splice(0, this.rawDocumentation.length);
      this.content = '';
      this.tree.forEach((doc) => {
        flattenTree(doc, 'children').forEach((e) => {
          this.rawDocumentation.push(e);
        });
      });
      this.rawDocumentation.forEach((doc) => {
        const content = this.documentationContent.get(doc.id);
        switch (doc.type) {
          case DOCUMENTATION_TYPES.PARAGRAPH:
            this.content += content.bodyText;
            console.warn(content);
            break;
          case DOCUMENTATION_TYPES.SECTION:
            this.content += `<h1 id="${content.id}">${content.title}</h1>${content.subtitle ? `<h4>${doc.subtitle}` : ''}`;
            console.warn(content);
            break;
          default:
            // console.warn(content);
            break;
        }
      });
    },
    documentationSelected(newValue) {
      Array.prototype.forEach.call(document.getElementsByClassName('dv-selected'), (e) => {
        e.classList.remove('dv-selected');
      });
      if (newValue !== null) {
        const el = document.getElementById(newValue);
        if (el) {
          // Use el.scrollIntoView() to instantly scroll to the element
          el.scrollIntoView({ behavior: 'smooth' });
          el.classList.add('dv-selected');
        }
      }
    },
  },
  activated() {
    this.$eventBus.$emit(CUSTOM_EVENTS.DOCUMETATION_ACTIVATED);
  },
  mounted() {
  },
  beforeDestroy() {
  },
};
</script>

<style lang="stylus">
  .dv-empty-documentation
    position absolute
    width 400px
    height 80px
    left calc((100% - 400px) / 2)
    top calc((100% - 80px) / 2)
    margin-left -200px
    margin-top -40px
    padding 0
    text-align center
    font-size 60px
    font-weight bold
    color rgb(17, 170, 187)

  .dv-documentation-wrapper
    position absolute
    width 1024px
    left calc((100% - 1024px) / 2)
    height 100%
    overflow auto
    border none
  .dv-doc-reload
    position fixed
    top 30px
    right 30px

</style>

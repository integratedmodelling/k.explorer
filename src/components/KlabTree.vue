<template>
  <div id="kt-container" class="relative-position klab-menu-component" :class="{ 'loading':  taskIsAlive }">
    <div id="kt-tree-container" class="simplebar-vertical-only">
      <klab-q-tree
        ref="klab-tree"
        :nodes="visibleTree(filter)"
        node-key="id"
        :ticked.sync="ticked"
        :selected.sync="selected"
        :expanded.sync="expanded"
        tick-strategy="strict"
        text-color="white"
        control-color="white"
        color="white"
        :dark="true"
        :double-click-function="fitMap"
      >
        <div slot="header-default" slot-scope="prop">
          <span
            v-ripple="prop.node.main"
            :class="[
              'node-element', prop.node.main ? 'node-emphasized' : '',
               hasObservationInfo && observationInfo.id === prop.node.id ? 'node-selected' : '',
               topLayerId !== null && topLayerId === prop.node.id ? 'node-on-top' : ''
            ]"
            :id="`node-${prop.node.id}`"
          >{{ prop.node.label }}
            <q-tooltip
              :delay="300"
              :offset="[0, 8]"
              self="top left"
              anchor="bottom middle"
              class="kt-q-tooltip"
            >{{ clearObservable(prop.node.observable) }}</q-tooltip>
          </span>
          <q-btn
            round
            flat
            size="sm"
            icon="mdi-arrow-down"
            class="kt-download"
            :style="{ right: prop.node.children.length > 0 ? '35px' : typeof prop.node.idx !== 'undefined' ? prop.node.siblingCount > 100 ? prop.node.idx > 100 ? '80px' : '70px' : '62px' : '10px' }"
            v-if="!prop.node.empty"
            @click.native="askForOutputFormat($event, prop.node.id, prop.node.exportFormats)"
          >
          </q-btn>
          <template v-if="prop.node.children.length > 0">
            <q-chip class="node-chip" color="white" small dense text-color="grey-7">{{ prop.node.children.length }}</q-chip>
          </template>
          <template else>
            <q-chip v-show="typeof prop.node.idx !== 'undefined'" class="node-chip transparent" small dense text-color="grey-9">
              {{  $t('label.itemCounter', { loaded: prop.node.idx + 1, total: prop.node.siblingCount }) }}
            </q-chip>
          </template>
        </div>
        <div slot="header-folder" slot-scope="prop">
          <span v-ripple="prop.node.main" :class="['node-element', prop.node.main ? 'node-emphasized' : '']" :id="`node-${prop.node.id}`">{{ prop.node.label }}</span>
          <q-chip class="node-chip" color="white" small dense text-color="grey-7">{{ prop.node.siblingCount ? prop.node.siblingCount : prop.node.children.length }}</q-chip>
        </div>
      </klab-q-tree>
    </div>
    <!-- TODO rightClickHandler
    REMEMBER: add @contextmenu to div#kt-tree-container
    <q-context-menu v-show="enableContextMenu" ref="observations-context">
      <q-list dense no-border style="min-width: 150px" @click="$refs.context.close()">
        <template v-for="(action, index) in itemActions">
          <q-item-separator :key="action.actionId" v-if="action.separator && index !== 0"></q-item-separator>
          <q-item v-if="!action.separator && action.enabled" link :key="action.actionId" @click.native="askForAction(itemObservationId, action.actionId)">
            <q-item-main :label="action.actionLabel"></q-item-main>
          </q-item>
          <q-item v-if="!action.separator && !action.enabled" :key="action.actionId" disabled>
            <q-item-main :label="action.actionLabel"></q-item-main>
          </q-item>
        </template>
      </q-list>
    </q-context-menu>
    -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { Helpers, Constants } from 'shared/Helpers';
import { CUSTOM_EVENTS } from 'shared/Constants';
import SimpleBar from 'simplebar';
import KlabQTree from 'components/KlabTreeComponent';

export default {
  name: 'klabTree',
  components: {
    KlabQTree,
  },
  data() {
    return {
      ticked: [],
      selected: null,
      expanded: [],
      enableContextMenu: false,
      itemActions: [],
      itemObservationId: null,
      askingForSiblings: false,
      scrollElement: null,
      showPopover: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'tree',
      'visibleTree',
      'treeNode',
      'lasts',
      'contextReloaded',
      'contextId',
    ]),
    ...mapGetters('stomp', [
      'tasks',
    ]),
    ...mapGetters('view', [
      'observationInfo',
      'hasObservationInfo',
      'topLayerId',
    ]),
    ...mapState('view', [
      'treeSelected',
      'treeTicked',
      'treeExpanded',
      'showNotified',
    ]),
    filter() {
      return this.showNotified === Constants.PARAMS_NOTIFIED_ONLY ? 'filter-active' : '';
    },
    taskIsAlive() {
      return typeof this.tasks.find(t => (t.contextId === this.contextId && t.alive)) !== 'undefined';
    },
  },
  methods: {
    ...mapActions('data', [
      'hideNode',
      'showNode',
      'selectNode',
      'askForSiblings',
      'setFolderVisibility',
    ]),
    ...mapActions('view', [
      'setSpinner',
    ]),
    filterMethod(node) {
      return !this.contextReloaded || node.notified;
    },
    /* TODO context menu better implementation
    rightClickHandler(e) {
      e.preventDefault();
      let spanNode = null;
      if (e.target.className === 'node-element') {
        spanNode = e.target;
      } else {
        const spanNodeArray = e.target.getElementsByClassName('node-element');
        if (spanNodeArray.length === 1) {
          [spanNode] = spanNodeArray;
        }
      }
      if (spanNode !== null) {
        const observationId = spanNode.id.substring(5);
        const node = this.treeNode(observationId);
        if (node && node !== null) {
          if (node.actions && node.actions.length > 0) {
            this.itemActions = node.actions.slice(0);
            this.itemObservationId = observationId;
          } else {
            this.itemActions = [{
              actionId: null,
              actionLabel: this.$t('messages.noActionForObservation'),
              enabled: false,
              separator: false,
            }];
            this.itemObservationId = null;
          }
        } else {
          this.itemActions = [];
          this.itemObservationId = null;
        }
        this.enableContextMenu = (this.itemActions && this.itemActions.length > 0);
      } else {
        this.enableContextMenu = false;
      }
    },
    askForAction(observationId, actionId) {
      console.log(`Will ask for ${actionId} of observation ${observationId}`);
      this.enableContextMenu = false;
    },
    */
    dragover(event) {
      event.preventDefault();
      console.log(`Dragged over -> ${JSON.stringify(event)}`);
    },
    drop(event) {
      console.log('File(s) dropped');

      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault();

      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < event.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (event.dataTransfer.items[i].kind === 'file') {
            const file = event.dataTransfer.items[i].getAsFile();
            console.log(`... file[${i}].name = ${file.name}`);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < event.dataTransfer.files.length; i++) {
          console.log(`... file[${i}].name = ${event.dataTransfer.files[i].name}`);
        }
      }

      // Pass event to removeDragData for cleanup
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to remove the drag data
        event.dataTransfer.items.clear();
      } else {
        // Use DataTransfer interface to remove the drag data
        event.dataTransfer.clearData();
      }
    },
    clearObservable(text) {
      if (text.indexOf('(') === 0 && text.lastIndexOf(')') === text.length - 1) {
        return text.substring(1, text.length - 1);
      }
      return text;
    },
    askForOutputFormat(event, observationId, formats) {
      if (formats !== null && formats.length > 0) {
        event.stopPropagation();
        this.$q.dialog({
          title: this.$t('label.titleOutputFormat'),
          message: this.$t('label.askForOuputFormat'),
          options: {
            type: 'radio',
            model: formats[0].value,
            items: formats,
          },
          cancel: true,
          preventClose: false,
          color: 'info',
        }).then((data) => {
          this.askDownload(observationId, data);
        }).catch(() => {
          // pressed cancel, the Quasar Framework manage it with catch, we don't need it
        });
      } else {
        this.$q.notify({
          message: 'No available formats',
          type: 'warn',
          timeout: 200,
        });
      }
    },
    askDownload(observationId, outputFormat, label = observationId) {
      Helpers.getAxiosContent(
        `dw_${observationId}`,
        `${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}data/${observationId}`,
        {
          params: {
            format: 'RAW', // TODO change when RAW call work as expected
            outputFormat,
          },
          responseType: 'blob',
        },
        (response, callback) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${label}.${outputFormat}`);
          document.body.appendChild(link);
          link.click();
          callback();
        },
      );
    },
    changeNodeState({ nodeId, state }) {
      if (typeof this.$refs['klab-tree'] !== 'undefined') {
        this.$refs['klab-tree'].setTicked([nodeId], state);
      }
    },
    fitMap(node, meta) {
      this.$eventBus.$emit(CUSTOM_EVENTS.NEED_FIT_MAP);
      if (node && meta && meta.ticked) {
        this.showNode({ nodeId: node.id, selectMainViewer: true });
      }
    },
  },
  watch: {
    treeSelected(value) {
      if (value !== this.selected) {
        this.selected = value;
      }
    },
    expanded(expanded) {
      this.$store.state.view.treeExpanded = expanded;
    },
    selected(selectedId /* , unselectedId */) {
      if (selectedId !== null) {
        // check if is a folder
        if (selectedId.indexOf('ff_') === 0) {
          this.selected = null;
        } else {
          this.selectNode(selectedId);
        }
      /* } else if (this.observationInfo !== null && unselectedId !== null && unselectedId === this.observationInfo.id) {
        // if we has select the actual observationInfo and it state is selected, we don't want to unselect it
        this.selectNode(unselectedId);
        this.selected = unselectedId; */
      } else {
        this.selectNode(null);
      }
    },
    ticked(newValues, oldValues) {
      this.$store.state.view.treeTicked = newValues;
      if (oldValues.length === newValues.length) { // nothing change
        return;
      }
      if (oldValues.length > newValues.length) {
        // some node was deselected
        const unselectedId = oldValues.filter(n => newValues.indexOf(n) < 0)[0];
        const unselectedNode = Helpers.findNodeById(this.tree, unselectedId);
        if (unselectedNode) {
          if (unselectedNode.type === Constants.GEOMTYP_FOLDER) {
            this.setFolderVisibility({ folderId: unselectedNode.id, visible: false });
            this.ticked = this.ticked.filter(n => unselectedNode.children.findIndex(c => c.id === n) === -1);
          } else {
            /* TODO analyze this: if folder is not Constants.GEOMTYP_FOLDER, is not a good behaviour. If we need to check this, is expensive (need to find node to check if is a fake or real folder
            if (unselectedNode.folderId !== null && this.ticked.indexOf(unselectedNode.folderId) !== -1) {
              // we unselect the folder
              this.ticked.splice(this.ticked.indexOf(unselectedNode.folderId), 1);
            }
            */
            this.hideNode(unselectedId);
          }
        }
      } else {
        // checked some new
        const { [newValues.length - 1]: selectedId } = newValues;
        // this.selectNode(selectedId);
        const selectedNode = Helpers.findNodeById(this.tree, selectedId);
        if (selectedNode.type === Constants.GEOMTYP_FOLDER) {
          const tickAll = () => {
            this.setFolderVisibility({ folderId: selectedNode.id, visible: true });
            this.ticked.push(...(selectedNode.children.map(child => child.id)));
          };
          if (selectedNode.siblingsLoaded < selectedNode.siblingCount && !this.askingForSiblings) {
            this.askingForSiblings = true;
            const node = this.lasts.find(l => l.folderId === selectedNode.id);
            this.askForSiblings({
              nodeId: node.observationId,
              folderId: node.folderId,
              offset: selectedNode.siblingsLoaded - 1,
              count: -1,
              toTree: false,
              visible: true,
            }).then(() => {
              this.askingForSiblings = false;
              tickAll();
            });
          } else {
            tickAll();
          }
        } else {
          this.showNode({ nodeId: selectedId, selectMainViewer: true });
        }
      }
    },
  },
  mounted() {
    this.scrollElement = (new SimpleBar(document.getElementById('kt-tree-container'))).getScrollElement();
    this.scrollElement.addEventListener('scroll', (event) => {
      if (this.askingForSiblings) {
        event.preventDefault();
        console.debug('KlabTree -> We are asking for tree now, this call is not need so exit');
        return;
      }
      if (this.lasts.length === 0) {
        event.preventDefault();
        console.debug('KlabTree -> There aren\'t incompleted folders, exit');
        return;
      }
      const { bottom } = this.scrollElement.getBoundingClientRect(); // - this.scrollElement.getBoundingClientRect().top;
      this.lasts.forEach((last) => {
        const ltc = document.getElementById(`node-${last.observationId}`);
        if (ltc !== null) {
          const ltcBoundingClinetRect = ltc.getBoundingClientRect();
          if (ltcBoundingClinetRect.bottom !== 0 && ltcBoundingClinetRect.bottom < bottom) {
            this.askingForSiblings = true;
            const folder = Helpers.findNodeById(this.tree, last.folderId);
            this.askForSiblings({
              nodeId: last.observationId,
              folderId: last.folderId,
              offset: last.offset,
              count: this.$store.state.data.siblingsToAskFor,
              visible: typeof folder.ticked === 'undefined' ? false : folder.ticked,
            }).then(() => {
              this.askingForSiblings = false;
              console.debug('KlabTree -> Asked for them');
              this.$eventBus.$emit(CUSTOM_EVENTS.UPDATE_FOLDER, { folderId: last.folderId, visible: typeof folder.ticked === 'undefined' ? false : folder.ticked });
            });
          }
        }
      });
    });
    this.$eventBus.$on(CUSTOM_EVENTS.UPDATE_FOLDER, (event) => {
      if (event && event.folderId) {
        const folder = Helpers.findNodeById(this.tree, event.folderId);
        if (folder && folder !== null) {
          if (event.visible) {
            this.$refs['klab-tree'].setTicked(folder.children.map(child => child.id), true);
            // this.ticked.push(...(folder.children.map(child => child.id)));
          } else {
            this.$refs['klab-tree'].setTicked(this.ticked.filter(n => folder.children.findIndex(c => c.id === n) === -1), false);
            // this.ticked = this.ticked.filter(n => folder.children.findIndex(c => c.id === n) === -1);
          }
        }
      }
    });
    /*
    this.$eventBus.$on(CUSTOM_EVENTS.SHOW_NODE, ({ nodeId, state }) => {
      console.warn('Im here');
      if (typeof this.$refs['klab-tree'] !== 'undefined') {
        this.$refs['klab-tree'].setTicked([nodeId], state);
      }
    });
    */
    this.selected = this.treeSelected;
    this.ticked = this.treeTicked;
    this.expanded = this.treeExpanded;
  },
  /*
  destroyed() {
    this.$eventBus.$off(CUSTOM_EVENTS.SHOW_NODE);
  },
  */
};
</script>
<style lang="stylus">
  @import '~variables'
  #kt-container
    /* removed 30px of padding and scrollbar padding-bottom */
    max-height "calc(var(--main-control-max-height) - %s)" % ($main-control-scrollbar + $main-control-header-height + $main-control-actions-height)
    padding 10px 0
    &.with-splitter
      /* removed 30px of padding and scrollbar padding-bottom */
      max-height "calc(var(--main-control-max-height) - %s)" % ($main-control-spc-height + $main-control-scrollbar + $main-control-header-height + $main-control-actions-height)
    &.loading
      background linear-gradient(90deg, #333, #999)
      background-size 200% 100%
      animation loading-gradient 4s linear infinite
    [data-simplebar]
      padding-bottom 10px
    #kt-tree-container
      .q-tree > .q-tree-node
          padding 0
      .q-tree-node-collapsible
        overflow-x hidden
      .q-tree-children
        margin-bottom 4px
      .q-tree-node-selected
        background-color rgba(0, 0, 0, 0.15)
      .q-tree-node
        padding: 0 0 3px 15px;
        &.q-tree-node-child
          min-height var(--q-tree-no-child-min-height)
      .q-tree-node-header
        margin-top 0
        &:before
          width 25px
          left -28px
        &:hover
          .kt-download
            display block
            &:hover
              background-color #fff
              border none
              color #666

      .q-chip.node-chip
        position absolute
        right 10px
        height 20px
        min-width 20px
        top 4px
        text-align center

      .kt-download
        position absolute
        top 4px
        display none
        z-index 9999
        color #eee
        border 2px solid #eee
        width 20px
        height 20px
        padding-left 1px

      .node-emphasized
        color #fff
        font-weight 700
        animation flash linear 2s
      .node-element
        text-shadow none
      .node-selected
        text-decoration underline $main-control-yellow dotted
        color $main-control-yellow
      .node-on-top
        text-decoration underline
      .kt-q-tooltip
        background-color #333

  @keyframes flash {
    0% { opacity: 1; }
    25% { opacity: .5; }
    50% { opacity: 1; }
    75% { opacity: .5; }
    100% { opacity: 1; }
  }
  @keyframes loading-gradient {
    0% { background-position: 0% 0% }
    50% { background-position: 100% 0% }
    100% { background-position: 0% 0% }
  }
</style>

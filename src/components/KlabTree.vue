<template>
  <div class="kt-container relative-position klab-menu-component">
    <div class="kt-tree-container simplebar-vertical-only" @contextmenu="rightClickHandler">
      <klab-q-tree
        ref="klab-tree"
        :nodes="tree"
        node-key="id"
        :ticked.sync="ticked"
        :selected.sync="selected"
        :expanded.sync="expanded"
        tick-strategy="strict"
        text-color="white"
        control-color="white"
        color="white"
        :dark="true"
        :noNodesLabel="$t('label.noNodes')"
        :double-click-function="doubleClick"
        @click="$refs['observations-context'].close()"
        :filter="isUser ? 'user' : 'tree'"
        :filterMethod="filterUser"
        :noFilteredResultLabel="isUser ? taskOfContextIsAlive ? $t('messages.treeNoResultUserWaiting') : $t('messages.treeNoResultUser') : $t('messages.treeNoResultNoUser')">
      >
        <div slot="header-default" slot-scope="prop">
          <span
            v-ripple="prop.node.main"
            :class="[
               prop.node.main ? 'node-emphasized' : '',
               hasObservationInfo && observationInfo.id === prop.node.id ? 'node-selected' : '',
               topLayerId !== null && topLayerId === prop.node.id ? 'node-on-top' : '',
               isUser ? 'node-user-element' : 'node-tree-element'
            ]"
            class="node-element"
            :id="`node-${prop.node.id}`"
          >{{ prop.node.label }}
            <q-tooltip
              :delay="300"
              :offset="[0, 8]"
              self="bottom left"
              anchor="top left"
              class="kt-q-tooltip"
            >{{ clearObservable(prop.node.observable) }}</q-tooltip>
          </span>
          <q-btn
            round
            flat
            size="sm"
            icon="mdi-arrow-down"
            class="kt-download"
            :style="{ right: prop.node.children.length > 0 ? '35px' : typeof prop.node.idx !== 'undefined' ? prop.node.childrenCount > 100 ? prop.node.idx > 100 ? '80px' : '70px' : '62px' : '10px' }"
            v-if="!prop.node.empty"
            @click.native="askForOutputFormat($event, prop.node.id, prop.node.exportFormats)"
          >
          </q-btn>
          <template v-if="prop.node.children.length > 0">
            <q-chip class="node-chip" color="white" small dense text-color="grey-7">{{ prop.node.children.length }}</q-chip>
          </template>
          <template else>
            <q-chip v-show="typeof prop.node.idx !== 'undefined'" class="node-chip transparent" small dense text-color="grey-9">
              {{  $t('label.itemCounter', { loaded: prop.node.idx + 1, total: prop.node.siblingsCount }) }}
            </q-chip>
          </template>
        </div>
        <div slot="header-folder" slot-scope="prop">
          <span
            class='node-element'
            :id="`node-${prop.node.id}`"
            v-ripple="prop.node.main"
            :class="[prop.node.main ? 'node-emphasized' : '']"
          >{{ prop.node.label }}</span>
          <q-btn
            round
            flat
            size="sm"
            icon="mdi-arrow-down"
            class="kt-download"
            :style="{ right: `${35 + Math.trunc(prop.node.childrenCount.toString().length / 3) * 5}px` }"
            v-if="prop.node.exportFormats"
            @click.native="askForOutputFormat($event, prop.node.id, prop.node.exportFormats, true)"
          >
          </q-btn>
          <q-chip class="node-chip" color="white" small dense text-color="grey-7">{{ prop.node.childrenCount ? prop.node.childrenCount : prop.node.children.length }}</q-chip>
        </div>
      </klab-q-tree>
    </div>

    <q-context-menu ref="observations-context" v-show="enableContextMenu" @hide="enableContextMenu = false">
      <q-list dense no-border style="min-width: 150px">
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

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { getAxiosContent, findNodeById, getContextGeometry } from 'shared/Helpers';
import { CUSTOM_EVENTS, OBSERVATION_CONSTANTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import SimpleBar from 'simplebar';
import KlabQTree from 'components/KlabTreeComponent';

let scrollToTimeout = null;

export default {
  name: 'klabTree',
  components: {
    KlabQTree,
  },
  props: {
    isUser: {
      type: Boolean,
      required: true,
    },
    tree: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      ticked: [],
      selected: null,
      expanded: [],
      enableContextMenu: false,
      itemActions: [],
      itemObservationId: null,
      askingForChildren: false,
      scrollElement: null,
      showPopover: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'treeNode',
      'lasts',
      'contextReloaded',
      'contextId',
      'observations',
    ]),
    ...mapGetters('stomp', [
      'tasks',
      'taskOfContextIsAlive',
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
  },
  methods: {
    ...mapActions('data', [
      'setVisibility',
      'selectNode',
      'askForChildren',
      'addChildrenToTree',
      'setContext',
    ]),
    ...mapActions('view', [
      'setSpinner',
      'setMainDataViewer',
    ]),
    /*
    filterMethod(node) {
      return !this.contextReloaded || node.notified;
    },
    */
    filterUser(node, filter) {
      return node.userNode ? filter === 'user' : filter === 'tree';
    },
    rightClickHandler(e) {
      e.preventDefault();
      let spanNode = null;
      if (e.target.className.includes('node-element')) {
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
        if (node && node !== null && node.actions && node.actions.length > 1) {
          this.itemActions = node.actions.slice(1);
          this.itemObservationId = observationId;
          /*
          else {
            this.itemActions = [{
              actionId: null,
              actionLabel: this.$t('messages.noActionForObservation'),
              enabled: false,
              separator: false,
            }];
            this.itemObservationId = null;
          }
          */
        } else {
          this.itemActions = [];
          this.itemObservationId = null;
        }
        if (node.observationType !== OBSERVATION_CONSTANTS.TYPE_STATE) {
          this.itemActions = [{
            actionId: 0,
            actionLabel: this.$t('label.recontextualization'),
            enabled: true,
            separator: false,
          }];
          this.itemObservationId = observationId;
        }
        if (this.itemActions && this.itemActions.length > 0) {
          this.enableContextMenu = (this.itemActions && this.itemActions.length > 0);
        } else {
          this.enableContextMenu = false;
        }
      }
    },
    askForAction(observationId, actionId) {
      console.log(`Will ask for ${actionId} of observation ${observationId}`);
      if (actionId === 0) { // is ricontextualization
        const observation = this.observations.find(o => o.id === observationId);
        if (observation && observation !== null) {
          this.sendStompMessage(MESSAGES_BUILDERS.CONTEXTUALIZATION_REQUEST(
            { contextId: observationId, parentContext: this.contextId },
            this.$store.state.data.session,
          ).body);
          this.setContext({ context: observation, isRecontext: true });
        }
      }
      this.enableContextMenu = false;
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
          this.askDownload(observationId, data, formats);
        }).catch(() => {
          // pressed cancel, the Quasar Framework manage it with catch, we don't need it
        });
      } else {
        this.$q.notify({
          message: 'No available formats',
          type: 'warning',
          icon: 'mdi-alert',
          timeout: 200,
        });
      }
    },
    askDownload(observationId, outputFormat, formats, label = observationId) {
      const selectedFormat = formats.find(f => f.value === outputFormat);
      getAxiosContent(
        `dw_${observationId}`,
        `${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}data/${observationId}`,
        {
          params: {
            format: 'RAW', // TODO change when RAW call work as expected
            outputFormat,
            adapter: selectedFormat.adapter,
          },
          responseType: 'blob',
        },
        (response, callback) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${label}.${selectedFormat.extension}`);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
          callback();
        },
      );
    },
    changeNodeState({ nodeId, state }) {
      if (typeof this.$refs['klab-tree'] !== 'undefined') {
        this.$refs['klab-tree'].setTicked([nodeId], state);
      }
    },
    async doubleClick(node, meta) {
      if (node.isContainer) {
        if (node.viewerIdx !== null) {
          this.setMainDataViewer({ viewerIdx: node.viewerIdx, visible: node.visible });
        }
      } else if (node.observationType === OBSERVATION_CONSTANTS.TYPE_STATE) {
        this.fitMap(node, meta);
      } else {
        const observation = this.observations.find(o => o.id === node.id);
        if (observation && observation !== null) {
          const geometry = await getContextGeometry(observation);
          this.fitMap(node, meta, geometry);
        }
      }
    },
    fitMap(node, meta, geometry = null) {
      this.$eventBus.$emit(CUSTOM_EVENTS.NEED_FIT_MAP, { geometry });
      if (node && meta && meta.ticked) {
        this.setVisibility({ node, visible: true });
      }
    },
    updateFolderListener(event) {
      if (event && event.folderId) {
        const folder = findNodeById(this.tree, event.folderId);
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
    },
    treeSizeChangeListener() {
      if (!this.isUser) {
        if (scrollToTimeout != null) {
          clearTimeout(this.scrollToTimeout);
          scrollToTimeout = null;
        }
        this.$nextTick(() => {
          scrollToTimeout = setTimeout(() => {
            this.scrollElement.scrollTop = this.scrollElement.scrollHeight;
          }, 1000);
        });
      }
    },
  },
  watch: {
    tree() {
      this.treeSizeChangeListener();
    },
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
        const unselectedNode = findNodeById(this.tree, unselectedId);
        if (unselectedNode) {
          this.setVisibility({
            node: unselectedNode,
            visible: false,
          });
          if (unselectedNode.isContainer) {
            this.ticked = this.ticked.filter(n => unselectedNode.children.findIndex(c => c.id === n) === -1);
          }
        }
      } else {
        // checked some new
        const { [newValues.length - 1]: selectedId } = newValues;
        // this.selectNode(selectedId);
        const selectedNode = findNodeById(this.tree, selectedId);
        if (selectedNode.isContainer) {
          const tickAll = () => {
            this.setVisibility({
              node: selectedNode,
              visible: true,
            });
            this.ticked.push(...(selectedNode.children.filter(child => child.parentArtifactId === selectedNode.id).map(child => child.id)));
          };
          if (!this.askingForChildren) {
            if (selectedNode.childrenLoaded < selectedNode.childrenCount) {
              this.askingForChildren = true;
              const node = this.lasts.find(l => l.parentId === selectedNode.id);
              this.askForChildren({
                parentId: node.parentId,
                offset: selectedNode.childrenLoaded,
                count: -1,
                toTree: false,
                visible: true,
                total: selectedNode.childrenCount,
              }).then(() => {
                this.askingForChildren = false;
                tickAll();
              });
            } else {
              tickAll();
            }
          }
        } else {
          this.setVisibility({ node: selectedNode, visible: true });
        }
      }
    },
  },
  mounted() {
    this.scrollElement = (new SimpleBar(document.querySelector(`#${this.$el.id} .kt-tree-container`))).getScrollElement();
    this.scrollElement.addEventListener('scroll', (event) => {
      if (this.askingForChildren) {
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
            this.askingForChildren = true;
            const parent = findNodeById(this.tree, last.parentId);
            if (parent.children.length < parent.childrenLoaded) { // we have the children, only need to add to tree
              this.addChildrenToTree({ parent });
              this.$eventBus.$emit(CUSTOM_EVENTS.UPDATE_FOLDER, {
                folderId: parent.id,
                visible: typeof parent.ticked === 'undefined' ? false : parent.ticked,
              });
              this.askingForChildren = false;
            } else {
              this.askForChildren({
                parentId: last.parentId,
                offset: last.offset,
                visible: typeof parent.ticked === 'undefined' ? false : parent.ticked,
                total: parent.childrenCount,
              }).then(() => {
                this.askingForChildren = false;
                console.debug('KlabTree -> Asked for them');
                this.$eventBus.$emit(CUSTOM_EVENTS.UPDATE_FOLDER, {
                  folderId: last.folderId,
                  visible: typeof parent.ticked === 'undefined' ? false : parent.ticked,
                });
              });
            }
          }
        }
      });
    });
    this.$eventBus.$on(CUSTOM_EVENTS.UPDATE_FOLDER, this.updateFolderListener);
    this.selected = this.treeSelected;
    this.ticked = this.treeTicked;
    this.expanded = this.treeExpanded;
  },

  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.UPDATE_FOLDER, this.updateFolderListener);
  },

};
</script>
<style lang="stylus">
  @import '~variables'
    /*
    [data-simplebar]
      padding-bottom 10px
    */
    .kt-tree-container
      // special class to solve the noNode
      .klab-no-nodes
        padding 5px 0
        margin 0
        text-align center
        font-style italic
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
        cursor pointer
      .node-selected
        text-decoration underline $main-control-yellow dotted
        color $main-control-yellow
      .node-on-top
        text-decoration underline
      .kt-q-tooltip
        background-color #333
      .q-tree-node-link
        cursor default
        .q-tree-arrow
          cursor pointer

      .q-tree > .q-tree-node.q-tree-node-parent > .q-tree-node-collapsible
        .q-tree-node-parent
          padding-left 1px
          .q-tree-node-header
            padding-left 0
            &:before
              width 12px
              left -14px
            > i
              margin-right 2px
          .q-tree-node-collapsible
            .q-tree-children .q-tree-node
            .q-tree-node-header
              padding-left 7px
              &:before
                width 25px
                left -24px
              &:after
                left -17px

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

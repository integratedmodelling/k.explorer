<template>
  <div
    class="kt-container relative-position klab-menu-component"
    :class="{ 'kt-drag-enter': dragEnter > 0 && !dragStart }"
    @dragenter="onDragEnter"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
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
        <div slot="header-default" slot-scope="prop" :class="{ 'node-disabled': prop.node.disabled && !prop.node.noTick }">
          <span
            :draggable="prop.node.parentId === contextId"
            @dragstart="onDragStart($event, prop.node.id)"
            @dragend="onDragEnd"
            v-ripple="prop.node.main"
            :class="[
               prop.node.main ? 'node-emphasized' : '',
               hasObservationInfo && observationInfo.id === prop.node.id ? 'node-selected' : '',
               cleanTopLayerId !== null && cleanTopLayerId === prop.node.id ? 'node-on-top' : '',
               checkObservationsOnTop(prop.node.id) ? 'node-on-top' : '',
               isUser ? 'node-user-element' : 'node-tree-element',
               prop.node.needUpdate ? 'node-updatable' : '',
            ]"
            class="node-element"
            :id="`node-${prop.node.id}`"
          >
            <q-icon name="mdi-buddhism" class="node-no-tick" size="17px" v-if="prop.node.observationType === OBSERVATION_CONSTANTS.TYPE_PROCESS"></q-icon>
            <q-icon name="mdi-checkbox-blank-circle" v-else-if="prop.node.noTick"></q-icon>
            {{ prop.node.label }}
            <q-icon name="mdi-clock-outline" v-if="prop.node.dynamic" color="mc-green" class="node-icon-time" :class="{ 'animate-spin': prop.node.loading }"></q-icon>
            <q-icon name="mdi-loading" class="node-icon-time node-loading-layer" :class="{ 'animate-spin': prop.node.loading }" v-else></q-icon>
            <q-tooltip
              :delay="300"
              :offset="[0, 8]"
              self="bottom left"
              anchor="top left"
              class="kt-q-tooltip"
            >{{ clearObservable(prop.node.observable) }}</q-tooltip> <!-- TODO: DELETE NODE ID -->

          </span>
          <template v-if="prop.node.childrenCount > 0 || prop.node.children.length > 0">
            <q-chip
              class="node-chip"
              :class="{ 'node-substituible': !prop.node.empty && !prop.node.noTick }"
              color="white"
              small
              dense
              text-color="grey-7"
            >{{  prop.node.childrenCount ? prop.node.childrenCount : prop.node.children.length }}</q-chip>
          </template>
          <q-btn
            round
            flat
            size="sm"
            icon="mdi-arrow-up"
            class="kt-upload"
            v-if="!prop.node.empty && !prop.node.noTick"
            disable
          ><q-tooltip
            :delay="300"
            :offset="[0, 8]"
            self="bottom left"
            anchor="top left"
            class="kt-q-tooltip"
          >{{ $t('tooltips.uploadData') }}</q-tooltip>
          </q-btn>
          <q-btn
            round
            flat
            size="sm"
            icon="mdi-arrow-down"
            class="kt-download"
            v-if="!prop.node.empty && !prop.node.noTick"
            @click.native="askForOutputFormat($event, prop.node.id, prop.node.exportFormats)"
          >
          </q-btn>
          <template v-if="typeof prop.node.idx !== 'undefined'">
            <q-chip
              class="node-chip transparent"
              small
              dense
              text-color="grey-9"
              :style="{ right: (prop.node.childrenCount > 0 ?
                calculateRightPosition([prop.node.childrenCount], '25px') :
                prop.node.children.length > 0 ?
                calculateRightPosition([prop.node.children.length], '25px') :
                 '') }"
            >
              {{  $t('label.itemCounter', { loaded: prop.node.idx + 1, total: prop.node.siblingsCount }) }}
            </q-chip>
          </template>
        </div>
        <div slot="header-folder" slot-scope="prop" :class="{ 'node-disabled': prop.node.disabled && !prop.node.noTick }">
          <span
            :draggable="prop.node.parentId === contextId"
            @dragstart="onDragStart($event, prop.node.id)"
            @dragend="onDragEnd"
            class='node-element'
            :id="`node-${prop.node.id}`"
            v-ripple="prop.node.main"
            :class="[prop.node.main ? 'node-emphasized' : '']"
          >{{ prop.node.label }}</span>
          <q-btn
            round
            flat
            size="sm"
            icon="mdi-arrow-up"
            class="kt-upload"
          ></q-btn>
          <q-btn
            round
            flat
            size="sm"
            icon="mdi-arrow-down"
            class="kt-download"
            @click.native="askForOutputFormat($event, prop.node.id, prop.node.exportFormats, true)"
          ></q-btn>
          <template v-if="typeof prop.node.idx !== 'undefined'">
            <q-chip
              class="node-chip transparent"
              small
              dense
              text-color="grey-9"
              :style="{ right: (prop.node.childrenCount > 0 ?
                calculateRightPosition([prop.node.childrenCount], '25px') :
                prop.node.children.length > 0 ?
                calculateRightPosition([prop.node.children.length], '25px') :
                 '') }"
            >
              {{  $t('label.itemCounter', { loaded: prop.node.idx + 1, total: prop.node.siblingsCount }) }}
            </q-chip>
          </template>
          <q-chip
            class="node-chip"
            :class="{ 'node-substituible': !prop.node.empty && !prop.node.noTick }"
            color="white"
            small
            dense
            text-color="grey-7"
          >{{ prop.node.childrenCount ? prop.node.childrenCount : prop.node.children.length }}</q-chip>
        </div>
        <div slot="header-stub" slot-scope="prop" class="node-stub">
          <span class="node-element node-stub">
            <q-icon name="mdi-checkbox-blank-circle" class="node-no-tick"></q-icon>{{ $t('messages.loadingChildren') }}
          </span>
        </div>
      </klab-q-tree>
    </div>

    <observation-context-menu @hide="contextMenuObservationId = null" :observation-id="contextMenuObservationId"></observation-context-menu>
    <q-resize-observable @resize="$emit('resized')"></q-resize-observable>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { downloadFromEngine, findNodeById, getContextGeometry } from 'shared/Helpers';
import { CUSTOM_EVENTS, OBSERVATION_CONSTANTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import SimpleBar from 'simplebar';
import KlabQTree from 'components/custom/KlabQTree';
import ObservationContextMenu from 'components/ObservationContextMenu';
import { copyToClipboard } from 'shared/Utils';

let scrollToTimeout = null;

export default {
  name: 'klabTree',
  components: {
    KlabQTree,
    ObservationContextMenu,
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

      itemObservationId: null,
      askingForChildren: false,
      scrollElement: null,
      showPopover: null,
      dragStart: false,
      dragEnter: 0,
      watchedObservation: [],
      contextMenuObservationId: null,
      OBSERVATION_CONSTANTS,
    };
  },
  computed: {
    ...mapGetters('data', [
      'treeNode',
      'lasts',
      'contextReloaded',
      'contextId',
      'observations',
      'timeEventsOfObservation',
      'timestamp',
      'observationsIdOnTop',
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
    cleanTopLayerId() {
      return this.topLayerId ? this.topLayerId.substr(0, this.topLayerId.indexOf('T')) : null;
    },
  },
  methods: {
    checkObservationsOnTop(id) {
      return this.observationsIdOnTop.length > 0 && this.observationsIdOnTop.includes(id);
    },
    copyToClipboard,
    ...mapActions('data', [
      'setVisibility',
      'selectNode',
      'askForChildren',
      'addChildrenToTree',
      'setContext',
      'changeTreeOfNode',
      'setTimestamp',
    ]),
    ...mapActions('view', [
      'setSpinner',
      'setMainDataViewer',
    ]),
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
        this.contextMenuObservationId = spanNode.id.substring(5);
      } else {
        this.contextMenuObservationId = null;
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
    askDownload(observationId, outputFormat, formats, label) {
      if (typeof label === 'undefined') {
        let sDate = '';
        if (this.timestamp !== -1) {
          const dTimestamp = new Date(this.timestamp);
          sDate = `_${dTimestamp.getFullYear()}${dTimestamp.getMonth() < 9 ? '0' : ''}${(dTimestamp.getMonth() + 1)}${dTimestamp.getDate() < 10 ? '0' : ''}${dTimestamp.getDate()}_${dTimestamp.getHours() < 10 ? '0' : ''}${dTimestamp.getHours()}${dTimestamp.getMinutes() < 10 ? '0' : ''}${dTimestamp.getMinutes()}${dTimestamp.getSeconds() < 10 ? '0' : ''}${dTimestamp.getSeconds()}`;
        }
        label = `${observationId}${sDate}`;
      }

      const selectedFormat = formats.find(f => f.value === outputFormat);
      downloadFromEngine(observationId, 'RAW', label, selectedFormat, this.timestamp);
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
      if (this.timeEventsOfObservation(node.id).length > 0) {
        this.setTimestamp(-1);
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
    selectElementListener({ id, selected }) {
      this.$nextTick(() => {
        const selectedNode = findNodeById(this.tree, id);
        if (selectedNode) {
          this.setVisibility({
            node: selectedNode,
            visible: selected,
          });
          if (selected) {
            this.ticked.push(id);
          } else {
            this.ticked.splice(this.ticked.findIndex(n => n === id), 1);
          }
        }
      });
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
    calculateRightPosition(words, addTo = '') {
      const length = words.reduce((tot, word) => tot + word.toString().length, 0);
      const add = addTo !== '' ? ` + ${addTo}` : '';
      return `calc(${length}ch${add})`;
    },
    onDragStart(event, id) {
      event.dataTransfer.setData('id', id);
      this.dragStart = true;
    },
    onDragEnd() {
      this.dragStart = false;
    },
    onDragEnter(event) {
      event.preventDefault();
      if (!this.dragStart) {
        this.dragEnter += 1;
      }
    },
    onDragLeave(event) {
      event.preventDefault();
      if (!this.dragStart) {
        this.dragEnter -= 1;
      }
    },
    onDragOver(event) {
      event.preventDefault();
    },
    onDrop(event) {
      event.preventDefault();
      if (this.dragEnter > 0) {
        const id = event.dataTransfer.getData('id');
        if (id && id !== '') {
          this.changeTreeOfNode({ id, isUserTree: this.isUser });
        } else {
          console.warn(`Strange dropped node ${event.dataTransfer.getData('id')}`);
        }
      } else {
        console.debug('Self dropped');
      }
      this.dragStart = false;
      this.dragEnter = 0;
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
    expanded(newExpanded, oldExpanded) {
      this.$store.state.view.treeExpanded = newExpanded;
      if (oldExpanded.length === newExpanded.length) {
        return;
      }
      if (oldExpanded.length > newExpanded.length) {
        // stop watch
        const contractedId = oldExpanded.filter(n => newExpanded.indexOf(n) < 0)[0];
        const contractedNode = findNodeById(this.tree, contractedId);
        this.sendStompMessage(MESSAGES_BUILDERS.WATCH_REQUEST(
          { active: false, observationId: contractedId, rootContextId: contractedNode.rootContextId },
          this.$store.state.data.session,
        ).body);
        this.watchedObservation.splice(this.watchedObservation.findIndex(wo => wo.observationId === contractedId), 1);
        console.info(`Stop watching observation ${contractedId} with rootContextId ${contractedNode.rootContextId}`);
        return;
      }
      const { [newExpanded.length - 1]: selectedId } = newExpanded;
      const expandedNode = findNodeById(this.tree, selectedId);
      if (expandedNode) {
        this.sendStompMessage(MESSAGES_BUILDERS.WATCH_REQUEST(
          { active: true, observationId: selectedId, rootContextId: expandedNode.rootContextId },
          this.$store.state.data.session,
        ).body);
        this.watchedObservation.push({
          observationId: selectedId,
          rootContextId: expandedNode.rootContextId,
        });
        console.info(`Start watching observation ${selectedId} with rootContextId ${expandedNode.rootContextId}`);
        if (expandedNode.children.length > 0 && expandedNode.children[0].id.startsWith('STUB')) {
          // remove the stub
          expandedNode.children.splice(0, 1);
          if (expandedNode.children.length < expandedNode.childrenLoaded && expandedNode.childrenLoaded > 0) { // we have the children, only need to add to tree
            this.addChildrenToTree({ parent: expandedNode });
            this.$eventBus.$emit(CUSTOM_EVENTS.UPDATE_FOLDER, {
              folderId: expandedNode.id,
              visible: typeof expandedNode.ticked === 'undefined' ? false : expandedNode.ticked,
            });
          } else if (expandedNode.children.length === 0) {
            this.askForChildren({
              parentId: expandedNode.id,
              offset: 0,
              count: this.childrenToAskFor,
              total: expandedNode.childrenCount,
              visible: typeof expandedNode.ticked === 'undefined' ? false : expandedNode.isContainer ? expandedNode.ticked : false,
            });
          }
        }
      }
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
        if (selectedNode !== null) {
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
                this.askForChildren({
                  parentId: selectedNode.id,
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
    this.$eventBus.$on(CUSTOM_EVENTS.SELECT_ELEMENT, this.selectElementListener);
    this.selected = this.treeSelected;
    this.ticked = this.treeTicked;
    this.expanded = this.treeExpanded;
  },

  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.UPDATE_FOLDER, this.updateFolderListener);
    this.$eventBus.$off(CUSTOM_EVENTS.SELECT_ELEMENT, this.selectElementListener);
    if (this.watchedObservation.length > 0) {
      this.watchedObservation.forEach((wo) => {
        this.sendStompMessage(MESSAGES_BUILDERS.WATCH_REQUEST(
          { active: false, observationId: wo.observationId, rootContextId: wo.rootContextId },
          this.$store.state.data.session,
        ).body);
        console.info(`Stop watching observation ${wo.observationId} with rootContextId ${wo.rootContextId}`);
      });
    }
  },

};
</script>
<style lang="stylus">
  @import '~variables'
    .kt-drag-enter
      background-color #555
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
          .node-substituible
            display none
          .kt-download
          .kt-upload
            display block
            &:hover
              background-color #fff
              border none
              color #666
        &.disabled
          opacity 1 !important
      .q-chip.node-chip
        position absolute
        right 10px
        height 20px
        min-width 20px
        top 4px
        text-align center
        .q-chip-main
          padding-right 2px

      .kt-download
      .kt-upload
        position absolute
        top 4px
        display none
        z-index 9999
        color #eee
        border 2px solid #eee
        width 20px
        height 20px
        // padding-left 1px
      .kt-download
        right 10px
      .kt-upload
        right 34px
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
      .mdi-buddhism
        // font-size 15px
        padding-left 1px
        margin-right 2px !important

      .node-updatable
        font-style italic
      .node-disabled
        opacity 0.6 !important
      .node-no-tick
        margin-right 5px
      .node-on-top
        color $main-control-yellow
      .node-icon
        display inline
        padding-left 5px
      .node-icon-time
        position relative
        right -5px
        &.node-loading-layer
          opacity 0
          &.animate-spin
            opacity 1
      .kt-q-tooltip
        background-color #333
      .q-tree-node-link
        cursor default
        .q-tree-arrow
          cursor pointer

      .q-tree > .q-tree-node.q-tree-node-parent > .q-tree-node-collapsible // first parent is skipped
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
              .q-tree-children
                padding-left 20px
                .q-tree-node-child
                  .q-tree-node-header
                    padding-left 4px
                    &:before
                      width 25px
                      left -28px
                    &:after
                      left -17px
                .q-tree-node-parent
                  .q-tree-node-collapsible
                    padding-left 1px
                    &:before
                      width 25px
                      left -28px
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

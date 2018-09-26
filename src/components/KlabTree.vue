<template>
    <div id="kt-container" class="relative-position" :class="[ hasObservationInfo ? 'with-splitter' : '' ]">
      <div id="kt-tree-container" class="simplebar-vertical-only">
        <q-tree
          id="kt-tree"
          ref="klabTree"
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
        >
          <div slot="header-default" slot-scope="prop">
            <span v-ripple="prop.node.main" :class="['node-element', prop.node.main ? 'node-emphasized' : '', hasObservationInfo && observationInfo.id === prop.node.id ? 'node-selected' : '']" :id="`node-${prop.node.id}`">{{ prop.node.label }}
              <q-tooltip
                :delay="300"
                :offset="[0, 8]"
                self="top left"
                anchor="bottom middle"
                class="tree-q-tooltip"
              >{{ hasObservationInfo ? `${prop.node.label}: ` : '' }}{{ clearObservable(prop.node.observable) }}</q-tooltip>
            </span>
            <q-chip class="node-chip transparent" small dense text-color="grey-9">
              {{ typeof prop.node.idx !== 'undefined' ? $t('label.itemCounter', { loaded: prop.node.idx + 1, total: prop.node.siblingCount }) : '' }}
            </q-chip>
          </div>
          <div slot="header-folder" slot-scope="prop">
            <span v-ripple="prop.node.main" :class="['node-element', prop.node.main ? 'node-emphasized' : '']" :id="`node-${prop.node.id}`">{{ prop.node.label }}</span>
            <q-chip class="node-chip" color="white" small dense text-color="grey-7">{{ prop.node.siblingCount ? prop.node.siblingCount : prop.node.children.length }}</q-chip>
          </div>
          <div slot="header-main" slot-scope="prop">
            <span v-ripple="prop.node.main" :class="['node-element', prop.node.main ? 'node-emphasized' : '', hasObservationInfo && observationInfo.id === prop.node.id ? 'node-selected' : '']" :id="`node-${prop.node.id}`">{{ prop.node.label }}
              <q-tooltip
                :delay="300"
                :offset="[0, 5]"
                self="top left"
                anchor="bottom middle"
                class="tree-q-tooltip"
              >{{ hasObservationInfo ? `${prop.node.label}: ` : '' }}{{ clearObservable(prop.node.observable) }}</q-tooltip>
            </span>
            <q-chip class="node-chip" color="white" small dense text-color="grey-7">{{ prop.node.children.length }}</q-chip>
          </div>
        </q-tree>
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
import SimpleBar from 'simplebar';

export default {
  name: 'klabTree',
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
    };
  },
  computed: {
    ...mapGetters('data', [
      'tree',
      'treeNode',
      'lasts',
    ]),
    ...mapGetters('view', [
      'observationInfo',
      'hasObservationInfo',
    ]),
    ...mapState('view', [
      'treeSelected',
      'treeTicked',
      'treeExpanded',
    ]),
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
    clearObservable(text) {
      if (text.indexOf('(') === 0 && text.lastIndexOf(')') === text.length - 1) {
        return text.substring(1, text.length - 1);
      }
      return text;
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
    selected(selectedId, unselectedId) {
      if (selectedId !== null) {
        // check if is a folder
        if (selectedId.indexOf('ff_') === 0) {
          this.selected = null;
        } else {
          this.selectNode(selectedId);
        }
      } else if (this.observationInfo !== null && unselectedId !== null && unselectedId === this.observationInfo.id) {
        // if we has select the actual observationInfo and it state is selected, we don't want to unselect it
        this.selectNode(unselectedId);
        this.selected = unselectedId;
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
          console.debug(`KlabTree -> Last element is over bottom? Element bottom: ${ltcBoundingClinetRect.bottom} / Scroll container bottom: ${bottom}`);
          if (ltcBoundingClinetRect.bottom !== 0 && ltcBoundingClinetRect.bottom < bottom) {
            console.log('KlabTree -> Ask for more siblings');
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
              console.debug('KlabTree -> Asked for them');
              this.$eventBus.$emit('updateFolder', { folderId: last.folderId, visible: typeof folder.ticked === 'undefined' ? false : folder.ticked });
            });
          }
        }
      });
    });
    this.$eventBus.$on('updateFolder', (event) => {
      if (event && event.folderId) {
        const folder = Helpers.findNodeById(this.tree, event.folderId);
        if (folder && folder !== null) {
          if (event.visible) {
            this.ticked.push(...(folder.children.map(child => child.id)));
          } else {
            this.ticked = this.ticked.filter(n => folder.children.findIndex(c => c.id === n) === -1);
          }
        }
      }
    });
    this.selected = this.treeSelected;
    this.ticked = this.treeTicked;
    this.expanded = this.treeExpanded;
  },
};
</script>
<style lang="stylus">
  @import '~variables'
  .q-tree
  .q-tree > .q-tree-node-child > .q-tree-node-header {
    /* padding-left: 24px; */
  }
  .q-tree-node {
    padding: 0 0 3px 15px;
  }
  .q-tree-node-header {
    margin-top: 0;
  }
  #kt-tree-container .q-tree-node-selected {
    background-color rgba(0, 0, 0, 0.15)
  }
  .q-tree-node-header:before {
    width: 25px;
    left: -28px;
  }
  .q-chip.node-chip {
    position:absolute;
    right: 10px;
  }
    /*
  .node-emphasized::after {
    font-family: Ionicons;
    content: " \f4b3";
  }
  */
  .node-emphasized {
    color: #fff;
    font-weight 700;
    animation: flash linear 2s;
  }
  .node-element {
    text-shadow: none;
  }
  .node-selected {
    text-decoration: underline $main-control-yellow dotted
    color $main-control-yellow
  }
  #kt-container {
    /* removed 30px of padding and scrollbar padding-bottom */
    max-height: "calc(%s - 30px)" % $main-control-max-height;
    padding: 10px 0
  }
  #kt-container.with-splitter {
    /* removed 30px of padding and scrollbar padding-bottom */
    max-height: "calc(%s - 30px)" % ($main-control-max-height - $main-control-spc-height);
  }
  .tree-q-tooltip {
    background-color #333
  }
  @keyframes flash {
    0% { opacity: 1; }
    25% { opacity: .5; }
    50% { opacity: 1; }
    75% { opacity: .5; }
    100% { opacity: 1; }
  }
  [data-simplebar] {
    padding-bottom: 10px;
  }
  #kt-container .q-tree-node-collapsible {
    overflow-x: hidden;
  }
  #kt-container .q-tree-children {
    margin-bottom: 4px;
  }
</style>

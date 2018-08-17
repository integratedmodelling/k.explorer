<template>
  <main>
    <div @contextmenu="rightClickHandler($event)" v-if="tree.length > 0">
      <q-tree
        ref="klabTree"
        :nodes="tree"
        node-key="id"
        :ticked.sync="ticked"
        :selected.sync="selected"
        tick-strategy="strict"
        text-color="white"
        control-color="white"
        color="white"
        :dark="true"
      >
        <div slot="header-default" slot-scope="prop">
          <span class="node-element" :id="`node-${prop.node.id}`">{{ prop.node.label }}</span>
        </div>
        <div slot="header-folder" slot-scope="prop">
          <span class="node-element" :id="`node-${prop.node.id}`">{{ prop.node.label }}</span>
          <q-chip class="node-folder" color="white" small dense text-color="grey-7">{{ prop.node.children.length }}</q-chip>
        </div>
      </q-tree>
    </div>
    <div class="q-ma-md text-center text-white" v-else>
      {{ $t('label.noObservation') }}
    </div>
    <!--
    Actions JSON:
    {
      "actionLabel": null,
      "actionId": null,
      "enabled": true,
      "separator": true,
      "submenu": []
    },
    -->
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
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Helpers, Constants } from 'shared/Helpers';
// import Constants from 'shared/Constants';

export default {
  name: 'klabTree',
  data() {
    return {
      ticked: [],
      selected: null,
      enableContextMenu: false,
      itemActions: [],
      itemObservationId: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'tree',
      'treeNode',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'hideNode',
      'showNode',
      'selectNode',
    ]),
    ...mapActions('view', [
      'setSpinner',
    ]),
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
  },
  watch: {
    selected(selectedId) {
      this.selectNode(selectedId);
      this.selected = null;
    },
    ticked(newValues, oldValues) {
      if (oldValues === newValues) {
        return;
      }
      if (oldValues.length > newValues.length) {
        // some node was deselected
        const unselectedId = oldValues.filter(n => newValues.indexOf(n) < 0)[0];
        const unselectedNode = Helpers.findNodeById(this.tree, unselectedId);
        if (unselectedNode) {
          if (unselectedNode.type === Constants.GEOMTYP_FOLDER) {
            const unselectedIds = [];
            const unselectChildren = (children) => {
              children.forEach((n) => {
                if (!n.noTick) {
                  unselectedIds.push(n.id);
                  this.hideNode(n.id);
                }
                if (n.children && n.children.length > 0) {
                  unselectChildren(n.children);
                }
              });
            };
            unselectChildren(unselectedNode.children);
            if (unselectedIds.length > 0) {
              this.ticked = this.ticked.filter(n => unselectedIds.indexOf(n) === -1);
            }
          } else {
            if (unselectedNode.folderId !== null && this.ticked.indexOf(unselectedNode.folderId) !== -1) {
              // we unselect the folder
              this.ticked.splice(this.ticked.indexOf(unselectedNode.folderId), 1);
            }
            this.hideNode(unselectedId);
          }
        }
      } else {
        const { [newValues.length - 1]: selectedId } = newValues;
        const selectedNode = Helpers.findNodeById(this.tree, selectedId);
        if (selectedNode.type === Constants.GEOMTYP_FOLDER) {
          let selectedIds = [];
          const selectChildren = (children) => {
            let selectMainViewer = true;
            children.forEach((n) => {
              if (!n.noTick) {
                selectedIds.push(n.id);
                this.showNode({ nodeId: n.id, selectMainViewer });
                if (selectMainViewer) {
                  selectMainViewer = false;
                }
              }
              if (n.children && n.children.length > 0) {
                selectChildren(n.children);
              }
            });
            if (selectedIds.length > 0) {
              selectedIds = selectedIds.filter(n => this.ticked.indexOf(n) === -1);
              this.ticked.push(...selectedIds);
            }
          };
          selectChildren(selectedNode.children);
        } else {
          this.showNode({ nodeId: selectedId, selectMainViewer: true });
        }
      }
    },
  },
};
</script>
<style lang="stylus">
  .q-tree > .q-tree-node-child > .q-tree-node-header {
    padding-left: 10px;
  }
  .q-chip.node-folder {
    position:absolute;
    right: 10px;
  }
</style>

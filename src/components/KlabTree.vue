<template>
  <div>
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
  ></q-tree>
  </div>
  <div class="q-ma-md text-center text-white" v-else>
    {{ $t('label.noObservation') }}
  </div>

  <q-context-menu v-show="enableContextMenu" ref="context">
    <q-list link separator no-border style="min-width: 150px; max-height: 300px;"
            @click="$refs.context.close()">
      <q-item>
        <q-item-main :label="itemName"/>
      </q-item>
    </q-list>
  </q-context-menu>
  </div>
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
      itemName: '',
    };
  },
  computed: {
    ...mapGetters('data', [
      'tree',
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
      if (e.target.tagName === 'SPAN') {
        this.itemName = e.target.innerHTML;
        this.enableContextMenu = true;
      } else {
        this.enableContextMenu = false;
      }
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
</style>

import Vue from 'vue';
import { QDialog, QCollapsible, QTree, QRadio } from 'quasar';
import { findNodeById } from './Helpers';
import { CUSTOM_EVENTS } from './Constants';

export default {
  ALERT: {
    component: QDialog,
  },
  MAIN: component => Vue.component('KAppMain', {
    render(h) {
      return h('div', {
        staticClass: 'kcv-main-container',
        class: `kcv-dir-${component.direction}`,
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        style: {
          ...(component.style && { ...component.style }),
          ...component.mainPanelStyle,
        },
        ...(component.name && { ref: component.name }),
      }, this.$slots.default);
    },
  }),
  /*
    const ret = {
      type: 'div',
      attributes: {
        staticClass: 'kcv-main-container',
        class: `kcv-dir-${component.direction}`,
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        style: {
          ...(component.style && { ...component.style }),
          ...component.mainPanelStyle,
        },
        ...(component.name && { ref: component.name }),
      },
    };
    return ret;
    */
  GROUP: component => Vue.component('KAppGroup', {
    data() {
      return {
        test: 'STICAZZI',
      };
    },
    render(h) {
      return h('div', {
        staticClass: 'kcv-group',
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
      }, !component.attributes.shelf && !component.groupId
        ? [h('div', {
          staticClass: 'kvc-group-container',
        }, [
          h('div', {
            staticClass: 'kvc-group-legend',
          }, component.name),
          h('div', {
            staticClass: 'kvc-group-content',
          }, this.$slots.default),
        ])] : this.$slots.default);
    },
  }),
  SHELF: (label, group) => Vue.component('KAppShelf', {
    render(h) {
      return h(QCollapsible, {
        staticClass: 'kvc-collapsible',
        props: {
          staticClass: 'no-padding',
          headerClass: 'kvc-collapsible-header',
          group,
          label,
        },
      }, this.$slots.default);
    },
  }),
  TREE: (component) => {
    const tree = [];
    if (component.tree) {
      const cTree = component.tree;
      const findAndCreateNode = (index) => {
        const element = cTree.values[index];
        let node = findNodeById(tree, `${component.id}-${element.id}-${index}`);
        if (!node) {
          node = {
            id: `${component.id}-${element.id}-${index}`,
            label: element.label,
            type: element.type,
            observable: element.id,
            children: [],
          };
          const parentLink = cTree.links.find(l => l.first === index).second;
          if (parentLink === cTree.rootId) {
            tree.push(node);
          } else {
            const parent = findAndCreateNode(parentLink);
            parent.children.push(node);
          }
        }
        return node;
      };
      cTree.links.forEach((l) => {
        findAndCreateNode(l.first);
      });
    }
    return Vue.component('KAppTree', {
      data() {
        return {
          ticked: [],
          expanded: [],
          selected: {},
        };
      },
      render(h) {
        return h('div', {
          staticClass: 'kvc-tree-container',
        },
        [
          h('div', {
            staticClass: 'kvc-tree-legend',
          }, component.name),
          h(QTree, {
            staticClass: 'kvc-tree',
            props: {
              nodes: tree,
              nodeKey: 'id',
              tickStrategy: 'leaf',
              ticked: this.ticked,
              selected: this.selected,
              expanded: this.expanded,
              color: 'app-container',
            },
            on: {
              'update:ticked': (value) => {
                this.ticked = value;
                this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_CLICKED, { type: 'update:ticked', id: component.id, value });
              },
              'update:selected': (value) => {
                this.selected = value;
                this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_CLICKED, { type: 'update:selected', id: component.id, value });
              },
              'update:expanded': (value) => {
                this.expanded = value;
                this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_CLICKED, { type: 'update:expanded', id: component.id, value });
              },
            },
          }),
        ]);
      },
    });
  },
  CHECK_BUTTON: component => Vue.component('KAppCheckButton', {
    data() {
      return {
        selected: false,
      };
    },
    render(h) {
      return h('div', {
        staticClass: 'kvc-checkbutton',
      }, [
        h(QRadio, {
          props: {
            value: this.selected,
            color: 'app-container',
            label: component.name,
          },
          on: {
            input: (value) => {
              this.selected = value;
              this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_CLICKED, { type: 'input', id: component.id, value });
            },
          },
        }),
      ]);
    },
  }),
  TEXT: (component) => {
    let style = {};
    if (component.style) {
      style = {
        ...component.style,
      };
    }
    if (component.attributes) {
      if (component.attributes.height) {
        style['min-height'] = `${component.attributes.height}px`;
      }
      if (component.attributes.width) {
        style.width = `${component.attributes.width}px`;
      }
    }
    return Vue.component('KAppText', {
      render(h) {
        return h('div', {
          staticClass: 'kvc-text',
          class: {
            'kvc-collapsible': component.attributes.collapse,
          },
          attrs: {
            id: component.id,
          },
          style,
        }, [h('div', {
          staticClass: 'kvc-internal-text',
          domProps: {
            innerHTML: component.content,
          },
        })]);
      },
    });
    /*
    component.attributes.collapse ? h('div', {
      staticClass: 'kvc-collapsible-icon',
    }, [
      h(QIcon, {
        props: {
          name: 'mdi-menu-up',
          color: 'black',
          size: '20px',
        },
      }),
    ]) : null,
     */
  },
  UNKNOWN: component => Vue.component('KAppUnknown', {
    render(h) {
      return h('p', {
        attrs: {
          id: component.id,
        },
      }, component.type);
    },
  }),
};

import { QDialog, QCollapsible, QTree, QCheckbox } from 'quasar';
import { findNodeById } from './Helpers';
import { CUSTOM_EVENTS } from './Constants';

export default {
  ALERT: {
    component: QDialog,
  },
  MAIN: (component) => {
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
  },
  GROUP: (component, h) => ({
    type: 'div',
    attributes: {
      staticClass: 'kcv-group',
      attrs: {
        id: `${component.applicationId}-${component.id}`,
      },
    },
    container: !component.attributes.shelf && !component.groupId ? content => (
      [h('div', {
        staticClass: 'kvc-group-container',
      }, [
        h('div', {
          staticClass: 'kvc-group-legend',
        }, component.name),
        h('div', {
          staticClass: 'kvc-group-content',
        }, content)])]) : null,
  }),
  SHELF: (label, group) => ({
    type: QCollapsible,
    attributes: {
      props: {
        staticClass: 'no-padding',
        headerClass: 'kvc-collapsible-header',
        group,
        label,
      },
    },
  }),
  TREE: (component, h, eventBus) => {
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
    return {
      type: 'div',
      attributes: {
        staticClass: 'kvc-tree-container',
      },
      content: [
        h('div', {
          staticClass: 'kvc-tree-legend',
        }, component.name),
        h(QTree, {
          staticClass: 'kvc-tree',
          props: {
            nodes: tree,
            nodeKey: 'id',
            tickStrategy: 'leaf',
            ticked: component.ticked,
            selected: component.selected,
            expanded: component.expanded,
          },
          on: {
            'update:ticked': (value) => {
              component.ticked = value;
              eventBus.$emit(CUSTOM_EVENTS.COMPONENT_CLICKED, { type: 'update:ticked', id: component.id, value });
            },
            'update:selected': (value) => {
              component.selected = value;
              eventBus.$emit(CUSTOM_EVENTS.COMPONENT_CLICKED, { type: 'update:selected', id: component.id, value });
            },
            'update:expanded': (value) => {
              component.expanded = value;
              eventBus.$emit(CUSTOM_EVENTS.COMPONENT_CLICKED, { type: 'update:expanded', id: component.id, value });
            },
          },
        }),
      ],
    };
  },
  CHECK_BUTTON: (component, h, eventBus) => ({
    type: 'div',
    attributes: {
      staticClass: 'kvc-checkbutton',
    },
    content: [
      h(QCheckbox, {
        props: {
          value: component.selected,
          trueValue: true,
          falseValue: false,
          toggleIndeterminate: false,
          color: 'mc-main',
          label: component.name,
        },
        on: {
          input(value) {
            component.selected = value;
            eventBus.$emit(CUSTOM_EVENTS.COMPONENT_CLICKED, { type: 'input', id: component.id, value });
          },
        },
      }),
    ],
  }),
  TEXT: (component, h) => {
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
    return {
      type: 'div',
      attributes: {
        staticClass: 'kvc-text',
        class: {
          'kvc-collapsible': component.attributes.collapse,
        },
        attrs: {
          id: component.id,
        },
        style,
      },
      content: [
        h('div', {
          staticClass: 'kvc-internal-text',
          domProps: {
            innerHTML: component.content,
          },
        }),
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
      ],
    };
  },
  UNKNOWN: component => ({
    type: 'p',
    attributes: {
      attrs: {
        id: component.id,
      },
    },
    content: component.type,
  }),
};

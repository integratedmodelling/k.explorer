import Vue from 'vue';
import { QDialog, QCollapsible, QTree, QRadio, QCheckbox, QInput, QBtn, QIcon } from 'quasar';
import KlabLayout from 'components/KlabLayout';
import { findNodeById } from 'shared/Helpers';
import { APPS_OPERATION, CUSTOM_EVENTS, DEFAULT_STYLE_FUNCTION, APPS_COMPONENTS, APPS_DEFAULT_VALUES } from 'shared/Constants';


export const COMPONENTS = {
  LAYOUT: layout => Vue.component('KAppLayout', {
    render(h) {
      return h(KlabLayout, {
        props: {
          layout,
        },
      });
    },
  }),
  ALERT: component => Vue.component('KAppAlert', {
    render(h) {
      return h(QDialog, {
        props: {
          value: true,
          title: component.title,
          message: component.content,
        },
        class: {
          'kcv-alert': true,
        },
      });
    },
  }),
  MAIN: component => Vue.component('KAppMain', {
    render(h) {
      return h('div', {
        staticClass: 'kcv-main-container',
        class: `kcv-dir-${component.direction}`,
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        style: {
          ...component.style,
          ...component.mainPanelStyle,
        },
        ...(component.name && { ref: component.name }),
      }, this.$slots.default);
    },
  }),
  PANEL: component => Vue.component('KAppPanel', {
    render(h) {
      return h('div', {
        staticClass: 'kcv-panel-container',
        class: `kcv-dir-${component.direction}`,
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        style: DEFAULT_STYLE_FUNCTION(component),
        ...(component.name && { ref: component.name }),
      }, this.$slots.default);
    },
  }),
  GROUP: component => Vue.component('KAppGroup', {
    data() {
      return {};
    },
    render(h) {
      return h('div', {
        staticClass: 'kcv-group',
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        style: component.attributes.hfill ? { width: '100%' } : {},
      }, !component.attributes.shelf && !component.attributes.parentId
        ? [h('div', {
          staticClass: 'kcv-group-container',
          class: { 'kcv-group-no-label': !component.name },
        }, [
          component.name ? h('div', {
            staticClass: 'kcv-group-legend',
          }, component.name) : null,
          h('div', {
            staticClass: 'kcv-group-content',
            style: DEFAULT_STYLE_FUNCTION(component),
            ...(component.attributes.scroll && {
              attrs: {
                'data-simplebar': 'data-simplebar',
              },
            }),
          }, this.$slots.default),
        ])] : [h('div', {
          staticClass: 'kcv-group-content',
          style: DEFAULT_STYLE_FUNCTION(component),
          ...(component.attributes.scroll && {
            attrs: {
              'data-simplebar': 'data-simplebar',
            },
          }),
        }, this.$slots.default)]);
    },
  }),
  SHELF: component => Vue.component('KAppShelf', {
    render(h) {
      return h(QCollapsible, {
        staticClass: 'kcv-collapsible',
        props: {
          headerClass: 'kcv-collapsible-header',
          separator: true,
          group: component.attributes.parentId,
          label: component.name,
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
          staticClass: 'kcv-tree-container',
          style: DEFAULT_STYLE_FUNCTION(component),
        },
        [
          h('div', {
            staticClass: 'kcv-tree-legend',
          }, component.name),
          h(QTree, {
            staticClass: 'kcv-tree',
            attrs: {
              id: `${component.applicationId}-${component.id}`,
            },
            props: {
              nodes: tree,
              nodeKey: 'id',
              tickStrategy: component.attributes.check ? 'leaf' : 'none',
              ticked: this.ticked,
              selected: this.selected,
              expanded: this.expanded,
              color: 'app-main-color',
              controlColor: 'app-main-color',
              textColor: 'app-main-color',
            },
            on: {
              'update:ticked': (values) => {
                this.ticked = values;
                this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
                  operation: APPS_OPERATION.USER_ACTION,
                  component: {
                    ...component,
                    components: [],
                  },
                  listValue: values,
                });
              },
              'update:selected': (value) => {
                this.selected = value;
                // this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, { type: 'update:selected', id: component.id, value });
              },
              'update:expanded': (value) => {
                this.expanded = value;
                // this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, { type: 'update:expanded', id: component.id, value });
              },
            },
          }),
        ]);
      },
    });
  },
  LABEL: (component) => {
    if (!component.attributes.width) {
      component.attributes.width = APPS_DEFAULT_VALUES.LABEL_MIN_WIDTH;
    }
    return Vue.component('KAppText', {
      render(h) {
        return h('div', {
          staticClass: 'kcv-label',
          attrs: {
            id: `${component.applicationId}-${component.id}`,
          },
          style: DEFAULT_STYLE_FUNCTION(component),
        }, component.content);
      },
    });
  },
  TEXT_INPUT: component => Vue.component('KAppTextInput', {
    data() {
      return {
        component,
      };
    },
    render(h) {
      return h(QInput, {
        staticClass: ['kcv-text-input'],
        style: DEFAULT_STYLE_FUNCTION(component),
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        props: {
          value: component.content,
          color: 'app-main-color',
          hideUnderline: true,
          dense: true,
        },
        on: {
          keydown: (event) => {
            event.stopPropagation();
          },
          input: (value) => {
            this.value = value;
            this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
              operation: APPS_OPERATION.USER_ACTION,
              component: {
                ...component,
                components: [],
              },
              stringValue: value,
            });
          },
        },
      });
    },
  }),

  PUSH_BUTTON: component => Vue.component('KAppPushButton', {
    data() {
      return {};
    },
    render(h) {
      return h(QBtn, {
        staticClass: 'kcv-pushbutton',
        style: DEFAULT_STYLE_FUNCTION(component),
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        props: {
          label: component.name,
          color: 'app-main-color',
          textColor: 'app-background-color',
          noCaps: true,

        },
        on: {
          click: () => {
            this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
              operation: APPS_OPERATION.USER_ACTION,
              component: {
                ...component,
                components: [],
              },
            });
          },
        },
      });
    },
  }),

  CHECK_BUTTON: component => Vue.component('KAppCheckButton', {
    data() {
      return {
        value: component.content !== null,
        component,
      };
    },
    render(h) {
      return h('div', {
        staticClass: 'kcv-checkbutton',
        style: DEFAULT_STYLE_FUNCTION(component),
      }, [
        h(QCheckbox, {
          props: {
            value: this.value,
            color: 'app-main-color',
            keepColor: true,
            label: component.name,
          },
          attrs: {
            id: `${component.applicationId}-${component.id}`,
          },
          on: {
            input: (value) => {
              this.value = value;
              this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
                operation: APPS_OPERATION.USER_ACTION,
                component: {
                  ...component,
                  components: [],
                },
                booleanValue: value,
              });
            },
          },
        }),
      ]);
    },
  }),
  RADIO_BUTTON: component => Vue.component('KAppRadioButton', {
    data() {
      return {
        value: null,
        component,
      };
    },
    render(h) {
      return h('div', {
        staticClass: 'kcv-checkbutton',
        style: DEFAULT_STYLE_FUNCTION(component),
      }, [
        h(QRadio, {
          props: {
            val: false,
            value: false,
            color: 'app-main-color',
            label: component.name,
          },
          attrs: {
            id: `${component.applicationId}-${component.id}`,
          },
          on: {
            input: (value) => {
              this.value = value;
              this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
                operation: APPS_OPERATION.USER_ACTION,
                component: {
                  ...component,
                  components: [],
                },
                booleanValue: value,
              });
            },
          },
        }),
      ]);
    },
  }),
  TEXT: component => Vue.component('KAppText', {
    data() {
      return {
        collapsed: false,
      };
    },
    render(h) {
      return h('div', {
        staticClass: 'kcv-text',
        class: {
          'kcv-collapse': component.attributes.collapse,
          'kcv-collapsed': this.collapsed,
        },
        attrs: {
          'data-simplebar': 'data-simplebar',
        },
        style: DEFAULT_STYLE_FUNCTION(component),
      }, [
        h('div', {
          staticClass: 'kcv-internal-text',
          attrs: {
            id: `${component.applicationId}-${component.id}`,
          },
          domProps: {
            innerHTML: component.content,
          },
        }),
        component.attributes.collapse
          ? h('div', {
            staticClass: 'kcv-collapse-button',
            on: {
              click: () => {
                this.collapsed = !this.collapsed;
              },
            },
          }, [
            h(QIcon, {
              staticClass: 'kcv-collapse-icon',
              props: {
                name: this.collapsed ? 'mdi-arrow-down' : 'mdi-arrow-up',
                color: 'app-main-color',
                size: 'sm',
              },
            }),
          ]) : null,
      ]);
    },
  }),

  UNKNOWN: component => Vue.component('KAppUnknown', {
    render(h) {
      return h('p', {
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        style: DEFAULT_STYLE_FUNCTION(component),
      }, component.type);
    },
  }),
};

export function createComponent(node, h, options = {}) {
  // Handle empty elements and return empty array in case the dNode passed in is empty
  if (!node) {
    return [];
  }

  if (node.type === APPS_COMPONENTS.VIEW) {
    return h(COMPONENTS.LAYOUT);
  }
  let shelf = null;
  if (node.attributes.parentAttributes && node.attributes.parentAttributes.shelf) {
    shelf = COMPONENTS.SHELF(node);
  }
  let component;
  switch (node.type) {
    case null: {
      const { mainPanelStyle = {}, direction = 'vertical' } = options;
      component = COMPONENTS.MAIN({
        ...node,
        mainPanelStyle,
        direction,
      });
      break;
    }
    case APPS_COMPONENTS.PANEL:
      component = COMPONENTS.PANEL(node);
      break;
    case APPS_COMPONENTS.LABEL:
      component = COMPONENTS.LABEL(node);
      break;
    case APPS_COMPONENTS.TEXT_INPUT:
      component = COMPONENTS.TEXT_INPUT(node);
      break;
    case APPS_COMPONENTS.PUSH_BUTTON:
      component = COMPONENTS.PUSH_BUTTON(node);
      break;
    case APPS_COMPONENTS.CHECK_BUTTON:
      component = COMPONENTS.CHECK_BUTTON(node);
      break;
    case APPS_COMPONENTS.RADIO_BUTTON:
      component = COMPONENTS.RADIO_BUTTON(node);
      break;
    case APPS_COMPONENTS.TREE:
      component = COMPONENTS.TREE(node);
      break;
    case APPS_COMPONENTS.GROUP:
      component = COMPONENTS.GROUP(node);
      if (node.components && node.components.length > 0) {
        node.components.forEach((comp) => {
          comp.attributes.parentId = node.id;
          comp.attributes.parentAttributes = node.attributes;
        });
      }
      break;
    case APPS_COMPONENTS.TEXT:
      component = COMPONENTS.TEXT(node);
      break;
    default:
      component = COMPONENTS.UNKNOWN(node);
  }
  const components = [];
  if (node.components && node.components.length > 0) {
    node.components.forEach((comp) => {
      components.push(createComponent(comp, h));
    });
  }
  /*
  const internalContent = components.length > 0 ? components : component.content;
  const content = component.container ? component.container(internalContent) : internalContent;
  const element = h(component.type, component.attributes, shelf ? [h(shelf.type, shelf.attributes, content)] : content);
  */
  if (shelf) {
    return h(shelf, {}, [h(component, {}, components)]);
  }
  return h(component, {}, components);
}

export default {
  COMPONENTS,
  createComponent,
};

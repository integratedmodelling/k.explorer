import Vue from 'vue';
import { QDialog, QCollapsible, QTree, QRadio, QCheckbox, QInput, QSelect, QBtn, QIcon, QTooltip } from 'quasar';
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
        class: ['kcv-main-container', `kcv-dir-${component.direction}`],
        attrs: {
          id: `${component.applicationId}-${component.id}`,
          ref: 'main-container',
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
        class: ['kcv-panel-container', `kcv-dir-${component.direction}`],
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
        class: {
          'text-app-alt-color': component.attributes.altfg,
          'bg-app-alt-background': component.attributes.altbg,
          'kcv-wrapper': component.components.length === 1,
          'kcv-group-bottom': component.attributes.bottom,

        },
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
            class: 'kcv-group-legend',
          }, component.name) : null,
          h('div', {
            class: 'kcv-group-content',
            style: DEFAULT_STYLE_FUNCTION(component),
            ...(component.attributes.scroll && {
              attrs: {
                'data-simplebar': 'data-simplebar',
              },
            }),
          }, this.$slots.default),
        ])] : [h('div', {
          class: 'kcv-group-content',
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
    data() {
      return {
        opened: this.$store.state.view.openedCollapsibles.findIndex(c => c === component.id) !== -1,
      };
    },
    render(h) {
      const self = this;
      return h(QCollapsible, {
        class: 'kcv-collapsible',
        props: {
          opened: self.opened,
          headerClass: 'kcv-collapsible-header',
          collapseIcon: 'mdi-dots-vertical',
          separator: false,
          ...(!component.attributes.parentAttributes.multiple && { group: component.attributes.parentId }),
          label: component.name,
        },
        on: {
          hide() {
            const idx = self.$store.state.view.openedCollapsibles.findIndex(c => c === component.id);
            if (idx !== -1) {
              self.$store.state.view.openedCollapsibles.splice(idx, 1);
            }
          },
          show() {
            const idx = self.$store.state.view.openedCollapsibles.findIndex(c => c === component.id);
            if (idx === -1) {
              self.$store.state.view.openedCollapsibles.push(component.id);
            }
          },
        },
      }, this.$slots.default);
    },
  }),
  SEPARATOR: component => Vue.component('KAppSeparator', {
    render(h) {
      const self = this;
      return h('div', {
        class: 'kcv-separator',
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        style: DEFAULT_STYLE_FUNCTION(component),
      }, [
        component.attributes.iconname
          ? h(QIcon, {
            class: 'kcv-separator-icon',
            props: {
              name: `mdi-${component.attributes.iconname}`,
              color: 'app-main-color',
            },
          })
          : null,
        component.title
          ? h('div', {
            class: 'kcv-separator-title',
          }, component.title)
          : null,
        component.attributes.iconbutton
          ? h(QIcon, {
            class: 'kcv-separator-right',
            props: {
              name: `mdi-${component.attributes.iconbutton}`,
              color: 'app-main-color',
            },
            nativeOn: {
              click: () => {
                self.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
                  operation: APPS_OPERATION.USER_ACTION,
                  component: {
                    ...component,
                    components: [],
                  },
                  booleanValue: true,
                });
              },
            },
          })
          : null,
        component.attributes.info
          ? h(QIcon, {
            class: 'kcv-separator-right',
            props: {
              name: 'mdi-information-outline',
              color: 'app-main-color',
            },
            nativeOn: {
              mouseover: () => {
                self.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
                  operation: APPS_OPERATION.USER_ACTION,
                  component: {
                    ...component,
                    components: [],
                  },
                  booleanValue: true,
                });
              },
              mouseleave: () => {
                self.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
                  operation: APPS_OPERATION.USER_ACTION,
                  component: {
                    ...component,
                    components: [],
                  },
                  booleanValue: false,
                });
              },
            },
          })
          : null,
      ]);
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
        const self = this;
        return h('div', {
          class: 'kcv-tree-container',
          style: DEFAULT_STYLE_FUNCTION(component),
        },
        [
          component.name
            ? h('div', {
              class: 'kcv-tree-legend',
            }, component.name)
            : null,
          h(QTree, {
            class: 'kcv-tree',
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
              dense: true,
            },
            on: {
              'update:ticked': (values) => {
                self.ticked = values;
                self.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
                  operation: APPS_OPERATION.USER_ACTION,
                  component: {
                    ...component,
                    components: [],
                  },
                  listValue: values,
                });
              },
              'update:selected': (value) => {
                self.selected = value;
                // this.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, { type: 'update:selected', id: component.id, value });
              },
              'update:expanded': (value) => {
                self.expanded = value;
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
          class: { 'kcv-title': component.attributes.tag && component.attributes.tag === 'title', 'kcv-ellipsis': component.attributes.ellipsis, 'kcv-with-icon': component.attributes.iconname },
          attrs: {
            id: `${component.applicationId}-${component.id}`,
          },
          style: DEFAULT_STYLE_FUNCTION(component),
        }, [
          component.attributes.iconname
            ? h(QIcon, {
              class: ['kcv-label-icon', component.attributes.toggle ? 'kcv-label-toggle' : ''],
              props: {
                name: `mdi-${component.attributes.iconname}`,
                color: 'app-main-color',
              },
            })
            : null,
          component.content,
          component.attributes.tooltip
            ? h(QTooltip, {
              props: {
                anchor: 'bottom left',
                self: 'top left',
                offset: [-10, 0],
              },
            }, component.attributes.tooltip === 'true' ? component.content : component.attributes.tooltip) : null,
        ]);
      },
    });
  },
  TEXT_INPUT: component => Vue.component('KAppTextInput', {
    data() {
      return {
        component,
        value: component.content,
        type: 'number',
      };
    },
    render(h) {
      // const isNumber = Number.isInteger(component.content);
      const self = this;
      return h(QInput, {
        class: ['kcv-text-input', 'kcv-form-element'],
        style: DEFAULT_STYLE_FUNCTION(component),
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        props: {
          value: self.value,
          color: 'app-main-color',
          hideUnderline: true,
          dense: true,
          type: self.type,
          disable: !!component.attributes.disabled,
        },
        on: {
          keydown: (event) => {
            event.stopPropagation();
          },
          input: (value) => {
            self.value = value;
            component.content = value;
            self.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
              operation: APPS_OPERATION.USER_ACTION,
              component: {
                ...component,
                components: [],
              },
              // ...(self.type === 'text' && { stringValue: value }),
              // ...(self.type === 'number' && { intValue: value }),
              stringValue: value,
            });
          },
        },
      });
    },
  }),
  COMBO: component => Vue.component('KAppCombo', {
    data() {
      return {
        component,
        value: component.attributes.selected
          ? component.choices.find(c => c.first === component.attributes.selected).first
          : component.choices[0].first,
      };
    },
    render(h) {
      const self = this;
      return h(QSelect, {
        class: ['kcv-combo', 'kcv-form-element'],
        style: DEFAULT_STYLE_FUNCTION(component),
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        props: {
          value: self.value,
          options: component.choices.map(c => ({ label: c.first, value: c.second, className: 'kcv-combo-option' })),
          color: 'app-text-color',
          popupCover: false,
          dense: true,
          disable: !!component.attributes.disabled,
        },
        on: {
          change: (value) => {
            self.value = value;
            component.attributes.selected = self.value;
            self.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
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
      const self = this;
      return h(QBtn, {
        class: ['kcv-pushbutton', 'kcv-form-element'],
        style: DEFAULT_STYLE_FUNCTION(component),
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        props: {
          label: component.name,
          color: 'app-main-color',
          textColor: 'app-background-color',
          noCaps: true,
          disable: !!component.attributes.disabled,
          ...(component.attributes.iconname && { icon: `mdi-${component.attributes.iconname}` }),
        },
        on: {
          click: () => {
            self.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
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
        value: !!component.attributes.checked,
        component,
      };
    },
    render(h) {
      const self = this;
      const state = component.attributes.waiting ? 'waiting' : component.attributes.computing ? 'computing'
        : component.attributes.error ? 'error' : component.attributes.done ? 'done' : null;
      const color = component.attributes.error ? 'app-negative-color' : component.attributes.done ? 'app-positive-color' : 'app-main-color';
      return h('div', {
        class: ['kcv-checkbutton', 'kcv-form-element', `text-${color}`, `kcv-check-${state}`, component.name === '' ? 'kcv-check-only' : 'kcv-check-with-label'],
        style: DEFAULT_STYLE_FUNCTION(component),
      }, [
        h(QCheckbox, {
          props: {
            value: self.value,
            color,
            keepColor: true,
            label: component.name,
            disable: !!component.attributes.disabled,
            ...(component.attributes.waiting && {
              'checked-icon': 'mdi-loading',
              'unchecked-icon': 'mdi-loading',
              readonly: true,
            }),
            ...(component.attributes.computing && {
              'checked-icon': 'mdi-cog-outline',
              'unchecked-icon': 'mdi-cog-outline',
              readonly: true,
            }),
          },
          attrs: {
            id: `${component.applicationId}-${component.id}`,
          },
          on: {
            input: (value) => {
              self.value = value;
              component.attributes.checked = value;
              self.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
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
        component.attributes.error && component.attributes.error !== 'true'
          ? h(QTooltip, {
            class: 'kcv-error-tooltip',
            props: {
              anchor: 'bottom left',
              self: 'top left',
              offset: [-10, 0],
            },
          }, component.attributes.error)
          : null,
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
      const self = this;
      return h('div', {
        class: ['kcv-checkbutton', 'kcv-form-element'],
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
              self.value = value;
              self.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
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
      const self = this;
      return h('div', {
        staticClass: 'kcv-text',
        class: {
          'kcv-collapse': component.attributes.collapse,
          'kcv-collapsed': self.collapsed,
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
                self.collapsed = !self.collapsed;
              },
            },
          }, [
            h(QIcon, {
              staticClass: 'kcv-collapse-icon',
              props: {
                name: self.collapsed ? 'mdi-arrow-down' : 'mdi-arrow-up',
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
      return h('div', {
        class: 'kcv-unknown',
        attrs: {
          id: `${component.applicationId}-${component.id}`,
        },
        style: DEFAULT_STYLE_FUNCTION(component),
      }, component.type);
    },
  }),
};

export function createComponent(node, h, options = {}) {
  // console.info(`Call create component // node.id: ${node.id} node.name: ${node.name}; node.type: ${node.type}; node.content: ${node.content}; node.components.length: ${node.components.length}
  // node.attributes:\n${JSON.stringify(node.attributes, null, 2)};`);
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
    case APPS_COMPONENTS.SEPARATOR:
      component = COMPONENTS.SEPARATOR(node);
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
    case APPS_COMPONENTS.COMBO:
      component = COMPONENTS.COMBO(node);
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

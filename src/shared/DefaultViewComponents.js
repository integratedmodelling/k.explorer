import Vue from 'vue';
import { QDialog, QCollapsible, QTree, QRadio, QCheckbox, QInput, QSelect, QBtn, QIcon, QTooltip, QAutocomplete } from 'quasar';
import KlabLayout from 'components/KlabLayout';
import { findNodeById } from 'shared/Helpers';
import { APPS_OPERATION, CUSTOM_EVENTS, DEFAULT_STYLE_FUNCTION, APPS_COMPONENTS, APPS_DEFAULT_VALUES,
  MATCH_TYPES, SEARCH_MODES, SEMANTIC_TYPES } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
// import { URLS } from 'shared/MessagesConstants';
// import { axiosInstance } from '../plugins/axios';

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
  SHELF: (component) => {
    if (!component.attributes.opened) {
      component.attributes.opened = false;
    }
    return Vue.component('KAppShelf', {
      data() {
        return {
          opened: component.attributes.opened,
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
              component.attributes.opened = false;
            },
            show() {
              component.attributes.opened = true;
            },
          },
        }, this.$slots.default);
      },
    });
  },
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
      if (!component.tree.status) {
        component.tree.status = {
          ticked: [],
          expanded: [],
          selected: {},
        };
      }
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
          ticked: component.tree.status.ticked,
          expanded: component.tree.status.expanded,
          selected: component.tree.status.selected,
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
              ticked: self.ticked,
              selected: self.selected,
              expanded: self.expanded,
              color: 'app-main-color',
              controlColor: 'app-main-color',
              textColor: 'app-main-color',
              dense: true,
            },
            on: {
              'update:ticked': (values) => {
                self.ticked = values;
                component.tree.status.ticked = values;
                self.$eventBus.$emit(CUSTOM_EVENTS.COMPONENT_ACTION, {
                  operation: APPS_OPERATION.USER_ACTION,
                  component: {
                    ...component,
                    components: [],
                  },
                  listValue: values,
                });
              },
              'update:selected': (values) => {
                self.selected = values;
                component.tree.status.selected = values;
              },
              'update:expanded': (values) => {
                self.expanded = values;
                component.tree.status.expanded = values;
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
      data() {
        return {
          editable: false,
          doneFunc: null,
          result: null,
          value: null,
          searchRequestId: 0,
          searchContextId: null,
          searchTimeout: null,
          selected: null,
        };
      },
      computed: {
        searchResult() {
          return this.$store.getters['data/searchResult'];
        },
        isSearch() {
          return component.attributes.tag === 'search' && this.editable;
        },
      },
      methods: {
        search(terms, done) {
          this.searchRequestId += 1;
          this.sendStompMessage(MESSAGES_BUILDERS.SEARCH_REQUEST({
            requestId: this.searchRequestId,
            contextId: this.searchContextId,
            maxResults: -1, // all
            cancelSearch: false,
            defaultResults: terms === '',
            searchMode: SEARCH_MODES.FREETEXT,
            queryString: terms, // terms split space
          }, this.$store.state.data.session).body);
          this.doneFunc = done;
          // we clear timeout of previous searches
          if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
          }
          this.searchTimeout = setTimeout(() => {
            this.$q.notify({
              message: this.$t('errors.searchTimeout'),
              type: 'warning',
              icon: 'mdi-alert',
              timeout: 2000,
            });
            if (this.doneFunc) {
              this.doneFunc([]);
            }
          }, process.env.SEARCH_TIMEOUT_MS);
        },
        autocompleteSelected(item) {
          if (item) {
            this.selected = item;
          }
        },
        sendSelected() {
          this.sendStompMessage(MESSAGES_BUILDERS.SEARCH_MATCH({
            contextId: this.searchContextId,
            matchIndex: this.selected.matchIndex,
            matchId: this.selected.id,
            added: true,
          }, this.$store.state.data.session).body);
        },
        init() {
          this.doneFunc = null;
          this.result = null;
          this.value = null;
          this.searchRequestId = 0;
          this.searchContextId = null;
          this.searchTimeout = null;
          this.selected = null;
        },
      },
      watch: {
        searchResult(newResult) {
          if (!this.isSearch) {
            return;
          }
          // if we are waiting for a results, we can stop waiting
          if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
          }
          // check if the new result is good
          const { requestId, contextId } = newResult;
          if (this.searchContextId === null) {
            this.searchContextId = contextId;
          } else if (contextId !== this.searchContextId) {
            // console.warn(`Something strange was happened: differents search context ids:\n
            //    actual: ${this.searchContextId} / received: ${contextId}`);
            return;
          }
          // is the same request
          if (this.searchRequestId === requestId) {
            // there is a result and the new result has same id: is a increment of previous
            if (this.result !== null
              && this.result.requestId === requestId) {
              // add old results to new results to maintain new attribute values (like end)
              newResult.matches.push(...this.result.matches);
            }
            this.result = newResult;
          } else {
            console.warn(`Result discarded for bad request id: actual: ${this.searchRequestId} / received: ${requestId}\n`);
            // Is not necessary to inform user
            return;
          }
          const { matches, error, errorMessage } = this.result;
          if (error) {
            this.$q.notify({
              message: errorMessage,
              type: 'error',
              icon: 'mdi-alert',
              timeout: 2000,
            });
            return;
          }
          const results = [];
          // const totMatches = matches.length;
          matches.forEach((match/* ,index */) => {
            const matchType = MATCH_TYPES[match.matchType];
            if (typeof matchType === 'undefined') {
              console.warn(`Unknown type: ${match.matchType}`);
              return;
            }
            let desc = matchType;
            if (match.mainSemanticType !== null) {
              const mainSemanticType = SEMANTIC_TYPES[match.mainSemanticType];
              if (typeof mainSemanticType !== 'undefined') {
                desc = mainSemanticType;
              }
            }
            results.push({
              value: match.name,
              label: match.name,
              labelLines: 1,
              sublabel: match.description,
              sublabelLines: 4,
              letter: desc.symbol,
              leftInverted: true,
              leftColor: desc.color,
              rgb: desc.rgb,
              id: match.id,
              matchIndex: match.index,
              selected: false,
              disable: match.state && match.state === 'FORTHCOMING',
              separator: false,
              // stamp: `${index + 1}/${totMatches}`, TODO is useless?
            });
          });
          if (results.length === 0) {
            this.$q.notify({
              message: this.$t('messages.noSearchResults'),
              type: 'info',
              icon: 'mdi-information',
              timeout: 1000,
            });
          }
          Vue.nextTick(() => {
            this.doneFunc(results);
          });
        },
      },
      render(h) {
        const self = this;
        if (this.isSearch) {
          return h(QInput, {
            class: ['kcv-text-input', 'kcv-form-element', 'kcv-search'],
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
              autofocus: true,
            },
            on: {
              keydown: (event) => {
                if (event.keyCode === 27) {
                  this.editable = false;
                  if (this.doneFunc) {
                    this.doneFunc();
                    this.doneFunc = null;
                  }
                  this.$store.dispatch('view/searchInApp', false);
                  event.stopPropagation();
                  self.init();
                }
                if (event.keyCode === 13 && this.selected) {
                  this.$store.dispatch('view/searchInApp', false);
                  this.editable = false;
                  self.sendSelected();
                  self.init();
                }
              },
              input: (value) => {
                self.value = value;
              },
              blur: () => {
                this.$store.dispatch('view/searchInApp', false);
                this.editable = false;
              },
              focus: () => {
                this.$store.dispatch('view/searchInApp', true);
              },
            },
          }, [
            h(QAutocomplete, {
              props: {
                debounce: 400,
                'min-characters': 4,
              },
              on: {
                search: (terms, done) => {
                  self.search(terms, done);
                },
                selected: (item, keyboard) => {
                  self.autocompleteSelected(item, keyboard);
                },
              },
            }, 'Cacca'),
          ]);
        }
        return h('div', {
          staticClass: 'kcv-label',
          class: {
            'kcv-title': component.attributes.tag && (component.attributes.tag === 'title' || component.attributes.tag === 'search'),
            'kcv-clickable': component.attributes.disabled !== 'true' && component.attributes.tag === 'search',
            'kcv-ellipsis': component.attributes.ellipsis,
            'kcv-with-icon': component.attributes.iconname,
          },
          attrs: {
            id: `${component.applicationId}-${component.id}`,
          },
          style: DEFAULT_STYLE_FUNCTION(component),
          ...(component.attributes.disabled !== 'true' && component.attributes.tag === 'search' && {
            on: {
              click: () => {
                this.editable = true;
                this.$store.dispatch('view/searchInApp', true);
              },
            },
          }),
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
          disable: component.attributes.disabled === 'true',
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
          disable: component.attributes.disabled === 'true',
          dark: this.$store.getters['view/appStyle'] === 'dark',
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
      return {
        state: null,
      };
    },
    watch: {
      state() {
        if (component.attributes.timeout) {
          setTimeout(() => {
            delete component.attributes.error;
            delete component.attributes.waiting;
            delete component.attributes.done;
            this.state = null;
          }, component.attributes.timeout);
        }
      },
    },
    render(h) {
      const self = this;
      const round = component.attributes.iconname && !component.name;
      this.state = component.attributes.waiting ? 'waiting' : component.attributes.computing ? 'computing'
        : component.attributes.error ? 'error' : component.attributes.done ? 'done' : null;
      const iconColor = component.attributes.waiting ? 'app-background-color' : component.attributes.computing ? 'app-alt-color'
        : component.attributes.error ? 'app-negative-color' : component.attributes.done ? 'app-positive-color' : 'app-background-color';
      return h('div', {}, [
        h(QBtn, {
          class: [
            round ? 'kcv-roundbutton' : 'kcv-pushbutton',
            'kcv-form-element', component.attributes.tag === 'breset' ? 'kcv-reset-button' : '',
          ],
          style: {
            ...DEFAULT_STYLE_FUNCTION(component),
            ...((component.attributes.timeout && {
              '--button-icon-color': 'app-background-color',
              '--flash-color': component.attributes.error ? 'var(--app-negative-color)' : component.attributes.done ? 'var(--app-positive-color)' : 'var(--app-main-color)',
              animation: `flash-button ${component.attributes.timeout}ms`,
            }) || { '--button-icon-color': `var(--${iconColor})` }),
          },
          attrs: {
            id: `${component.applicationId}-${component.id}`,
          },
          props: {
            ...(component.name && {
              label: component.name,
              'text-color': 'app-control-text-color',
            }),
            color: component.attributes.color ? component.attributes.color : 'app-main-color',
            ...(round && { round: true, dense: true, flat: true }),
            noCaps: true,
            disable: component.attributes.disabled === 'true',
            ...((this.state === 'error' && { icon: 'mdi-alert-circle' })
               || (this.state === 'done' && { icon: 'mdi-check-circle' })
               || (component.attributes.iconname && { icon: `mdi-${component.attributes.iconname}` })),
            // ...(component.attributes.iconname && { icon: `mdi-${component.attributes.iconname}` }),
            ...(this.state === 'waiting' && { loading: true }),
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
        }), component.attributes.tooltip
          ? h(QTooltip, {
            props: {
              anchor: 'bottom left',
              self: 'top left',
              offset: [-10, 0],
              delay: 600,
            },
          }, component.attributes.tooltip === 'true' ? component.content : component.attributes.tooltip) : null,
      ]);
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
            disable: component.attributes.disabled === 'true',
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

  BROWSER: component => Vue.component('KBrowswer', {
    mounted() {
      // axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.ENGINE_URL}${component.content}`, {
      // axiosInstance.get('http://localhost:8283/modeler/engine/project/resource/get/un.seea.aries/static/en/about.html', {
      // responseType: 'blob',
      // 'Content-Type': 'application/text',
      // })
      //   .then((response) => {
      //     if (response.data) {
      //       // const binaryData = [];
      //       // binaryData.push(response.data);
      //       // const iframeObj = URL.createObjectURL(new Blob(binaryData, { type: 'application/text' }));
      //       // const dataUrl = URL.createObjectURL(this.response);
      //       const iframe = document.getElementById(`${component.applicationId}-${component.id}`).contentDocument;
      //       iframe.write(response.data);
      //       // iframe.src = `data:text/html;charset=utf-8,${response.data}`;
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
    render(h) {
      const src = component.content.startsWith('http') ? component.content : `${process.env.WS_BASE_URL}${process.env.ENGINE_URL}${component.content}`;
      return h('iframe', {
        class: 'kcv-browser',
        attrs: {
          id: `${component.applicationId}-${component.id}`,
          width: component.attributes.width || '100%',
          height: component.attributes.height || '100%',
          frameBorder: '0',
          src,
        },
        style: {
          ...DEFAULT_STYLE_FUNCTION(component),
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      });
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
      // component = COMPONENTS.BROWSER(node);
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
    case APPS_COMPONENTS.BROWSER:
      component = COMPONENTS.BROWSER(node);
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

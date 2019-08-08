/* eslint-disable no-underscore-dangle, no-unused-expressions */
import { QTree, QSlideTransition, QSpinner, QIcon, QCheckbox } from 'quasar';

export default {
  name: 'KlabTreeComponent',
  extends: QTree,
  props: {
    doubleClickTimeout: {
      type: Number,
      default: 300,
    },
    doubleClickFunction: {
      type: Function,
      default: null,
    },
    noFilteredResultLabel: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      lazy: {},
      innerTicked: this.ticked || [],
      innerExpanded: this.expanded || [],
      timeouts: [],
    };
  },
  methods: {
    __blur() {
      document.activeElement && document.activeElement.blur();
    },
    __getNode(h, node) {
      const
        key = node[this.nodeKey];
      const meta = this.meta[key];
      const header = node.header
        ? this.$scopedSlots[`header-${node.header}`] || this.$scopedSlots['default-header']
        : this.$scopedSlots['default-header'];

      const children = meta.isParent
        ? this.__getChildren(h, node.children)
        : [];

      const isParent = children.length > 0 || (meta.lazy && meta.lazy !== 'loaded');

      let
        body = node.body
          ? this.$scopedSlots[`body-${node.body}`] || this.$scopedSlots['default-body']
          : this.$scopedSlots['default-body'];
      const slotScope = header || body
        ? this.__getSlotScope(node, meta, key)
        : null;

      if (body) {
        body = h('div', { staticClass: 'q-tree-node-body relative-position' }, [
          h('div', { class: this.contentClass }, [
            body(slotScope),
          ]),
        ]);
      }

      return h('div', {
        key,
        staticClass: 'q-tree-node',
        class: { 'q-tree-node-parent': isParent, 'q-tree-node-child': !isParent },
      }, [
        h('div', {
          staticClass: 'q-tree-node-header relative-position row no-wrap items-center',
          class: {
            'q-tree-node-link': meta.link,
            'q-tree-node-selected': meta.selected,
            disabled: meta.disabled,
          },
          on: {
            click: (event) => {
              if (event && event.srcElement && event.srcElement.className.indexOf('node-element') !== -1) {
                this.__onClick(node, meta);
              }
            },
          },
          directives: process.env.THEME === 'mat' && meta.selectable
            ? [{ name: 'ripple' }]
            : null,
        }, [
          meta.lazy === 'loading'
            ? h(QSpinner, {
              staticClass: 'q-tree-node-header-media q-mr-xs',
              props: { color: this.computedControlColor },
            })
            : (
              isParent
                ? h(QIcon, {
                  staticClass: 'q-tree-arrow q-mr-xs transition-generic',
                  class: { 'q-tree-arrow-rotate': meta.expanded },
                  props: { name: this.computedIcon },
                  nativeOn: {
                    click: (e) => {
                      this.__onExpandClick(node, meta, e);
                    },
                  },
                })
                : null
            ),

          h('span', { staticClass: 'row no-wrap items-center', class: this.contentClass }, [
            meta.hasTicking && !meta.noTick
              ? h(QCheckbox, {
                staticClass: 'q-mr-xs',
                props: {
                  value: meta.indeterminate ? null : meta.ticked,
                  color: this.computedControlColor,
                  dark: this.dark,
                  keepColor: true,
                  disable: !meta.tickable,
                },
                on: {
                  input: (v) => {
                    this.__onTickedClick(node, meta, v);
                  },
                },
              })
              : null,
            header
              ? header(slotScope)
              : [
                this.__getNodeMedia(h, node),
                h('span', node[this.labelKey]),
              ],
          ]),
        ]),

        isParent
          ? h(QSlideTransition, {
            props: { duration: this.duration },
          }, [
            h('div', {
              directives: [{ name: 'show', value: meta.expanded }],
              staticClass: 'q-tree-node-collapsible',
              class: `text-${this.color}`,
            }, [
              body,
              h('div', {
                staticClass: 'q-tree-children',
                class: { disabled: meta.disabled },
              }, children),
            ]),
          ])
          : body,
      ]);
    },
    __onClick(node, meta) {
      if (this.doubleClickFunction === null) {
        this.__onClickDefault(node, meta);
      } else if (typeof this.timeouts[`id${node.id}`] === 'undefined' || this.timeouts[`id${node.id}`] === null) {
        this.timeouts[`id${node.id}`] = setTimeout(() => {
          this.timeouts[`id${node.id}`] = null;
          this.__onClickDefault(node, meta);
        }, this.doubleClickTimeout);
      } else {
        clearTimeout(this.timeouts[`id${node.id}`]);
        this.timeouts[`id${node.id}`] = null;
        this.doubleClickFunction(node, meta);
      }
    },
    __onClickDefault(node, meta) {
      this.__blur();

      if (this.hasSelection) {
        if (meta.selectable) {
          this.$emit('update:selected', meta.key !== this.selected ? meta.key : null);
        }
      } else {
        this.__onExpandClick(node, meta);
      }

      if (typeof node.handler === 'function') {
        node.handler(node);
      }
    },
  },

  render(h) {
    const children = this.__getChildren(h, this.nodes);
    const index = this.classes.indexOf('klab-no-nodes');
    if (children.length === 0 && index === -1) {
      this.classes.push('klab-no-nodes');
    } else if (children.length !== 0 && index !== -1) {
      this.classes.splice(index, 1);
    }
    return h(
      'div', {
        staticClass: 'q-tree',
        class: this.classes,
      },
      children.length === 0
        ? (
          this.filter
            ? this.noFilteredResultLabel
            : this.noNodesLabel || this.$t('messages.treeNoNodes')
        )
        : children,
    );
  },
};

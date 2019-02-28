/* eslint-disable no-underscore-dangle, no-unused-expressions */
import { QTree } from 'quasar';

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
};

/**
 * Rewrited Quasar component to use as a tip having a programatic text
 */
import { QPopover } from 'quasar';

export default {
  name: 'KlabTip',
  extends: QTooltip,
  props: {
    html: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
  render(h) {
    if (this.canRender) {
      return h('div', { staticClass: 'q-tooltip animate-popup' }, [
        h('div', {
          staticClass: 'kcv-internal-text',
          attrs: {
            id: `${this.page}-${this.id}`,
          },
          domProps: {
            innerHTML: this.html,
          },
        }),
      ]);
    }
    return null;
  },
};

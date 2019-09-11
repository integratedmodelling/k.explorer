/**
 * Rewrited Quasar component to use the klab icon
 */
import { QIcon } from 'quasar';

export default {
  name: 'KlabQIcon',
  extends: QIcon,
  props: {
    customIcon: {
      type: String,
      default: '',
    },
  },

  render(h) {
    return h('i', {
      staticClass: 'q-icon',
      class: this.customIcon.concat(this.classes),
      style: this.style,
      attrs: { 'aria-hidden': true },
    }, [
      this.content,
      this.$slots.default,
    ]);
  },
};

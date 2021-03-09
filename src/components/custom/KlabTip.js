/* eslint-disable no-underscore-dangle */
import debounce from 'quasar-framework/src/utils/debounce.js';
import { getScrollTarget } from 'quasar-framework/src/utils/scroll.js';
import { positionValidator,
  offsetValidator,
  parsePosition,
  setPosition } from 'quasar-framework/src/utils/popup.js';
import ModelToggleMixin from 'quasar-framework/src/mixins/model-toggle.js';
import { listenOpts } from 'quasar-framework/src/utils/event.js';
import { QBtn } from 'quasar';
import { getI18N } from 'plugins/vue-i18n';

export default {
  name: 'QTooltip',
  mixins: [ModelToggleMixin],
  props: {
    anchor: {
      type: String,
      default: 'top middle',
      validator: positionValidator,
    },
    self: {
      type: String,
      default: 'bottom middle',
      validator: positionValidator,
    },
    offset: {
      type: Array,
      validator: offsetValidator,
    },
    delay: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: -1,
    },
    lastIndex: Number,
    html: String,
  },
  watch: {
    $route() {
      this.hide();
    },
    currentIndex() {
      console.warn(this.currentIndex);
    },
  },
  computed: {
    anchorOrigin() {
      return parsePosition(this.anchor);
    },
    selfOrigin() {
      return parsePosition(this.self);
    },
  },
  methods: {
    __show() {
      clearTimeout(this.timer);

      document.body.appendChild(this.$el);
      this.scrollTarget = getScrollTarget(this.anchorEl);
      this.scrollTarget.addEventListener('scroll', this.hide, listenOpts.passive);
      window.addEventListener('resize', this.__debouncedUpdatePosition, listenOpts.passive);
      if (this.$q.platform.is.mobile) {
        document.body.addEventListener('click', this.hide, true);
      }

      this.__updatePosition();
      if (this.showPromise) {
        this.showPromiseResolve();
      }
    },
    __hide() {
      this.__cleanup();
      if (this.hidePromise) {
        this.hidePromiseResolve();
      }
    },
    __cleanup() {
      clearTimeout(this.timer);

      this.scrollTarget.removeEventListener('scroll', this.hide, listenOpts.passive);
      window.removeEventListener('resize', this.__debouncedUpdatePosition, listenOpts.passive);
      this.$el.remove();

      if (this.$q.platform.is.mobile) {
        document.body.removeEventListener('click', this.hide, true);
      }
    },
    __updatePosition() {
      setPosition({
        el: this.$el,
        animate: true,
        offset: this.offset,
        anchorEl: this.anchorEl,
        anchorOrigin: this.anchorOrigin,
        selfOrigin: this.selfOrigin,
      });
    },
    __delayShow() {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.show, this.delay);
    },
    __delayHide() {
      clearTimeout(this.timer);
      this.hide();
    },
  },
  render(h) {
    const self = this;
    return h('div', { staticClass: 'klab-tips' }, [
      h('div', {
        attrs: {
          id: `${self.page}-${self.index}`,
        },
        class: 'kt-container',
      }, [
        h('div', {
          class: 'kt-content',
          ...(self.html && {
            domProps: {
              innerHTML: self.html,
            },
          }),
        }, self.$slots.default),
        self.index !== -1
          ? h('div', {
            class: 'kt-buttons',
          }, [
            h(QBtn, {
              class: [],
              props: {
                label: getI18N().tc('label.appDismiss'),
              },
              on: {
                click: () => {
                  self.$emit('dismiss');
                },
              },
            }),
            h(QBtn, {
              class: [],
              props: {
                label: getI18N().tc('label.appPrevious'),
                disable: self.index === 0,
              },
              on: {
                click: () => {
                  self.$emit('change', -1);
                },
              },
            }),
            h(QBtn, {
              class: [],
              props: {
                label: getI18N().tc('label.appNext'),
                disable: self.index === self.lastIndex,
              },
              on: {
                click: () => {
                  self.$emit('change', 1);
                },
              },
            }),
          ])
          : null,
      ]),
    ]);
  },
  beforeMount() {
    this.__debouncedUpdatePosition = debounce(() => {
      this.__updatePosition();
    }, 70);
  },
  mounted() {
    this.$nextTick(() => {
      /*
        The following is intentional.
        Fixes a bug in Chrome regarding offsetHeight by requiring browser
        to calculate this before removing from DOM and using it for first time.
      */
      this.$el.offsetHeight // eslint-disable-line

      this.anchorEl = this.$el.parentNode;
      this.anchorEl.removeChild(this.$el);
      if (
        this.anchorEl.classList.contains('q-popup--skip')
        || this.anchorEl.classList.contains('no-pointer-events')
      ) {
        this.anchorEl = this.anchorEl.parentNode;
      }

      if (this.value) {
        this.show();
      }
    });
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    if (this.showing) {
      this.__cleanup();
    }
  },
};

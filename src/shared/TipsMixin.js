/* eslint-disable no-underscore-dangle */
/**
 * Mixin to show tips based on component name
 * To use it just import where you want
 */
import Vue from 'vue';
// import { QTooltip } from 'quasar';
import KlabTip from 'components/custom/KlabTip';
import { mapActions, mapGetters } from 'vuex';
import { TIPS } from './tips.js';
import { CUSTOM_EVENTS } from './Constants';

export default {
  data() {
    return {
      currentIndex: -1,
      tipsElements: [],
      isShowing: false,
    };
  },
  computed: {
    ...mapGetters('view', [
      'tipsPages',
    ]),
    localTips() {
      const tips = TIPS.filter(t => t.component === this.$options.name);
      if (tips.length > 0) {
        return tips[0].tips;
      }
      return [];
    },
  },
  methods: {
    ...mapActions('view', [
      'showTipsPage',
      'hideTipsPage',
      'hideAllTipsPages',
    ]),
    checkTips() {
      if (this.localTips.length > 0) {
        const self = this;
        setTimeout(() => {
          self.localTips.forEach((lt, index) => {
            let instance = self.tipsElements.find(te => te.index === `i_${index}`);
            const el = document.querySelector(lt.selector);
            if (!instance) {
              if (el) { // create tip only if the anchor element exists
                console.warn(`${this.$options.name}: create tip for element ${lt.selector}`);
                const Tip = Vue.extend(KlabTip);
                instance = new Tip({
                  propsData: {
                    html: lt.message,
                    lastIndex: self.localTips.length - 1,
                    index,
                  },
                });
                instance.$mount();
                instance.$on('change', (offset) => {
                  if (offset === 0) {
                    self.closeTips();
                  } else {
                    self.currentIndex += offset;
                  }
                });
                instance.$on('dismiss', () => {
                  self.closeTips(true);
                });
                el.appendChild(instance.$el);
                self.tipsElements.splice(index, 0, { index: `i_${index}`, selector: lt.selector, useless: true, instance });
              } else {
                console.warn(`${this.$options.name}: no element ${lt.selector}`);
              }
            } else {
              instance.useless = el !== null;
              console.warn(`${this.$options.name}: remove element ${lt.selector}`);
            }
          });
          this.changeVisibility();
        }, 1000);
      }
    },
    changeVisibility() {
      if (this.tipsElements.length > 0 && this.tipsElements.find(te => te.useless)) {
        console.warn(`${this.$options.name}: change visibility`);
        if (this.tipsPages.length === 0) {
          console.warn(`${this.$options.name}: no tipsPage, start from 0`);
          this.startTips(0);
        } else {
          const index = this.tipsPages.findIndex(tp => tp.page === this.$options.name);
          if (index === -1) {
            if (!this.isShowing) {
              console.warn(`${this.$options.name}: has tipsPage but page don't exists and isShowing, start from 0`);
              this.startTips(0);
            } else {
              console.warn(`${this.$options.name}: has tipsPage but page don't exists and !isShowing, nothing to do`);
            }
          } else if (index === this.tipsPages.length - 1) {
            if (!this.isShowing) {
              console.warn(`${this.$options.name}: has tipsPage, index is ${index}, and !showing -> startTips from 0`);
              this.startTips(this.tipsPages[index].resumeFrom);
            } else {
              console.warn(`${this.$options.name}: has tipsPage, index is ${index}, but is showing -> nothing to do`);
            }
          } else if (index < this.tipsPages.length - 1) {
            if (this.isShowing) {
              console.warn(`${this.$options.name}: has tipsPage, index is ${index} and is less then length ${this.tipsPages.length} , but is showing -> close tips`);
              this.closeTips();
            } else {
              console.warn(`${this.$options.name}: has tipsPage, index is ${index} and is less then length ${this.tipsPages.length} , but is not showing -> nothing to do`);
            }
          }
        }
      } else if (this.isShowing) {
        console.warn(`${this.$options.name}: has no visible elements, and is showing, close tips`);
        this.closeTips();
      }
    },
    startTips(from) {
      this.showTipsPage(this.$options.name);
      this.isShowing = true;
      this.currentIndex = from; // TODO autoplay, need cookie
      this.showTip();
      this.$eventBus.$emit(CUSTOM_EVENTS.TIPS_PAGE_CHANGE, { page: this.$options.name, showing: true });
    },
    showTip() {
      if (this.localTips.length === 0 || this.currentIndex > this.localTips.length) {
        return;
      }
      this.tipsElements.forEach((te, idx) => {
        this.$nextTick(() => {
          te.instance.$props.value = idx === this.currentIndex;
        });
      });
    },
    closeTips(all = false) {
      this.tipsElements.forEach((te) => {
        te.instance.$props.value = false;
      });
      if (all) {
        this.hideAllTipsPages();
      } else {
        this.hideTipsPage(this.$options.name);
      }
      this.currentIndex = -1;
      this.isShowing = false;
      this.$eventBus.$emit(CUSTOM_EVENTS.TIPS_PAGE_CHANGE, { page: this.$options.name, showing: false });
    },
    tipsPageChangeListener(event) {
      if (event.page !== this.$options.name && (event.showing === this.isShowing)) {
        this.changeVisibility();
      }
    },
  },
  watch: {
    currentIndex() {
      if (this.currentIndex >= 0) {
        this.showTip();
      }
    },
  },
  updated() {
    console.warn(`Updated ${this.$options.name}`);
    this.$nextTick(() => {
      this.checkTips();
    });
  },
  mounted() {
    console.warn(`Mounted ${this.$options.name}`);
    this.checkTips();
    this.$eventBus.$on(CUSTOM_EVENTS.TIPS_PAGE_CHANGE, this.tipsPageChangeListener);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.TIPS_PAGE_CHANGE, this.tipsPageChangeListener);
  },
};

/* eslint-disable no-underscore-dangle */
/**
 * Mixin to show tips based on component name
 * To use it just import where you want
 */
import Vue from 'vue';
import { QTooltip } from 'quasar';
// import KlabTip from 'components/custom/KlabTip';
import { TIPS } from './tips.js';

export default {
  data() {
  },
  computed: {
    localTips() {
      const tips = TIPS.filter(t => t.component === this.$options.name);
      if (tips.length > 0) {
        return tips[0].tips;
      }
      return [];
    },
  },
  methods: {
    showTip(index) {
      const l = this.localTips.length - 1;
      if (index > l) {
        return;
      }
      const Tip = Vue.extend(QTooltip);
      const instance = new Tip({
        propsData: {
          value: true,
        },
        nativeOn: {
          click: () => {
            this.value = false;
          },
        },
      });
      const tip = instance.$createElement('div', [this.localTips[index].message]);
      instance.$slots.default = [tip];
      instance.$mount();
      document.getElementById('ksb-spinner').appendChild(instance.$el);
      /*
      this.$q.notify({
        message: this.localTips[index],
        type: 'info',
        icon: 'mdi-information',
        timeout: 0,
        actions: [{
          label: 'Next',
          handler: () => {
            this.showTip(index + 1);
          },
        },
        {
          label: 'Dismiss',
          handler: () => {
            console.log('dismissed');
          },
        }],
      });
      const Tip = Vue.extend(KlabTip);
      const tip = new Tip({
        propsData: {
          html: '<h1>HI :) </h1>',
          index,
          page: this.$options.name,
        },
      }).$mount();


       */
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.localTips.length > 0) {
        this.showTip(0);
      }
    }, 1000);
  },
};

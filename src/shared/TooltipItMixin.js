/**
 * Used to know if element need to show tooltip because is ellipsed
 * How to use it:
 * - in tooltip container (possible ellipsed text), call tooltipIt($event, [element id f.e.])
 * - in v-if/v-show of tooltip use needTooltip([element id f.e.])
 */
export default {
  data() {
    return {
      ellipsed: [],
    };
  },

  methods: {
    tooltipIt(event, ref) {
      if (event.target.offsetWidth < event.target.scrollWidth) {
        this.ellipsed.push(ref);
      } else {
        this.ellipsed.splice(this.ellipsed.indexOf(ref), 1);
      }
    },
    needTooltip(ref) {
      return this.ellipsed.includes(ref);
    },
  },
};

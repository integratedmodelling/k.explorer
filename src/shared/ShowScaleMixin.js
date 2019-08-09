/**
 * Used to show scale
 * It define two variable for each scale and give a method to change it call toggleScalePopup(type, value)
 */
export default {
  data() {
    return {
      showSpaceScalePopup: false,
      showTimeScalePopup: false,
    };
  },

  methods: {
    toggleScalePopup(type, value) {
      if (type === 'space') {
        this.showSpaceScalePopup = value;
        this.showTimeScalePopup = false;
      } else if (type === 'time') {
        this.showSpaceScalePopup = false;
        this.showTimeScalePopup = value;
      }
    },
  },
};

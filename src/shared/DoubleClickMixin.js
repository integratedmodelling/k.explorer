/**
 * Mixin to handle different function if click or double click on element
 * To use it, add @click
 */
export default {
  data() {
    return {
      timer: null,
      prevent: false,
      delay: 200,
    };
  },

  methods: {
    onClick(event, callback) {
      this.timer = setTimeout(() => {
        if (!this.prevent) {
          callback(event);
        }
        this.prevent = false;
      }, this.delay);
    },
    onDblClick(event, callback) {
      clearTimeout(this.timer);
      this.prevent = true;
      callback(event);
    },
  },
};

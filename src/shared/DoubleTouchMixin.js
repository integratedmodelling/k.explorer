/**
 * Used to intercept double touch as double click
 * Pass the event, the oneTouch function and the doubleTouch function
 */
export default {
  data() {
    return {
      doubleTouchTimeout: null,
    };
  },
  computed: {
    waitForDouble() {
      return this.doubleTouchTimeout !== null;
    },
  },
  methods: {
    doubleTouch(event, oneTouchCallback = null, doubleTouchCallback = null, doubleFingerCallback = null, timeout = 300) {
      if (event instanceof TouchEvent) {
        if (event.targetTouches.length === 1) {
          event.preventDefault();
          if (this.doubleTouchTimeout === null) {
            this.doubleTouchTimeout = setTimeout(() => {
              this.doubleTouchTimeout = null;
              if (oneTouchCallback !== null) {
                oneTouchCallback(event);
              }
            }, timeout);
          } else {
            clearTimeout(this.doubleTouchTimeout);
            this.doubleTouchTimeout = null;
            if (doubleTouchCallback !== null) {
              doubleTouchCallback();
            }
          }
        } else if (doubleFingerCallback !== null) {
          event.preventDefault();
          doubleFingerCallback(event);
        }
      }
    },
  },
};

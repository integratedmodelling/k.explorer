/**
 * Used to intercept touch events
 * Pass the event and the function for one touch, double touch or double finger touch
 *
 */
export default {
  data() {
    return {
      doubleTouchTimeout: null,
    };
  },
  methods: {
    handleTouch(event, oneTouchCallback = null, doubleTouchCallback = null, doubleFingerCallback = null, timeout = 300) {
      if (event instanceof TouchEvent) {
        // single touch
        if (event.targetTouches.length === 1) {
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
          // double touch
          doubleFingerCallback(event);
        }
      }
    },
  },
};

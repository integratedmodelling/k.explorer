/* eslint-disable no-unused-expressions */
/**
 * Class for stomp listener.
 * Is possible to register a listener using socket option on vue pages
 */
class Emitter {
  constructor() {
    this.listeners = new Map();
  }

  /**
   * Register a listener for a Stomp event (@see Observer for event list)
   * @param label the name of listener
   * @param callback callback to use
   * @param vm javascript context
   */
  addListener(label, callback, vm) {
    if (typeof callback === 'function') {
      this.listeners.has(label) || this.listeners.set(label, []);
      this.listeners.get(label).push({ callback, vm });
      return true;
    }
    return false;
  }

  /**
   * Remove listener
   * @param label the name of listener
   * @param callback callback to use
   * @param vm javascript context
   */
  removeListener(label, callback, vm) {
    const listeners = this.listeners.get(label);
    let index;

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, idx) => {
        if (typeof listener.callback === 'function' && listener.callback === callback && listener.vm === vm) {
          i = idx;
        }
        return i;
      }, -1);

      if (index > -1) {
        listeners.splice(index, 1);
        this.listeners.set(label, listeners);
        return true;
      }
    }
    return false;
  }

  /**
   * Call all listener with this label
   * @param label label
   * @param args optional arguments
   */
  emit(label, ...args) {
    const listeners = this.listeners.get(label);

    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener.callback.call(listener.vm, ...args);
      });
      return true;
    }
    return false;
  }
}

export default new Emitter();

/* eslint-disable prefer-destructuring */
// import ProxyPolyfill from 'proxy-polyfill/src/proxy.js';
// import ProxyPolyfill from 'proxy-polyfill/src/proxy.js';
import Observer from './Observer';
import Emitter from './Emitter';

export default {

  install(Vue, connection, opts = {}) {
    console.log('Installing vue-stomp-client');
    if (!connection) { throw new Error('[vue-stomp-client] cannot locate connection'); }

    let observer = null;

    if (opts.connectManually) {
      Vue.prototype.$connect = () => {
        observer = new Observer(connection, opts);

        Vue.prototype.$stompClient = observer.StompClient;
      };

      Vue.prototype.$disconnect = () => {
        if (observer && observer.reconnection) { observer.reconnection = false; }
        if (Vue.prototype.$stompClient) {
          observer.close();
          delete Vue.prototype.$stompClient;
        }
      };
    } else {
      observer = new Observer(connection, opts);
      Vue.prototype.$stompClient = observer.StompClient;
    }

    Vue.mixin({
      methods: {
        sendStompMessage(message, destination = '/klab/message') {
          if (observer.isConnected()) {
            this.$stompClient.send(destination, JSON.stringify(message), {});
          }
        },
      },
      created() {
        if (this.$options.sockets) {
          const vm = this;
          const sockets = this.$options.sockets;
          // this.$options.sockets = new ProxyPolyfill({}, {
          this.$options.sockets = new Proxy({}, {
            set(target, key, value) {
              Emitter.addListener(key, value, vm);
              target[key] = value;
              return true;
            },
            // IE11 Polyfill don't support delete property
            deleteProperty(target, key) {
              Emitter.removeListener(key, vm.$options.sockets[key], vm);
              delete target.key;
              return true;
            },
          });
          if (sockets) {
            Object.keys(sockets).forEach((key) => {
              this.$options.sockets[key] = sockets[key];
            });
          }
        }
      },
      beforeDestroy() {
        if (this.$options.sockets) {
          const sockets = this.$options.sockets;

          if (sockets) {
            Object.keys(sockets).forEach((key) => {
              Emitter.removeListener(key, this.$options.sockets[key], this);
              delete this.$options.sockets[key];
            });
          }
          if (Vue.prototype.$stompClient) {
            observer.close();
            delete Vue.prototype.$stompClient;
          }
        }
      },
    });
  },
};

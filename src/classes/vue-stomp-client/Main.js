// If we need to use IE11, it must be uncommented and used proxy
// import ProxyPolyfill from 'proxy-polyfill/src/proxy.js';
// import ProxyPolyfill from 'proxy-polyfill/src/proxy.js';
import Observer from './Observer';
import Emitter from './Emitter';

export default {

  /**
   * Plugin to use stomp client
   * @param Vue Vue object to use
   * @param connection url for connections
   * @param connectionHeaders headers for connections
   * @param opts options:
   * @property connectManually permit connect client when needed. Default behaviour is automatic connection
   * @property defaultMessageDestination default destination for send messages
   * @property defaultSubscribeDestination default subscribe destination
   * @property more options, @see Observer.js
   * @returns {*}
   */
  install(Vue, connection, connectionHeaders = {}, opts = {}) {
    if (!connection) { throw new Error('[vue-stomp-client] cannot locate connection'); }

    let observer = null;

    if (opts.connectManually) {
      Vue.prototype.$connect = () => {
        observer = new Observer(connection, connectionHeaders, opts);
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
      observer = new Observer(connection, connectionHeaders, opts);
      Vue.prototype.$stompClient = observer.StompClient;
    }

    Vue.mixin({
      methods: {
        // send a stomp message
        sendStompMessage(message, headers, destination = opts.defaultMessageDestination) {
          observer.send(destination, message, headers);
          console.debug(`Message sent: ${JSON.stringify(message, null, 4)}`);
        },

        // In this app, the subscribe destination need an id
        subscribe(idToSubscribe, headers, callback, destination = opts.defaultSubscribeDestination) {
          return observer.subscribe(`${destination}/${idToSubscribe}`, headers, callback);
        },

        unsubscribe(id) {
          observer.unsubscribe(id);
          console.debug(`Unsubscribe the subscription with id ${id}`);
        },

        reconnect() {
          if (observer.StompClient && !observer.StompClient.connected) {
            console.debug('Try to reconnect...');
            observer.reconnect();
          }
        },
      },
      created() {
        if (this.$options.sockets) {
          const vm = this;
          const { sockets } = this.$options;
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
          const { sockets } = this.$options;

          if (sockets) {
            Object.keys(sockets).forEach((key) => {
              console.debug(`Remove listener ${key}`);
              Emitter.removeListener(key, this.$options.sockets[key], this);
              delete this.$options.sockets[key];
            });
          }
        }
      },
    });
  },
};

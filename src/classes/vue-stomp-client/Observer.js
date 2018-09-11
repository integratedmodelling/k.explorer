import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';
import Emitter from './Emitter';

/**
 * Create and observe a Stomp over SockJS connection
 */
export default class {
  /**
   * Create a new Observer object
   * @param connectionUrl url of Stomp service
   * @param connHeaders headers. Default is empty headers object
   * @param options options
   * @property
   * stompOptions: {
   *   binary?: boolean (false);
   *   heartbeat?: Heartbeat | boolean ({outgoing: 10000, incoming: 10000});
   *   debug?: boolean (true);
   *   protocols?: string[]
   *   protocol: protocols dosn't work if used over sockJS, need to add in bad way @see line 92
   * },
   * sockJSOptions: { @link(https://github.com/sockjs/sockjs-client#sockjs-client-api)
   *   server: string
   *   transports: string or string[]
   *   sessionId: Number or function
   * }
   * store: if setted, everything is sended to store mutation or action,
   * storeNS: if setted, indicate the Namespace of store to use for mutations or actions
   * reconnection: indicate if automatic reconnection is needed
   * reconnectionAttempts: how many reconnection attempts. Default is Infinity
   * reconnectionDelay: reconnection delay. Default is 2000ms
   * debug: debug of observer (not for stomp client)
   */
  constructor(connectionUrl, connectionHeaders = {}, options = {}) {
    if (!connectionUrl) {
      throw new Error('Connection url is needed');
    }
    this.connectionUrl = connectionUrl;
    this.connectionHeaders = connectionHeaders;

    // using the JSteunou way for opts
    const {
      stompOptions = {
        debug: false,
      },
      sockJSOptions = {},
      reconnection = false,
      reconnectionAttempts = Infinity,
      reconnectionDelay = 2000,
      debug = false,
      store = null,
      storeNS = '',
    } = options;

    this.reconnection = reconnection;
    this.reconnectionAttempts = reconnectionAttempts;
    this.reconnectionDelay = reconnectionDelay;

    this.hasDebug = debug;

    // Init no opt
    this.reconnectTimeoutId = -1;
    this.reconnectionCount = 0;

    if (typeof store !== 'undefined' && store !== null) {
      this.store = store;
      this.storeNS = storeNS;
    }

    this.stompOptions = stompOptions;
    this.sockJSOptions = sockJSOptions;

    this.connect();
  }

  /**
   * If debug is on, console.debug
   * @param args
   */
  debug(...args) {
    if (this.hasDebug) console.debug(...args);
  }

  /**
   * Connect using constructor parameters
   */
  connect() {
    // Create object and connect must be atomic (don't know why, is a webstomp-client "problem"
    // https://github.com/JSteunou/webstomp-client/issues/6

    const sockJs = SockJS(this.connectionUrl, this.sockJSOptions);
    sockJs.protocol = this.stompOptions.protocol || '';
    this.StompClient = webstomp.over(sockJs, this.stompOptions);
    this.StompClient.connect(
      this.connectionHeaders,
      (frame) => {
        this.doOnEvent('onconnect', frame);
      },
      error => setTimeout(() => {
        this.doOnEvent('onerror', error);
      }, 1000),
    );
  }

  /**
   * return if connected
   * @returns {*|boolean}
   */
  isConnected() {
    return this.StompClient && this.StompClient.connected;
  }

  /**
   * Reconnect if needed
   */
  reconnect() {
    if (this.reconnectionCount <= this.reconnectionAttempts) {
      this.reconnectionCount += 1;
      clearTimeout(this.reconnectTimeoutId);

      this.reconnectTimeoutId = setTimeout(() => {
        this.doOnEvent('reconnect', this.reconnectionCount);
        /*
        if (this.store) {
          this.passToStore('stomp_reconnect', this.reconnectionCount);
        }
        */
        this.connect();
      }, this.reconnectionDelay);
    } else if (this.store) {
      this.passToStore('stomp_onerror', 'Reconnection error');
    }
  }

  /**
   * Subscribe to something
   * @param headers
   * @param callback
   * @returns {*}
   */
  subscribe(subscribeUrl, headers = {}, callback = (message) => { this.doOnEvent('onmessage', message); }) {
    if (subscribeUrl) {
      const subscription = this.StompClient.subscribe(subscribeUrl, callback, headers);
      if (subscription) {
        this.doOnEvent('onsubscribe', subscription);
        return subscription;
      }
    }
    return null;
  }

  /**
   * Unsuscribe. It will be do using subscription object
   * @param id
   * @param headers
   */
  unsubscribe(id, headers) {
    this.StompClient.unsubscribe(id, headers);
  }

  /**
   * Send a STOMP message
   * @param destination
   * @param headers
   * @param message
   * @returns {boolean}
   */
  send(destination, message, headers = {}) {
    if (this.isConnected()) {
      this.StompClient.send(destination, JSON.stringify(message), headers);
      this.doOnEvent('onsend', {
        headers,
        message,
      });
      return true;
    }
    this.doOnEvent('onerrorsend', {
      headers,
      message,
    });
    return false;
  }

  /**
   * Manage the things to do on event: Emit to listener and if setted, send to store action
   * @param eventType
   * @param payload
   */
  doOnEvent(eventType, payload) {
    if (!Emitter.emit(eventType, payload)) {
      this.debug(`No listener for ${eventType}`);
    }

    if (this.store) {
      this.passToStore(`stomp_${eventType}`, payload);
    }

    if (this.reconnection && eventType === 'onoconnect') { this.reconnectionCount = 0; }

    if (this.reconnection && eventType === 'onerror') {
      // && payload instanceof Error && payload.message !== 'Reconnection error') {
      // only if is a connection error
      this.reconnect();
    }
  }

  /**
   * Pass control to store
   * @param eventName
   * @param event
   */
  passToStore(eventName, event) {
    if (!eventName.startsWith('stomp_')) { return; }

    // CHANGED THE TARGET TO ACTION
    // Mutation are state changes and here we actuate on events
    // let method = 'commit';
    let method = 'dispatch';
    let target = [this.storeNS || '', eventName.toLowerCase()].filter(e => !!e).join('/');
    let msg = event || null;
    if (event && event.data) {
      msg = JSON.parse(event.data);
      if (msg.mutation) {
        target = [msg.namespace || '', msg.mutation].filter(e => !!e).join('/');
      } else if (msg.action) {
        method = 'dispatch';
        target = [msg.namespace || '', msg.action].filter(e => !!e).join('/');
      }
    }
    this.store[method](target, msg);
  }

  /**
   * Close connections
   */
  close() {
    if (this.StompClient) {
      this.StompClient.disconnect();
      this.doOnEvent('onclose');
    }
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
    }
  }
}

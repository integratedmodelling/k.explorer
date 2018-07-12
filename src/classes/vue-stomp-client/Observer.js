import Emitter from './Emitter';
import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';

/**
 * Create and observe a Stomp over SockJS connection
 */
export default class {
  /**
   * Constructor
   * @param connectionUrl The url of Stomp/SockJS websocket
   * @param opts
   * Stomp client
   * @property headers: headers
   * @property protocols: default to ['v10.stomp', 'v11.stomp', 'v12.stomp']
   * @property binary: default to false. See binary section
   * @property heartbeat: default to {incoming: 10000, outgoing: 10000}.
   *    You can provide false to cut it  (recommended when the server is a
   *    SockJS server) or a definition object.
   * @property debug: default to true. Will log frame using console.log
   * Others
   * @property reconnection: true \ false - False if not indicated
   * @property reconnectionAttempts default Infinity (valid if reconnection === true)
   * @property reconnectionDelay default 1000ms
   */
  constructor(connectionUrl, options = {}) {
    if (!connectionUrl) {
      throw new Error('Connection url is needed');
    }
    this.connectionUrl = connectionUrl;

    // using the JStenoun way for opts
    const {
      stompOptions,
      reconnection = false,
      reconnectionAttempts = Infinity,
      reconnectionDelay = 2000,
      debug = true,
      store,
      storeNS = '',
      defaultMessageDestination,
    } = options;

    this.reconnection = reconnection;
    this.reconnectionAttempts = reconnectionAttempts;
    this.reconnectionDelay = reconnectionDelay;

    this.hasDebug = debug;

    // Init no opt
    this.reconnectTimeoutId = -1;
    this.reconnectionCount = 0;

    this.subscribeId = null;

    this.defaultMessageDestination = defaultMessageDestination;

    if (store) {
      this.store = store;
      this.storeNS = storeNS;
    }

    this.stompOptions = stompOptions;

    // Is a default behaviour because the opt to connect manually is controlled in Main.js
    this.connect(connectionUrl, stompOptions);
  }

  debug(...args) {
    if (this.hasDebug) console.log(...args);
  }

  /**
   * Connect
   * @param connectionUrl
   * @param opts
   * @returns {*}
   */
  connect(connectionUrl, stompOptions = {}) {
    // Create object and connect must be atomic (don't know why, is a webstomp-client "problem"
    // https://github.com/JSteunou/webstomp-client/issues/6
    const { headers = {}, subscribeUrl /* , sockJSOptions = {} */ } = stompOptions;

    const sockJs = SockJS(connectionUrl); // , sockJSOptions);
    sockJs.protocol = stompOptions.protocol || '';
    this.StompClient = webstomp.over(sockJs, stompOptions);
    this.StompClient.connect(
      headers,
      (frame) => {
        this.doOnEvent('onconnect', frame);
        // const cl = this;
        this.subscribe(subscribeUrl);
      },
      error => setTimeout(() => {
        this.doOnEvent('onerror', error);
      }, 1000),
    );

    return this.StompClient;
  }

  subscribe(subscribeUrl) {
    if (subscribeUrl) {
      this.subscribeId = this.StompClient.subscribe(subscribeUrl, (message) => {
        this.doOnEvent('onmessage', message);
      });
      if (this.subscribeId) {
        this.doOnEvent('onsubscribe', this.subscribeId);
      }
    }
  }

  isConnected() {
    return this.StompClient && this.StompClient.connected;
  }

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
        this.connect(this.connectionUrl, this.stompOptions);
      }, this.reconnectionDelay);
    } else if (this.store) {
      this.passToStore('stomp_onerror', 'Reconnection error');
      // this.doOnEvent('onerror', new Error('Reconnection error'));
    }
  }

  send(destination = this.defaultMessageDestination, headers = this.headers, message) {
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

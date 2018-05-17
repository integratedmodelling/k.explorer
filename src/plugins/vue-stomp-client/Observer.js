import Emitter from './Emitter';
import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';

export default class {
  constructor(connectionUrl, opts = {}) {
    this.connectionUrl = connectionUrl;
    this.opts = opts;

    this.reconnection = this.opts.reconnection || false;
    this.reconnectionAttempts = this.opts.reconnectionAttempts || Infinity;
    this.reconnectionDelay = this.opts.reconnectionDelay || 1000;
    this.reconnectTimeoutId = 0;
    this.reconnectionCount = 0;

    this.subscribeId = null;
    this.headers = {};

    if (opts.store) {
      this.store = opts.store;
      this.storeNS = opts.storeNS || '';
    }

    this.connect(connectionUrl, opts);
  }

  connect(connectionUrl, opts = {}) {
    const sockJs = SockJS(connectionUrl, opts);
    this.StompClient = webstomp.over(sockJs);
    this.StompClient.connect(
      opts.headers || this.headers,
      (frame) => {
        this.doOnEvent('onconnect', frame);
        const cl = this;
        if (this.opts.subscribeUrl) {
          cl.subscribeId = this.StompClient.subscribe(cl.opts.subscribeUrl, message => this.doOnEvent('onmessage', message));
          if (cl.subscribeId) {
            this.doOnEvent('onsubscribe', cl.subscribeId);
          }
        }
      },
      error => this.doOnEvent('onerror', error),

    );

    /*
    if (this.format === 'json') {
      if (!('sendObj' in this.WebSocket)) {
        this.WebSocket.sendObj = obj => this.WebSocket.send(JSON.stringify(obj));
      }
    }
    */
    return this.StompClient;
  }

  isConnected() {
    return this.StompClient && this.StompClient.connected;
  }

  reconnect() {
    if (this.reconnectionCount <= this.reconnectionAttempts) {
      this.reconnectionCount += 1;
      clearTimeout(this.reconnectTimeoutId);

      this.reconnectTimeoutId = setTimeout(() => {
        if (this.store) { this.passToStore('SOCKET_RECONNECT', this.reconnectionCount); }

        this.connect(this.connectionUrl, this.opts);
      }, this.reconnectionDelay);
    } else if (this.store) { this.passToStore('SOCKET_RECONNECT_ERROR', true); }
  }

  doOnEvent(eventType, payload) {
    console.log(`Event: ${eventType}, payload: ${JSON.stringify(payload)}`);
    if (!Emitter.emit(eventType, payload)) {
      console.debug(`No listener for ${eventType}`);
    }

    if (this.store) { this.passToStore(`SOCKET_${eventType}`, payload); }

    if (this.reconnection && eventType === 'onoconnect') { this.reconnectionCount = 0; }

    if (this.reconnection && eventType === 'onerror' && payload.type === 'close') { this.reconnect(); }
  }

  passToStore(eventName, event) {
    if (!eventName.startsWith('SOCKET_')) { return; }
    let method = 'commit';
    let target = [this.storeNS || '', eventName.toUpperCase()].filter(e => !!e).join('/');
    let msg = event;
    if (this.format === 'json' && event.data) {
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
      this.doOnEvent('ondisconnect');
    }
  }
}

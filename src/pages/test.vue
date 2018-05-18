<template>
  <div>
    <h1>SALTO</h1>
    <div id="main-content" class="container">
      <div class="row">
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <p>Is connected: {{ isConnected  }} -> {{ message }}</p>

              <label for="connect">WebSocket connection with session {{sessionId}}:</label>
              <button id="connect" class="btn btn-default" type="submit"
                      :disabled="isConnected == true" @click.prevent="clickButton">click</button>
              <button id="disconnect" class="btn btn-default" type="submit"
                      :disabled="isConnected == false" @click.prevent="disconnect">Disconnect
              </button>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <label for="name">What is your name?</label>
              <input type="text" id="name" class="form-control"
                     v-model="send_message" placeholder="Your name here...">
            </div>
            <button id="send" class="btn btn-default"
                    type="submit" @click.prevent="send">Send</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table id="conversation" class="table table-striped">
            <thead>
            <tr>
              <th>Greetings</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in sendedMessages" :key="index">
              <td>{{ item }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable prefer-arrow-callback */
// import SockJS from 'sockjs-client';
// import webstomp from 'webstomp-client?es6';
/*
import Vue from 'vue';


Vue.use(x, 'http://localhost:8283/modeler/message', {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1,
});
*/
// import { mapState } from 'vuex';

export default {

  data() {
    return {
      sessionId: 'srhak49dajp6d',
      received_messages: [],
      send_message: '',
      stompConnected: false,
    };
  },
  computed: {
    isConnected() {
      return this.$store.state.stomp.isConnected;
    },
    message() {
      return this.$store.state.stomp.message;
    },
    sendedMessages() {
      return this.$store.state.stomp.sendedMessages;
    },
  },
  sockets: {
    onconnect: (frame) => {
      this.stompConnected = true;
      console.log(`On connect test: ${frame}`);
    },
    onerror: (frame) => {
      console.log(`On erro test: ${frame}`);
    },
  },
  methods: {
    clickButton() {
    },
    send() {
      const msg = { name: this.send_message };
      this.sendStompMessage(msg);
      /*
      console.log(`Send message: ${this.send_message}`);
      const msg = { name: this.send_message };
      this.$socket.send('/klab/message', JSON.stringify(msg), {});
      */
    },
    /*
    showConnect() {
      console.log(`Into interval: ${this.$stomp.connected}`);
      if (!this.isStart) {
        this.connect();
        this.isStart = true;
      }
      if (this.$stomp.connected) {
        console.log('Connected! Clear interval');
        clearInterval(this.interval);
      }
    },
    */
    connect() {
      /*
      const socket = SockJS('http://localhost:8283/modeler/message');

      const stomp = webstomp.over(socket);
      socket.onopen = () => {
        console.log('open sockjs');
      };

      socket.onmessage = (e) => {
        console.log('message', e.data);
      };

      socket.onclose = () => {
        console.log('close');
      };
      stomp.connect(
        {},
        (frame) => { console.log(`AQUI: ${frame}`); },
        (error) => { console.log(`Error: ${error}`); },
      );
      // this.$stomp.disconnect();
      console.log(`Connect: ${performance.now()}`);
      this.$stomp.connect(
        {},
        (frame) => {
          console.log(`Into connect: ${this.$stomp.connected}`);
          console.log(`AQUI: ${frame}`);
          // this.$stomp.disconnect();
        },
        (error) => { console.log(`Error: ${error}`); },
      );
      */
      // this.$socket.connect();
      // const msg = { name: this.send_message };
      // this.$socket.send('/klab/message', msg, {});
    },
    disconnect() {
    },
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>

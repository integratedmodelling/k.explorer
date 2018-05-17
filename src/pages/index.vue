<template>
  <q-page class="column">
      <div class="col row full-height">
        <div class="col-3 no-padding" v-if="hasTree">
          <klab-tree></klab-tree>
        </div>
        <div class="col column no-padding">
          <div class="col no-padding full-height full-width">
            <component :is="actualViewer"></component>
          </div>
          <div class="col-2" v-if="hasViews">OLD-MAPS</div>
        </div>
      </div>
      <div class="col-1" v-if="hasLog">STATUS</div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import mapViewer from 'components/MapViewer.vue';
import chartViewer from 'components/CharViewer.vue';
import klabTree from 'components/KLabTree.vue';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default {
  /* eslint-disable object-shorthand */
  name: 'PageIndex',
  data() {
    return {
      actualViewer: 'mapViewer',
      received_messages: [],
      send_message: null,
      connected: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'tree',
      'saved',
      'status',
    ]),
    hasTree() {
      return this.tree.length;
    },
    hasViews() {
      return this.saved.length;
    },
    hasLog() {
      return this.status.length;
    },
  },
  components: {
    mapViewer,
    chartViewer,
    klabTree,
  },
  methods: {
    send() {
      console.log(`Send message: + ${this.send_message}`);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { name: this.send_message };
        this.stompClient.send('/klab/message', JSON.stringify(msg), {});
      }
    },
    connect() {
      const socket = new SockJS('http://localhost:8283/modeler/message');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {},
        (frame) => {
          this.connected = true;
          console.log(frame);
          this.stompClient.subscribe('/klab/message', (tick) => {
            console.log(`tick: ${tick}`);
            this.received_messages.push(JSON.parse(tick.body).content);
          });
        },
        (error) => {
          console.log(error);
          this.connected = false;
        },
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
  },
  watch: {
  },
};
</script>
<style scoped>
  .row div{
    padding: 10px 15px;
    background: rgba(86, 61, 124, .15);
    border: 1px solid rgba(86, 61, 124, .2)
  }
  .small {
    widht:10px;
  }
</style>


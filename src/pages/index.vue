<template>
  <q-page class="column">
      <div class="col row full-height">
        <div class="col-3 no-padding" v-if="hasTree">
          <form class="form-inline">
            <div class="form-group">
              <label for="message">Send message</label>
              <input type="text" id="message" class="form-control"
                     :disabled="!isConnected" v-model="send_message"
                     :placeholder=" isConnected ? 'Message here...':'Disconnected, wait...'">
            </div>
            <button id="send" class="btn btn-default"
                    type="submit"
                    :disabled="!isConnected"
                    @click.prevent="send">Send</button>
          </form>
          <klab-tree></klab-tree>
        </div>
        <div class="col column no-padding">
          <div class="col no-padding full-height full-width">
            <component :is="actualViewer"></component>
          </div>
          <div class="col-2" v-if="hasViews">OLD-MAPS</div>
        </div>
      </div>
    <!-- v-if="hasLog" -->
      <div class="col-1 row">
        <div class="col-1 no-padding">
          <q-icon name="label_important" :style="{color: isConnected ? 'green':'red'}"></q-icon>
        </div>
        <div class="col full-width no-padding message-log">
          {{ sendedMessages.length>0 ? sendedMessages[0].payload || 'No payload' : 'No message' }}
        </div>
      </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import mapViewer from 'components/MapViewer.vue';
import chartViewer from 'components/CharViewer.vue';
import klabTree from 'components/KLabTree.vue';

export default {
  /* eslint-disable object-shorthand */
  name: 'PageIndex',
  data() {
    return {
      actualViewer: 'mapViewer',
      received_messages: [],
      send_message: '',
      connected: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'tree',
      'saved',
      'status',
    ]),
    sendedMessages() {
      return this.$store.state.stomp.sendedMessages;
    },
    isConnected() {
      return this.$store.state.stomp.connected;
    },
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
      const msg = { name: this.send_message };
      this.sendStompMessage(msg);
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
  .message-log {
    height: 2em;
    overflow: hidden;
  }
</style>


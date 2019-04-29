<template>
  <q-modal
    v-model="opened"
    :no-esc-dismiss="true"
    :no-backdrop-dismiss="true"
    :content-classes="['irm-container']"
    ref="irm-modal-container"
    @hide="cleanInputRequest"
  >
    <q-tabs
      v-model="selectedRequest"
      swipeable
      animated
      color="white"
      :class="{ 'irm-tabs-hidden': inputRequests.length <= 1 }"
    >
      <q-tab
        v-for="request in inputRequests"
        :key="request.messageId"
        :name="`request-${request.messageId}`"
        :class="{ 'irm-tabs-hidden': inputRequests.length <= 1 }"
        slot="title">
      </q-tab>
      <q-tab-pane
        v-for="request in inputRequests"
        :key="request.messageId"
        :name="`request-${request.messageId}`"
      >
        <div class="irm-group">
          <div class="irm-global-description">
            <h4>{{ request.sectionTitle !== null ? request.sectionTitle: $t('label.noInputSectionTitle') }}</h4>
            <p>{{ request.description }}</p>
          </div>
          <div class="irm-fields-container" data-simplebar>
            <div class="irm-fields-wrapper">
              <div v-for="field in request.fields" :key="getFieldId(field, request.messageId)" class="irm-field">
                <div class="irm-section-description" v-if="checkSectionTitle(field.sectionTitle)">
                  <h5>{{ field.sectionTitle }}</h5>
                  <p>{{ field.sectionDescription }}</p>
                </div>
                <q-field
                  :label="field.label !== null ? field.label : field.id"
                  :helper="field.description"
                >
                  <component
                    :name="getFieldId(field, request.messageId)"
                    :is="`${capitalizeFirstLetter(field.type)}InputRequest`"
                    :initialValue="field.initialValue"
                    :values="field.values"
                    :range="field.range"
                    :numericPrecision="field.numericPrecision"
                    :regexp="field.regexp"
                    @change="updateForm(getFieldId(field, request.messageId), $event)"
                  ></component>
                </q-field>
              </div>
            </div>
          </div>
          <div class="irm-buttons">
            <q-btn
              color="primary"
              @click="cancelRequest(request)"
              :label="$t('label.cancelInputRequest')"
            >
              <!--
              <q-tooltip :delay="200" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                {{ $t('tooltips.cancelInputRequest') }}
              </q-tooltip>
              -->
            </q-btn>
            <q-btn
              color="mc-main"
              :disable="formDataIsEmpty"
              @click="send(request.messageId, true)"
              :label="$t('label.resetInputRequest')"
            >
              <!--
              <q-tooltip :delay="200" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                {{ $t('tooltips.resetInputRequest') }}
              </q-tooltip>
              -->
            </q-btn>
            <q-btn
              color="mc-main"
              @click="send(request.messageId, false)"
              :label="$t('label.submitInputRequest')"
            >
              <!--
              <q-tooltip :delay="200" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                {{ $t('tooltips.submitInputRequest') }}
              </q-tooltip>
              -->
            </q-btn>
          </div>
        </div>
      </q-tab-pane>
    </q-tabs>
  </q-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TextInputRequest from 'components/form/TextField.vue';
import NumberInputRequest from 'components/form/NumberField.vue';
import BooleanInputRequest from 'components/form/BooleanField.vue';
import { capitalizeFirstLetter } from 'shared/Utils';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import 'simplebar';

export default {
  name: 'InputRequestModal',
  components: {
    TextInputRequest,
    NumberInputRequest,
    BooleanInputRequest,
  },
  sectionTitle: null,
  data() {
    return {
      formData: {},
      simpleBars: [],
      selectedRequest: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'session',
    ]),
    ...mapGetters('view', [
      'hasInputRequests',
      'inputRequests',
    ]),
    opened: {
      set() {
        // nothing to do
      },
      get() {
        return this.hasInputRequests;
      },
    },
    formDataIsEmpty() {
      return Object.keys(this.formData).length === 0;
    },
  },
  methods: {
    ...mapActions('view', [
      'removeInputRequest',
    ]),
    send(messageId, onlyDefault = false) {
      const request = this.inputRequests.find(r => r.messageId === messageId);
      if (typeof request !== 'undefined') {
        const values = request.fields.reduce((map, obj) => {
          if (!onlyDefault) {
            const value = this.formData[this.getFieldId(obj, request.messageId)];
            if (typeof value === 'undefined' || value === null || value === '') {
              map[this.getFieldId(obj)] = obj.initialValue;
            } else {
              map[this.getFieldId(obj)] = value.toString();
            }
          } else {
            map[this.getFieldId(obj)] = obj.initialValue;
          }
          return map;
        }, {});
        this.sendStompMessage(MESSAGES_BUILDERS.USER_INPUT_RESPONSE({
          messageId: request.messageId,
          requestId: request.requestId,
          values,
        }, this.session).body);
        this.removeInputRequest(request.messageId);
      }
    },
    cancelRequest(request) {
      this.sendStompMessage(MESSAGES_BUILDERS.USER_INPUT_RESPONSE({
        messageId: request.messageId,
        requestId: request.requestId,
        cancelRun: true,
        values: {},
      }, this.session).body);
      this.removeInputRequest(request.messageId);
    },
    updateForm(fieldName, value) {
      if (value === null) {
        this.$delete(this.formData, fieldName);
      } else {
        this.$set(this.formData, fieldName, value);
      }
    },
    capitalizeFirstLetter(string) {
      return capitalizeFirstLetter(string);
    },
    getFieldId(field, requestId = null) {
      if (requestId === null) {
        return `${field.functionId}/${field.id}`;
      }
      return `${requestId}-${field.functionId}/${field.id}`;
    },
    checkSectionTitle(sectionTitle) {
      if (this.$options.sectionTitle !== sectionTitle) {
        this.$options.sectionTitle = sectionTitle;
        return true;
      }
      return false;
    },
    cleanInputRequest() {
      // this is call if the window is close
      this.formData = {};
      // something was wrong if inputRequest still have values
      this.removeInputRequest(null);
    },
  },
  watch: {
    inputRequests() {
      if (this.inputRequests.length > 0) {
        this.selectedRequest = `request-${this.inputRequests[0].messageId}`;
      }
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables';

  .irm-container
    padding 20px
    width 80vh
    overflow hidden
    h3, h4, h5, p
      margin 0 0 0 0
      padding 0
      color $main-control-main-color
    h3
    p
      margin-bottom 10px
    h3
    h4
    h5
      line-height 1.4em
    h3
      font-size 1.4em
    h4
      font-size 1.2em
    h5
      font-size 1em

    h4
    h5
      & + p
        color #333
        font-size .8em
        font-style italic
    h5 + p
      border-bottom 1px solid $main-control-main-color
      padding-bottom 10px
    .q-tabs:not(.irm-tabs-hidden) .q-tabs-head
      border-bottom 1px solid $main-control-main-color
    .q-tab:not(.irm-tabs-hidden)
      border-top-left-radius 5px
      border-top-right-radius 5px
      background-color $main-control-main-color
    .q-tabs-position-top > .q-tabs-head .q-tabs-bar
      border-bottom-width 10px
      color rgba(255, 255, 255, .3)
    .irm-fields-container
      max-height 60vh
      overflow hidden
      border 1px dotted $main-control-main-color
      margin 10px 0
      .irm-fields-wrapper
        padding 10px
        overflow-x hidden
      .irm-group
        margin 10px 0
      label
        font-style italic
    .irm-buttons
      width 100%
      text-align right
      .q-btn
        margin-left 10px
</style>

<template>
  <q-modal
    v-model="hasInputRequests"
    :no-esc-dismiss="true"
    :no-backdrop-dismiss="true"
    :content-classes="['irm-container']"
  >
    <div v-for="(request, index) in inputRequests" :key="request.requestId" class="irm-group">
      <h3 v-if="index === 0">{{ request.sectionTitle !== null ? request.sectionTitle: $t('label.noInputSectionTitle') }}</h3>
      <div v-for="field in request.fields" :key="getFieldId(field, request.requestId)" class="irm-field">
        <h4 v-if="checkSectionTitle(field.sectionTitle)">{{ field.sectionTitle }}</h4>
        <q-field
          :label="field.label !== null ? field.label : field.id"
          :helper="field.description"
        >
          <component
            :name="getFieldId(field, request.requestId)"
            :is="`${capitalizeFirstLetter(field.type)}InputRequest`"
            :initialValue="field.initialValue"
            :values="field.values"
            :range="field.range"
            :numericPrecision="field.numericPrecision"
            :regexp="field.regexp"
            @change="updateForm(getFieldId(field, request.requestId), $event)"
          ></component>
        </q-field>
      </div>
    </div>
    <div class="irm-buttons">
      <q-btn
        color="primary"
        @click="send(true)"
        :label="$t('label.cancelInputRequest')"
      >
        <q-tooltip :delay="200" anchor="top middle" self="bottom middle" :offset="[10, 10]">
          {{ $t('tooltips.cancelInputRequest') }}
        </q-tooltip>
      </q-btn>
      <q-btn
        color="mc-main"
        @click="send(false)"
        :label="$t('label.submitInputRequest')"
      >
        <q-tooltip :delay="200" anchor="top middle" self="bottom middle" :offset="[10, 10]">
          {{ $t('tooltips.submitInputRequest') }}
        </q-tooltip>
      </q-btn>
    </div>
  </q-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TextInputRequest from 'components/form/TextField.vue';
import NumberInputRequest from 'components/form/NumberField.vue';
import BooleanInputRequest from 'components/form/BooleanField.vue';
import { capitalizeFirstLetter } from 'shared/Utils';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';

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
  },
  methods: {
    ...mapActions('view', [
      'removeInputRequest',
    ]),
    send(onlyDefault = false) {
      this.inputRequests.forEach((request) => {
        const values = request.fields.reduce((map, obj) => {
          if (!onlyDefault) {
            const value = this.formData[this.getFieldId(obj, request.requestId)];
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
        this.removeInputRequest(request.requestId);
      });
    },
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value);
    },
    capitalizeFirstLetter(string) {
      return capitalizeFirstLetter(string);
    },
    resetFields() {
      this.formData = {};
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
  },
};
</script>

<style lang="stylus">
  @import '~variables';

  .irm-container
    padding 20px
    width 80vh
    h3, h4
      margin 0 0 10px 0
      padding 0
      color $main-control-main-color
    h3
      line-height 1.4em
      font-size 1.4em
    h4
      line-height 1.2em
      font-size 1.2em
    .irm-group
      margin 10px 0
    label
      font-style italic
    .irm-buttons
      width 100%
      text-align right
      .q-btn
        margin-right 10px
</style>

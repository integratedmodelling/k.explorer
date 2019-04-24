<template>
  <q-modal
    v-model="hasInputRequests"
    :no-esc-dismiss="true"
    :no-backdrop-dismiss="true"
    :content-classes="['irm-container']"
  >
    <h3>{{ $t('label.inputRequest') }}</h3>
    <div v-for="(request) in inputRequests" :key="request.requestId" class="irm-group">
      <h4>{{ request.sectionTitle !== null ? request.sectionTitle: $t('label.noInputSectionTitle') }}</h4>
      <p>{{ request.description }}</p>
      <div v-for="field in request.fields" :key="field.id" class="irm-field">
        <q-field
          :label="field.label !== null ? field.label : field.id"
          :helper="field.description"
        >
          <component
            :name="`${request.requestId}-${field.functionId}/${field.id}`"
            :is="`${capitalizeFirstLetter(field.type)}InputRequest`"
            :initialValue="field.initialValue"
            :values="field.values"
            :range="field.range"
            :numericPrecision="field.numericPrecision"
            :regexp="field.regexp"
            @change="updateForm(`${request.requestId}-${field.functionId}/${field.id}`, $event)"
          ></component>
        </q-field>
      </div>
    </div>
    <div class="irm-buttons">
      <q-btn
        color="mc-main"
        @click="send(false)"
        :label="$t('label.sendInputRequest')"
      ></q-btn>
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
            const value = this.formData[`${request.requestId}-${obj.functionId}/${obj.id}`];
            if (typeof value === 'undefined' || value === null || value === '') {
              map[`${obj.functionId}/${obj.id}`] = obj.initialValue;
            } else {
              map[`${obj.functionId}/${obj.id}`] = value.toString();
            }
          } else {
            map[`${obj.functionId}/${obj.id}`] = obj.initialValue;
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

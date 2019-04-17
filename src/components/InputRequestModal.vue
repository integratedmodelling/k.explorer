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
      <div v-for="(field, index) in request.fields" :key="field.id" class="irm-field">
        <component
          :key="index"
          :is="`${capitalizeFirstLetter(field.type)}InputRequest`"
          :name="field.id"
          :initialValue="field.initialValue"
          @input="updateForm(field.id, $event)"
          v-bind="field"
        ></component>
      </div>
    </div>
    <div class="irm-buttons">
      <q-btn
        color="mc-yellow"
        @click="sendDefault"
        :label="$t('label.sendDefaultInputRequest')"
      ></q-btn>
      <q-btn
        color="mc-main"
        @click="send"
        :label="$t('label.sendInputRequest')"
      ></q-btn>
    </div>
  </q-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TextInputRequest from 'components/form/TextField.vue';
import { capitalizeFirstLetter } from 'shared/Utils';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';

export default {
  name: 'InputRequestModal',
  components: {
    TextInputRequest,
  },
  data() {
    return {
      formData: {},
    };
  },
  computed: {
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
    send() {
      this.removeInputRequest(null);
    },
    sendDefault() {
      this.inputRequests.forEach((request) => {
        const values = request.fields.reduce((map, obj) => {
          map[obj.id] = obj.initialValue;
          return map;
        }, {});
        this.sendStompMessage(MESSAGES_BUILDERS.USER_INPUT_RESPONSE({
          requestId: request.requestId,
          values,
        }, this.session).body);
        this.removeInputRequest(request.requestId);
      });
    },
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value);
      this.$emit('input', this.formData);
    },
    capitalizeFirstLetter(string) {
      return capitalizeFirstLetter(string);
    },
  },
  watch: {
    inputRequests() {
      this.inputRequests.forEach((ir) => {
        ir.fields.forEach((f) => {
          this.updateForm(f.id, f.initialValue);
        });
      });
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

<template>
  <q-input
    color="mc-main"
    type="text"
    v-model="value"
    :placeholder="initialValue"
    :name="name"
    :error="hasError"
    :clearable="true"
    :clear-value="initialValue"
    @input="emitInput"
  ></q-input>
</template>
<script>
export default {
  name: 'TextField',
  props: {
    initialValue: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      value: '',
    };
  },
  computed: {
    hasError() {
      if (this.value !== '') {
        // check range
        return false;
      }
      return false;
    },
  },
  methods: {
    emitInput(event) {
      this.$emit('change', event);
    },
  },
};
</script>
<style>
</style>

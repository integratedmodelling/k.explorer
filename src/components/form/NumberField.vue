<template>
  <q-input
    color="mc-main"
    type="number"
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
  name: 'NumberField',
  props: {
    initialValue: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    numericPrecision: {
      type: Number,
      default: 5,
    },
    range: {
      type: String,
    },
  },
  data() {
    return {
      value: '',
    };
  },
  computed: {
    hasError() {
      if (this.range !== '') {
        // check range
        return false;
      }
      return false;
    },
  },
  methods: {
    emitInput(event) {
      this.fitValue();
      this.$nextTick(() => {
        this.$emit('change', event);
      });
    },
    fitValue() {
      if (this.numericPrecision !== 0) {
        this.value = this.value.toFixed(this.numericPrecision);
      }
    },
  },
};
</script>
<style>
</style>

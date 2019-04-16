<template>
  <q-checkbox
    color="mc-main"
    v-model="checked"
    :name="name"
    @input="emitInput"
  ></q-checkbox>
</template>
<script>
export default {
  name: 'BooleanField',
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
      checked: this.initialValue === 'true',
    };
  },
  methods: {
    emitInput(event) {
      this.$nextTick(() => {
        this.$emit('change', event);
      });
    },
  },
};
</script>
<style>
</style>

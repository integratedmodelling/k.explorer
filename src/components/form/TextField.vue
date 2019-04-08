<template>
  <div>
    <label :for="name">{{ description }}</label>
    <q-input
      color="mc-main"
      :placeholder="initialValue"
      :name="name"
      type="text"
      value=""
    />
  </div>
</template>
<script>
export default {
  name: 'TextField',
  props: ['initialValue', 'description', 'name'],
};
</script>
<style>
</style>

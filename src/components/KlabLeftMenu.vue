<template>
  <div id="lm-container" class="full-height">
    <main-actions-buttons orientation="vertical"></main-actions-buttons>
  </div>
</template>

<script>
import MainActionsButtons from 'components/MainActionsButtons';

export default {
  name: 'KlabLeftMenu',
  data() {
    return {};
  },
  components: {
    MainActionsButtons,
  },
};
</script>

<style  lang="stylus">
  #lm-container
    width 72px

    background-color rgba(35, 35, 35, .8)

</style>

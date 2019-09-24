<template>
  <div class="kp-container">
    <q-carousel
      class="text-white"
      infinite
      arrows
      color="white"
    >
      <q-carousel-slide
        class="flex flex-center"
      >
        <div class="q-display-3">
          <div class="kp-slide-title">Welcome to k.Explorer: the easiest way to navigate ARIES</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        class="flex flex-center"
        :class="`bg-${colors[2]}`"
      >
        <div class="q-display-3">Slide 2</div>
      </q-carousel-slide>
      <q-carousel-slide
        class="flex flex-center"
        :class="`bg-${colors[3]}`"
      >
        <div class="q-display-3">Slide 3</div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
export default {
  name: 'KlabPresentation',
  data() {
    return {
      colors: [
        'primary',
        'secondary',
        'yellow',
        'red',
        'orange',
        'grey-2',
      ],
      example: false,
    };
  },
  computed: {},
  methods: {},
  watch: {},
};
</script>

<style lang="stylus">
  @import '~variables'

  .kp-slide-title
    font-size 1.2em
    color $main-control-green
    h1
      color white
</style>

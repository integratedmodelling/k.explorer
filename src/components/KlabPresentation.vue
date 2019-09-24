<template>
  <div class="kp-container">
    <q-carousel
      class="text-white"
      infinite
      autoplay
      arrows
      color="white"
    >
      <q-carousel-slide
        class="flex flex-center"
        :class="`bg-${colors[1]}`"
      >
        <div class="q-display-3">Slide 1</div>
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

<style>
</style>

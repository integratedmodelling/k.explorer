<template>
  <div class="st-container" :class="{ marquee: needMarquee < 0, 'hover-active': hoverActive }">
    <div ref="st-text" class="st-text" :class="{ 'st-accentuate': accentuate }" :style="{ left: `${needMarquee < 0 ? needMarquee : 0}px`, 'animation-duration': `${animationDuration}s` }">
      {{ text }}
    </div>

    <div class="st-edges" :style="{ 'background-color': spinnerColor.color  }"></div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ScrollingText',
  props: {
    hoverActive: {
      type: Boolean,
      default: false,
    },
    initialText: {
      type: String,
      default: '',
    },
    // duration of animation in seconds
    duration: {
      type: Number,
      default: 10,
    },
    accentuate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      needMarquee: 0,
      animationDuration: this.duration,
      text: this.initialText,
      edgeBgGradient: '',
    };
  },
  computed: {
    ...mapGetters('view', [
      'spinnerColor',
    ]),
  },
  methods: {
    isNeededMarquee() {
      const textDiv = this.$refs['st-text']; // need to be selected each time because it change
      if (typeof textDiv === 'undefined') {
        return 0;
      }
      return textDiv.offsetWidth - textDiv.scrollWidth;
    },
    changeText(text, animationDuration = null) {
      this.needMarquee = 0;
      if (text !== this.text) {
        this.text = text === null ? '' : text;
        this.$nextTick(() => {
          if (animationDuration !== null) {
            this.animationDuration = animationDuration;
          }
          this.needMarquee = this.isNeededMarquee(this.ref);
        });
      }
    },
    getBGColor(color, alpha) {
      return `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b}, ${alpha})`;
    },
    getEdgeGradient() {
      return `linear-gradient(to right,
        ${this.getBGColor(this.spinnerColor, 1)} 0,
        ${this.getBGColor(this.spinnerColor, 0)} 5%,
        ${this.getBGColor(this.spinnerColor, 0)} 95%,
        ${this.getBGColor(this.spinnerColor, 1)} 100%)`;
    },
  },
  watch: {
    spinnerColor() {
      this.edgeBgGradient = this.getEdgeGradient();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.needMarquee = this.isNeededMarquee(this.ref);
    });
    this.edgeBgGradient = this.getEdgeGradient();
  },
};
</script>

<style lang="stylus">
  /* container with marquee */
  .st-container.marquee
    /* if activate on hover */
    &.hover-active
      /* on hover animation and display edges */
      &:hover
        .st-text
          animation klab-marquee alternate linear infinite
        .st-edges
          opacity 1
       /* not hover, reset text position and ellipsis */
      &:not(:hover)
        .st-text
          left 0 !important
          width 100%
          text-overflow ellipsis
    /* if is activate and stopped when not hover */
    &:not(.hover-active)
      .st-text
        animation klab-marquee alternate linear infinite
      &:hover
        .st-text
          animation-play-state paused
        &:not(.active) .st-accentuate
          color rgba(0,0,0, 0.8)
          cursor default
      &:not(:hover)
        .st-edges
          opacity 1

    .st-text
      position relative
      display inline-block
      overflow hidden

  .st-edges
    left -5px
    right 0
    top 0
    bottom 0
    position absolute
    height 100%
    opacity 0
    mask-image: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0)), linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0));
    mask-size: 5% 100%;
    mask-repeat: no-repeat;
    mask-position: left center, right center;
    transition background-color 0.8s, opacity 0.8s

  @keyframes klab-marquee
    from
      left 0px
</style>

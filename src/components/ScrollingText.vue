<template>
  <div class="st-container" :class="{ marquee: needMarquee < 0, 'hover-active': hoverActive }">
    <div ref="st-text" class="st-text" :class="{ 'st-accentuate': accentuate }" :style="{ left: `${needMarquee < 0 ? needMarquee : 0}px`, 'animation-duration': `${animationDuration}s` }">
      {{ text }}
    </div>
    <transition name="st-edges-animation">
      <div v-if="needMarquee < 0" class="st-edges" :style="{ background: `linear-gradient(to right, ${getBGColor(1)} 0, ${getBGColor(0)} 5%, ${getBGColor(0)} 95%, ${getBGColor(1)} 100%)` }"></div>
    </transition>
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
    getBGColor(alpha) {
      return `rgba(${this.spinnerColor.rgb.r},${this.spinnerColor.rgb.g},${this.spinnerColor.rgb.b}, ${alpha})`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.needMarquee = this.isNeededMarquee(this.ref);
    });
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
          display block
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
          display block

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
      display none

  /* animation and transition */
  .st-edges-animation-enter-active
    transition opacity 1.2s

  .st-edges-animation-enter
  .st-edges-animation-leave-to
    opacity 0

  @keyframes klab-marquee
    from
      left 0px
</style>

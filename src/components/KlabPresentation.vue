<template>
  <q-modal
    v-model="showHelp"
    id="modal-show-help"
    :content-classes="['kp-help-container','q-pa-xl']"
  >
    <div class="full-height">
      <div class="kp-help-content full-height">
        <q-carousel
          class="kl-main-carousel full-height"
          ref="kl-main-carousel"
          color="white"
          :quick-nav="true"
          @slide-trigger="initSecondarySlider"
        >
          <q-carousel-slide
            class="kl-main-slide full-height"
            v-for="(slide, index) in slides"
            :key="`kl-pri-${index}`"
          >
            <div class="kl-main-title" v-html="slide.title"></div>
            <div class="kl-main-content">
              <q-carousel
                class="kl-secondary-carousel full-height"
                ref="kl-secondary-carousel"
                v-if="slide.slides.length > 0"
                :autoplay="slide.duration ? slide.duration : true"
                infinite
                :animation="false"
              >
                <q-carousel-slide
                  class="kl-secondary-slide full-height"
                  v-for="(s, index) in slide.slides"
                  :key="`kl-sec-${index}`"
                >
                  <div
                    class="kl-secondary-content"
                    :style="{ 'background-image': `url(statics/help/${s.image})` }"
                  >
                  </div>
                  <div class="absolute-bottom kl-secondary-caption">
                    <div class="q-display-1" v-html="s.text"></div>
                  </div>
                </q-carousel-slide>
              </q-carousel>
              <div class="kl-primary-image" :style="{ 'background-image': `url(statics/help/${slide.image})` }" v-else>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="kp-btn-container">
        <q-checkbox
          v-model="remember"
          :keep-color="true"
          color="mc-main"
          :label="$t('label.rememberDecision')"
          class="rmd-checkbox"
          :left-label="true"
        ></q-checkbox>
      </div>
      <q-btn
        icon="mdi-close"
        class="kp-icon-close-popover"
        @click="hideHelp"
        color="grey-8"
        size="xs"
        flat
        round
      ></q-btn>
    </div>
  </q-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import { Cookies } from 'quasar';
import { WEB_CONSTANTS } from 'shared/Constants';

export default {
  name: 'KlabPresentation',
  data() {
    return {
      slides: [
        {
          title: 'First with a link to <span class="internal-link" rel="0-0">first</span>, <span class="internal-link" rel="0-1">second</span> and <span class="internal-link" rel="0-2">third</span>',
          slides: [{
            image: 'slide1.1.jpg',
            text: 'This is the first first slide',
          }, {
            image: 'slide1.2.jpg',
            text: 'This is the second first slide',
          }, {
            image: 'slide1.3.jpg',
            text: 'This is the third first slide',
          }],
          duration: 4000,
        }, {
          title: 'Second',
          slides: [{
            image: 'slide2.1.jpg',
            text: 'This is the second first slide',
          }, {
            image: 'slide2.2.jpg',
            text: 'This is the second second slide',
          }],
          duration: 4000,
        }, {
          title: 'Third',
          slides: [],
          image: 'slide3.jpg',
        },
      ],
      needHelp: false,
      remember: false,
    };
  },
  computed: {
    ...mapGetters('stomp', [
      'connectionUp',
    ]),
    ...mapGetters('view', [
      'isInModalMode',
    ]),
    waitingGeolocation() {
      return this.$store.state.view.waitingGeolocation;
    },
    showHelp: {
      get() {
        return this.connectionUp && !this.waitingGeolocation && this.needHelp && !this.isInModalMode;
      },
      set(needHelp) {
        this.needHelp = needHelp;
      },
    },
  },
  methods: {
    hideHelp() {
      if (this.remember && !Cookies.has(WEB_CONSTANTS.COOKIE_HELP_ON_START)) {
        Cookies.set(WEB_CONSTANTS.COOKIE_HELP_ON_START, false, {
          expires: 30,
          path: '/',
        });
      }
      this.needHelp = false;
    },
    initSecondarySlider(oldIndex, newIndex) {
      if (typeof this.$refs['kl-secondary-carousel'][newIndex] !== 'undefined') {
        this.$refs['kl-secondary-carousel'][newIndex].goToSlide(0);
      }
    },
    goToMain(slide, index) {
      let carousel;
      if (slide === 'main') {
        carousel = this.$refs['kl-main-carousel'];
      } else {
        carousel = this.$refs['kl-secondary-carousel'][slide];
      }
      if (typeof carousel !== 'undefined') {
        carousel.goToSlide(index);
      }
    },
  },
  watch: {},
  mounted() {
    this.needHelp = !Cookies.has(WEB_CONSTANTS.COOKIE_HELP_ON_START);
    this.remember = !this.needHelp;
    this.$el.querySelectorAll('.internal-link').forEach((link) => {
      const [slide, index] = link.getAttribute('rel').split('-');
      link.addEventListener('click', () => {
        this.goToMain(slide, index);
      });
    });
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .kp-help-container
    width 60vw
    height 80vh
    // color rgba(0,0,0,0.7)
    position relative
    .kp-icon-close-popover
      position absolute
      right 5px
      top 4px
    .kp-help-content
      position relative
      background-color white
      .kl-main-carousel
        .kl-main-slide
          height 100%
          padding 0
          display flex
          flex-direction column
          .kl-main-title
            height 2em
            font-size 2em
            line-height 2em
            vertical-align middle
            color white
            text-align center
            background-color alpha($main-control-main-color, 85%)
            margin-bottom 10px
          .kl-main-content
            flex auto
            .kl-secondary-carousel
              .kl-secondary-slide
                padding 0
            .kl-secondary-caption
              text-align center
              padding 12px
              color $grey-4
              bottom 38px
              background-color alpha($main-control-main-color, 85%)
            .kl-primary-image
            .kl-secondary-content
              text-align center
              background-repeat no-repeat
              background-size contain
              background-position center
              height calc(100% - 40px)
        .q-carousel-quick-nav
          background-color alpha($main-control-main-color, 85%)
    .rmd-checkbox
      position absolute
      right 44px
      bottom 25px
      font-size 10px
      width 100%
</style>

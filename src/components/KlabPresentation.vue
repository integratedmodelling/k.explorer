<template>
  <q-modal
    v-model="showHelp"
    id="modal-show-help"
    :content-classes="['kp-help-container','q-pa-xl']"
  >
    <div class="full-height">
      <div class="kp-help-content full-height">
        <q-carousel
          class="kl-carousel full-height"
          ref="kl-carousel"
          color="white"
          :quick-nav="true"
          @slide-trigger="initStack"
        >
          <q-carousel-slide
            class="kl-slide full-height"
            v-for="(slide, slideIndex) in slides"
            :key="`kl-slide-${slideIndex}`"
          >
            <div class="kl-main-title" v-html="slide.title"></div>
            <div class="kl-main-content">
              <klab-stack
                v-if="slide.stack.layers && slide.stack.layers.length > 0"
                :owner-index="slideIndex"
                :layers="slide.stack.layers"
                :animated="slide.stack.animated"
                :duration="slide.stack.duration"
                :autostart="slide.stack.autostart || slideIndex === 0"
                :infinite="slide.stack.infinite"
                ref="kl-stack"
              ></klab-stack>
              <div class="kl-main-image" :style="{ 'background-image': `url(statics/help/${slide.image})` }" v-else>
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
import KlabStack from 'components/custom/KlabStack.vue';

export default {
  name: 'KlabPresentation',
  components: { KlabStack },
  data() {
    return {
      slides: [
        {
          title: 'First with a link to <span class="internal-link" rel="0-0">first</span>, <span class="internal-link" rel="0-1">second</span> and <span class="internal-link" rel="0-2">third</span>',
          stack: {
            layers: [{
              image: 'slide1.1.jpg',
              imageAlign: 'left',
              title: 'Loren',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta, nibh eu laoreet dignissim, eros urna accumsan velit, nec ullamcorper lectus massa id ipsum. Donec mattis metus porta metus dapibus, a consectetur mi aliquet. Mauris risus elit, pharetra nec lectus vel, faucibus rhoncus elit. Suspendisse ac ex et sapien fringilla vehicula. In consequat tellus eu lorem scelerisque sodales. In erat erat, fermentum semper pretium sit amet, sagittis id nisi.',
              textPosition: 'right',
              textWidth: '200px',
              duration: 1000,
            }, {
              image: 'slide1.2.jpg',
              imageAlign: 'right',
              title: 'Ipsum',
              text: 'Vestibulum pellentesque aliquet mi quis lacinia. Nam dignissim ex efficitur, ultrices lorem vitae, dapibus nisi. Duis vitae mi et ipsum finibus vestibulum ut et libero. Proin fermentum elit a massa feugiat, vitae aliquet nulla dignissim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
              textPosition: 'left',
              textAlign: 'center',
              textWidth: '15%',
              duration: 5000,
            }, {
              image: 'slide1.3.jpg',
              imageAlign: 'center',
              text: 'Aliquam ac mattis metus. Nulla pulvinar finibus urna nec suscipit. Duis non sem interdum, iaculis erat at, lacinia tortor. Nullam quis nulla et est pulvinar sollicitudin vel quis magna. Suspendisse sed urna odio. Mauris a pretium ante. Etiam pulvinar ipsum nec lectus tincidunt malesuada.',
              textPosition: 'bottom',
              duration: 2000,
            }],
            duration: 10000,
            animated: true,
            infinite: true,
          },
        }, {
          title: 'Second',
          stack: {
            layers: [{
              image: 'slide2.1.jpg',
              text: 'This is the second first layer',
            }, {
              image: 'slide2.2.jpg',
              text: 'This is the second second layer',
            }],
            duration: 2000,
            animated: false,
          },
        }, {
          title: 'Third',
          stack: [],
          image: 'slide3.jpg',
        },
      ],
      needHelp: false,
      remember: false,
      topLayer: [],
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
    initStack(oldIndex, newIndex) {
      const oldStack = this.$refs['kl-stack'][oldIndex];
      if (typeof oldStack !== 'undefined') {
        oldStack.stopStack();
      }
      const newStack = this.$refs['kl-stack'][newIndex];
      if (typeof newStack !== 'undefined') {
        newStack.initStack(0);
      }
    },
    goTo(slide, index) {
      if (slide === 'main') {
        const carousel = this.$refs['kl-carousel'];
        if (typeof carousel !== 'undefined') {
          carousel.goToSlide(index);
        }
      } else {
        const stack = this.$refs['kl-stack'][slide];
        if (typeof stack !== 'undefined') {
          stack.goTo(index);
        }
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
        this.goTo(parseInt(slide, 10), parseInt(index, 10));
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
    .kl-carousel
      .kl-slide
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
        .kl-main-image
          text-align center
          background-repeat no-repeat
          background-size contain
          background-position center
          height calc(100% - 40px)
    .internal-link
      cursor pointer
      &:hover
        font-weight bolde
    .q-carousel-quick-nav
      background-color alpha($main-control-main-color, 85%)
    .rmd-checkbox
      position absolute
      right 44px
      bottom 25px
      font-size 10px
      width 100%
</style>

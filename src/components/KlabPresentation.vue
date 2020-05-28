<template>
  <div class="modal fullscreen" id="modal-show-help" v-show="showHelp">
    <div class="modal-backdrop absolute-full"></div>
    <div
      class="kp-help-container"
      ref="kp-help-container"
      :style="{
         width: `${modalSize.width}px`,
         height: `${modalSize.height}px`,
         transform: `translate(-50%, -50%) scale(${scale}, ${scale}) !important`}">
      <div class="kp-help-inner" ref="kp-help-inner">
        <div class="kp-help-content full-height">
          <div class="kp-help-titlebar">
            <div
              class="kp-link"
              v-for="(presentation, index) in presentations"
              :key="`kp-pres-${index}`"
              :id="`kp-pres-${index}`"
              :class="{ 'kp-link-current': index === activeSectionIndex }"
              @click="index === activeSectionIndex ? false : loadPresentation(index)"
            >
              <span>{{ presentation.linkTitle }}</span>
            </div>
          </div>
          <q-carousel
            class="kp-carousel full-height"
            ref="kp-carousel"
            color="white"
            no-swipe
            @slide-trigger="initStack"
            v-if="!presentationBlocked"
          >
            <q-carousel-slide
              class="kp-slide full-height"
              v-for="(slide, slideIndex) in activePresentation"
              :key="`kp-slide-${slideIndex}`"
            >
              <div class="kp-main-content">
                <klab-stack
                  v-if="slide.stack.layers && slide.stack.layers.length > 0"
                  :presentation="presentations[activeSectionIndex]"
                  :owner-index="slideIndex"
                  :maxOwnerIndex="activePresentation.length"
                  :stack="slide.stack"
                  :on-top="currentSlide === slideIndex"
                  ref="kp-stack"
                  @stackend="stackEnd"
                ></klab-stack>
                <div v-else>No slides</div>
                <div class="kp-main-title" v-if='slide.title' v-html="slide.title"></div>
              </div>
            </q-carousel-slide>
            <!--
            <q-carousel-control slot="control-nav" slot-scope="carousel" :offset="[8, 5]" position="bottom-right">
              <q-btn
                @click="carousel.previous"
                :disable="!carousel.canGoToPrevious"
                color="mc-main" text-color="white"
                :label="$t('label.appPrevious')"
                flat dense
                class="q-mr-sm"
              ></q-btn>
              <q-btn
                @click="carousel.next"
                :disable="!carousel.canGoToNext"
                color="mc-main"
                text-color="white"
                :label="$t('label.appNext')"
                flat dense
              ></q-btn>
            </q-carousel-control>
            -->
          </q-carousel>
        </div>
        <div class="kp-nav-tooltip" :class="{ visible: tooltipTitle !== '' }" v-html="tooltipTitle"></div>
        <div class="kp-navigation">
          <div class="kp-nav-container">
            <div
              v-for="(slide, slideIndex) in activePresentation"
              :key="`kp-nav-${slideIndex}`"
              class="kp-navnumber-container"
              @click="goTo(slideIndex, 0)"
              @mouseover="showTitle(slide.title)"
              @mouseleave="showTitle('')"
            >
              <div
                class="kp-nav-number"
                :class="{ 'kp-nav-current': currentSlide === slideIndex }"
              >{{ slideIndex + 1 }}</div>
            </div>
          </div>
        </div>
        <div class="kp-btn-container">
          <q-checkbox
            v-model="remember"
            :keep-color="true"
            color="grey-8"
            :label="$t('label.rememberDecision')"
            class="kp-checkbox"
            :left-label="true"
          ></q-checkbox>
        </div>
        <q-btn
          v-show="scale !== 1"
          icon="mdi-refresh"
          class="kp-icon-refresh-size"
          @click="refreshSize"
          color="mc-main"
          size="md"
          :title="$t('label.refreshSize')"
          round
          flat
        ></q-btn>
        <q-btn
          icon="mdi-close-circle-outline"
          class="kp-icon-close-popover"
          @click="hideHelp"
          color="grey-8"
          size="md"
          :title="$t('label.appClose')"
          round
          flat
        ></q-btn>
      </div>
      <div class="kp-help-inner" :class="{ 'modal-backdrop': !presentationBlocked && waitForPresentation }">
        <div class=" kp-no-presentation" v-if="presentationBlocked" >
          <div class="fixed-center text-center">
            <div class="kp-np-content" v-html="$t('messages.presentationBlocked')"></div>
            <q-btn flat no-caps icon="mdi-refresh" @click="initPresentation" :label="$t('label.appRetry')"></q-btn>
          </div>
        </div>
        <q-spinner v-else-if="waitForPresentation" class="fixed-center" color="mc-yellow" :size="40"></q-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Cookies } from 'quasar';
import { WEB_CONSTANTS, CUSTOM_EVENTS, HELP_CONSTANTS } from 'shared/Constants';
import KlabStack from 'components/custom/KlabStack.vue';
// import { axiosInstance } from 'plugins/axios';
// import slides from 'shared/Slides.js';
// import Vue from 'vue';
// import VueJsonp from 'vue-jsonp';
import jsonp from 'jsonp';

// Vue.use(VueJsonp);
// const { height, width } = dom;

export default {
  name: 'KlabPresentation',
  components: { KlabStack },
  data() {
    return {
      presentations: [],
      presentationsLoading: false,
      activeSectionIndex: -1,
      needHelp: false,
      remember: false,
      topLayer: [],
      modal: false,
      carouselEl: undefined,
      initialSize: undefined,
      scale: 1,
      tooltipTitle: '',
      activePresentation: [],
      url: undefined,
      presentationBlocked: null,
    };
  },
  computed: {
    ...mapGetters('stomp', [
      'connectionUp',
    ]),
    ...mapGetters('view', [
      'isInModalMode',
      'modalSize',
    ]),
    waitForPresentation() {
      return typeof this.initialSize === 'undefined' || this.activeSectionIndex === -1;
    },
    helpBaseUrl() {
      return this.$store.state.view.helpBaseUrl;
    },
    currentSlide() {
      return this.carouselEl ? this.carouselEl.slide : -1;
    },
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
    ...mapActions('view', [
      'setModalSize',
    ]),
    hideHelp() {
      this.needHelp = false;
    },
    initStack(oldIndex, newIndex) {
      const oldStack = this.$refs['kp-stack'][oldIndex];
      if (typeof oldStack !== 'undefined') {
        oldStack.stopStack();
      }
      const newStack = this.$refs['kp-stack'][newIndex];
      if (typeof newStack !== 'undefined') {
        newStack.initStack();
      }
    },
    goTo(slide, index) {
      const carousel = this.$refs['kp-carousel'];
      if (typeof carousel !== 'undefined') {
        carousel.goToSlide(slide);
      }
      this.$nextTick(() => {
        const stack = this.$refs['kp-stack'][slide];
        if (typeof stack !== 'undefined') {
          stack.goTo(index);
        }
      });
    },
    helpNeededEvent() {
      this.needHelp = true;
    },
    stackEnd({ index, direction }) {
      if (direction > 0) {
        if (index < this.activePresentation.length - 1) {
          this.goTo(index + 1, 0);
        } else {
          this.goTo(0, 0);
        }
      } else if (direction < 0 && index > 0) {
        this.goTo(index - 1, 'last');
      }
    },
    refreshSize() {
      this.initialSize = undefined;
      this.onResize();
    },
    onResize() {
      const self = this;
      setTimeout(() => {
        if (typeof self.initialSize === 'undefined') {
          const initWidth = window.innerWidth;
          const initHeight = window.innerHeight;
          self.initialSize = { width: initWidth, height: initHeight };
        }
        self.scale = Math.min(
          window.innerWidth / self.initialSize.width,
          window.innerHeight / self.initialSize.height,
        );
        if (self.scale === 1) {
          const width = window.innerWidth * HELP_CONSTANTS.DEFAULT_WIDTH_PERCENTAGE / 100;
          const calcHeight = width / HELP_CONSTANTS.DEFAULT_PROPORTIONS.width * HELP_CONSTANTS.DEFAULT_PROPORTIONS.height;
          const height = window.innerHeight * HELP_CONSTANTS.DEFAULT_HEIGHT_PERCENTAGE / 100;
          const calcWidth = height / HELP_CONSTANTS.DEFAULT_PROPORTIONS.height * HELP_CONSTANTS.DEFAULT_PROPORTIONS.width;
          if (width < calcWidth) {
            self.setModalSize({ width, height: calcHeight });
          } else {
            self.setModalSize({ width: calcWidth, height });
          }
          // } else {
          //   this.initialSize = undefined;
          //   this.onResize();
        }
      }, 500);
    },
    showTitle(title) {
      this.tooltipTitle = title;
    },
    loadPresentation(presentationIndex) {
      if (this.presentationBlocked) {
        return;
      }
      if (this.presentations[presentationIndex]) {
        this.activePresentation = this.presentations[presentationIndex].slides;
        this.activeSectionIndex = presentationIndex;
      }
      this.$nextTick(() => {
        this.carouselEl = this.$refs['kp-carousel'];
        this.carouselEl.goToSlide(0);
        this.$el.querySelectorAll('.internal-link').forEach((link) => {
          const [slide, index] = link.getAttribute('rel').split('-');
          link.addEventListener('click', () => {
            this.goTo(parseInt(slide, 10), parseInt(index, 10));
          });
        });
        this.onResize();
      });
    },
    initPresentation() {
      const self = this;
      this.presentationsLoading = true;
      try {
        jsonp(`${this.helpBaseUrl}/index.php`, { param: 'callback', timeout: 5000 }, (error, data) => {
          if (error) {
            console.error(`Error loading presentation: ${error.message}`);
            this.presentationsLoading = false;
            this.presentationBlocked = error;
          } else {
            this.presentationBlocked = null;
            const config = data;
            if (config && config.length > 0) {
              let counter = 0;
              config.forEach((sec, index) => {
                counter += 1;
                jsonp(`${this.helpBaseUrl}/index.php?sec=${sec.id}`, { param: 'callback' }, (sectionError, sectionData) => {
                  if (sectionError) {
                    console.error(sectionError.message);
                  } else {
                    self.presentations.push({
                      id: sec.id,
                      baseFolder: sec.baseFolder,
                      linkTitle: sec.name,
                      linkDescription: sec.description,
                      slides: sectionData,
                      index,
                    });
                  }
                  counter -= 1;
                  if (counter === 0) {
                    this.presentationsLoading = false;
                    this.presentations.sort((p1, p2) => p1.index - p2.index);
                  }
                });
              });
            }
          }
        });
      } catch (error) {
        console.error(`Error loading presentation: ${error.message}`);
        this.presentationsLoading = false;
        this.presentationBlocked = error;
      }
    },
  },
  watch: {
    showHelp(newValue) {
      this.$store.state.view.helpShown = newValue;
      if (newValue && !this.presentationsLoading) {
        this.loadPresentation(0);
      }
    },
    presentationsLoading(newValue) {
      if (!newValue && this.showHelp) {
        this.loadPresentation(0);
      }
    },
    remember(newValue) {
      if (newValue) {
        Cookies.set(WEB_CONSTANTS.COOKIE_HELP_ON_START, false, {
          expires: 30,
          path: '/',
        });
      } else {
        Cookies.remove(WEB_CONSTANTS.COOKIE_HELP_ON_START);
      }
    },
  },
  created() {
    this.initPresentation();
  },
  mounted() {
    // const self = this;
    /*
    this.$jsonp('http://www.integratedmodelling.org/downloads/slides.js', { callbackName: 'slides' }).then((data) => {
      self.slides = data;
    }).catch((err) => {
      console.error(err);
    });
    */
    // load configuration and donwnload content

    this.needHelp = !Cookies.has(WEB_CONSTANTS.COOKIE_HELP_ON_START);
    this.remember = !this.needHelp;
    this.$eventBus.$on(CUSTOM_EVENTS.NEED_HELP, this.helpNeededEvent);
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.NEED_HELP, this.helpNeededEvent);
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .kp-help-container
    position: relative;
    top 50%
    left 50%
    color $grey-8
    overflow hidden
    box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
    transition: all 0.2s ease-in-out;
    border-radius: 3px;
    min-width 320px
    min-height 240px
    &:before
      display block
      content "";
      width 100%
      height 100%
      padding-top 2 / 3 * 100

    > .kp-help-inner
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      .kp-no-presentation
        font-weight bold
        position relative
        .kp-refresh-btn
          position relative
        .klab-small
          font-size smaller

    .kp-help-content
      position relative
      background-color white
    .kp-help-titlebar
      position absolute
      width 100%
      height 25px
      padding 8px 0 0 20px
      z-index: 100000;
      .kp-link
        font-size 11px
        color $grey-8
        cursor pointer
        float left
        padding 0 10px 0 0
        &:hover:not(.kp-link-current)
          text-decoration underline
          color $main-control-main-color
      .kp-link-current
        cursor default
        text-decoration underline

    .kp-carousel
      .kp-slide
        padding 0
        display flex
        flex-direction column
      .kp-main-content
        flex auto
        .kp-main-image
          text-align center
          background-repeat no-repeat
          background-size contain
          background-position center
          height calc(100% - 40px)
    .kp-main-title
    .kp-nav-tooltip
      position absolute
      bottom 0
      vertical-align middle
      font-size 20px
      line-height 50px
      height 50px
      text-align center
      width 80%
      margin-left 10%
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    .kp-nav-tooltip
      background-color white
      transition opacity .3s
      opacity 0
      &.visible
        opacity 1
    .kp-navigation
      position absolute
      bottom 0
      padding 10px 10px 10px 15px
      vertical-align middle
      // width 100%
      // border-top 1px solid $grey-4
      background-color white
      .kp-navnumber-container
        padding-left 3px
        position relative
        float left
        &:hover
          .kp-nav-number
          .kp-nav-current
            opacity 1
            background-color alpha($grey-8, 0.7)
      .kp-nav-number
        height 30px
        width 30px
        line-height 30px
        vertical-align middle
        color white
        text-align center
        padding 0
        cursor pointer
        border-radius 20px
        background-color alpha($grey-8, 0.4)
        opacity .7
        z-index 10000
        &:hover
        &.kp-nav-current
          opacity 1
          background-color alpha($grey-8, 0.7)

    .internal-link
      cursor pointer
      &:hover
        color $main-control-yellow

    .kp-icon-close-popover
    .kp-icon-refresh-size
      position absolute
      top 1px
      right 2px
      width: 22px;
      height: 22px;
      z-index 200000
      .q-focus-helper
        opacity 0
      &:hover .mdi-close-circle-outline:before
        content '\F159'
    .kp-icon-refresh-size
      right 24px
      &:hover
        color $main-control-main-color !important
    .kp-checkbox
      position absolute
      right 20px
      bottom 10px
      font-size 10px

</style>

// Configuration for your app
const path = require('path');

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios',
      'vue-i18n',
      'vuex-stomp',
      // 'q-test',
    ],
    css: [
      'app.styl',
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      // 'ionicons',
      // 'mdi',
      // 'fontawesome',
    ],
    // supportIE: true,
    vendor: {
      add: [],
      remove: [],
    },
    build: {
      env: { // and on build (production):
        WS_URL: JSON.stringify('http://localhost:8283/modeler/message'),
        WS_SUBSCRIBE: JSON.stringify('/klab/message'),
        /* SAMPLES
        ANOTHER: JSON.stringify('esta fuera'),
        ...(ctx.dev)
          ? { // so on dev we'll have
            API: JSON.stringify('https://dev.api.com'),
            OTRA_COSA: JSON.stringify('kakels'),
          }
          : { // and on build (production):
            API: JSON.stringify('https://prod.api.com'),
            OTRA_COSA: JSON.stringify('pipi'),
          },
           */
      },
      scopeHoisting: true,
      vueRouterMode: 'history',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/,
        });
        /*
        for (const rule of cfg.module.rules) {
          if (rule.loader === 'babel-loader') {
            rule.include.push(path.resolve(__dirname, 'node_modules/proxy-polyfill/'));
          }
        }
        */
      },
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QLayoutFooter',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QTree',
        'QResizeObservable',
      ],
      directives: [
        'Ripple',
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Cookies',
      ],
      i18n: 'en-US',
    },
    // animations: 'all' --- includes all animations
    animations: [
    ],
    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        name: 'Explorer Quasar',
        short_name: 'Explorer',
        description: 'Explorer for k.LAB',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#DB1F26',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
    // eslint-disable-next-line no-unused-vars
      extendWebpack(cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.3',
  };
};

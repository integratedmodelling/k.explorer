const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
const build = fs.readFileSync('./build', 'utf8');

function extendTypescriptToWebpack(cfg) {
  // added the type-script supports
  cfg.resolve.extensions.push('.ts');
  cfg.resolve.extensions.push('.tsx');
  cfg.module.rules.push({
    test: /\.ts(x?)$/,
    loader: 'ts-loader',
    options: { appendTsSuffixTo: [/\.vue$/] },
  });
}

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'initApp',
      'axios',
      'vue-i18n',
      'djv',
      'vuex-stomp',
    ],
    css: [
      'app.styl',
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      'mdi',
      // 'fontawesome',
    ],
    supportIE: true,
    build: {
      env: { // and on build (production):
        ...(ctx.dev)
          ? { // so on dev we'll have
            WS_BASE_URL: JSON.stringify('http://localhost:8283'),
            STOMP_CLIENT_DEBUG: true,
            KEXPLORER_DEBUG: true,
          }
          : { // and on build (production):
            WS_BASE_URL: JSON.stringify(''),
            STOMP_CLIENT_DEBUG: false,
            KEXPLORER_DEBUG: false,
          },
        PACKAGE_VERSION: JSON.stringify(version),
        PACKAGE_BUILD: JSON.stringify(build),
        ENGINE_URL: JSON.stringify('/modeler'),
        ENGINE_SHARED: JSON.stringify('/modeler/shared/'),
        WS_URL: JSON.stringify('/modeler/message'),
        WS_SUBSCRIBE: JSON.stringify('/message'),
        WS_MESSAGE_DESTINATION: JSON.stringify('/klab/message'),
        REST_UPLOAD_MAX_SIZE: JSON.stringify('1024MB'),
        SEARCH_TIMEOUT_MS: JSON.stringify('4000'),
      },
      distDir: 'dist/ui', // the compiled file are putted in a local folder and then copied...
      // distDir: '../klab/klab.engine/src/main/resources/static/ui', // or you can use your k.LAB local engine directory
      scopeHoisting: true,
      // vue-route configuration is maded in route/index.js
      // publicPath: '/',
      // vueRouterMode: 'history',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack(cfg) {
        extendTypescriptToWebpack(cfg);
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/, // TODO logo only for see the logo in report locally, so remove as soon as possible
          /* used when CR+LF are changed from ide and everything breaks
          options: {
            fix: true,
          },
          */
        });
        //
        cfg.plugins.push(new webpack.IgnorePlugin(/(webworker-threads)/));
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          shared: path.resolve(__dirname, './src/shared'),
          classes: path.resolve(__dirname, './src/classes'),
          store: path.resolve(__dirname, './src/store'),
          ts: path.resolve(__dirname, './src/ts'),
        };
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
      port: 8080,
      open: false, // doesn't opens browser window automatically
      // openPage: '/viewer?session=<session-id>',
    },
    framework: {
      components: [
        'QIcon',
        'QChip',
        'QTooltip',
        'QBtn',
        'QBtnToggle',
        'QBtnDropdown',
        'QScrollArea',
        'QInput',
        'QSelect',
        'QSlider',
        'QTree',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QItemSeparator',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QSearch',
        'QAutocomplete',
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QLayoutFooter',
        'QPage',
        'QPageContainer',
        'QToolbar',
        'QToolbarTitle',
        'QModal',
        'QPopover',
        'QDialog',
        'QContextMenu',
        'QResizeObservable',
        'QToggle',
        'QCheckbox',
        'QProgress',
        'QField',
        'QTabs',
        'QTab',
        'QTabPane',
        'QSpinner',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl',
        'QDatetime',
        'QFab',
        'QFabAction',
      ],
      directives: [
        'Ripple',
        'TouchHold',
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Cookies',
        'Dialog',
      ],
      i18n: 'en-us',
    },
    // animations: 'all' --- includes all animations
    animations: 'all',
    /* [
      'fadeIn',
      'fadeOut', // TODO: only used must be there
    ], */
    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        name: 'k.Explorer',
        short_name: 'k.Explorer',
        description: 'k.Explorer for k.LAB',
        display: 'standalone',
        orientation: 'landscape',
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
      // bundler: 'builder', // or 'packager'
      // eslint-disable-next-line no-unused-vars
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      },
    },
  };
};

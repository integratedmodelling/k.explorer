<template>
  <div class="locale-switcher">
    <q-select
      v-model="activeLocale"
      :options="languages"
      inverted
    />
  </div>
</template>

<script>
/* eslint-disable object-shorthand */
import { QSelect, Cookies } from 'quasar';
// import VueCookie from 'vue-cookie';

// Vue.use(VueCookie);
// Vue.config.lang = VueCookie.get('locale') || 'en';
// console.log(`Locale from cookie = ${Vue.config.lang} : activeLocale = ${this.activeLocale}`);

export default {
  data() {
    return {
      activeLocale: this.$i18n.locale,
      languages: [],
    };
  },
  methods: {
    setLocale() {
      this.$i18n.locale = this.activeLocale;
      // change cookie
      Cookies.set('klab_exp_lang', this.activeLocale, {
        expires: 30,
        path: '/',
      });
      console.log(`New locale = ${this.$i18n.locale} : activeLocale = ${this.activeLocale}`);
    },
  },
  watch: {
    activeLocale() {
      this.setLocale();
    },
  },
  created() {
    this.languages = Object.keys(this.$i18n.messages).map(locale => ({
      label: this.$t('langName', locale),
      value: locale,
    }));
  },
  components: {
    QSelect,
  },
};
</script>

<style>
</style>

<template>
  <div id="mc-search-div" ref="search-div">
    <div id="left-shadow"></div>
    <div
      v-for="(token) in acceptedTokens"
      :key="token.index"
      :class="['tokens-accepted', 'tokens', 'text-'+token.leftColor]"
    >{{ token.value }} </div>
    <div class="tokens"><q-input
      :autofocus="true"
      :color="controlColor.name"
      v-model="actualToken"
      :placeholder="$t('label.searchPlaceholder')"
      size="10"
      @keydown="filter"
      @keyup.esc="searchStop"
      id="search-input"
    >
      <q-autocomplete
        @search="search"
        @selected="selected"
        :debounce="200"
        :min-characters="2"
      ></q-autocomplete>
    </q-input>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import Constants from 'shared/Constants';
import Vue from 'vue';

export default {
  name: 'KlabSearch',
  props: {
    maxResults: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      searchActive: false,
      contextId: null,
      requestId: 0,
      doneFunc: null,
      result: null,
      acceptedTokens: [],
      actualToken: '',
      searchDiv: null,
      scrolled: 0,
      acceptedTokensCounter: 0,
    };
  },
  computed: {
    ...mapGetters('data', [
      'searchResult',
    ]),
    ...mapGetters('view', [
      'spinner',
    ]),
    tokenToString() {
      return this.acceptedTokens.reduce((accumulator, token) => `${accumulator} ${token}`, '');
    },
    controlColor() {
      return {
        value: this.spinner.colorValue,
        name: this.spinner.color,
      };
    },
  },
  methods: {
    filter(event) {
      if (event.target.id === 'search-input' && event.keyCode === 8
        && this.actualToken === '' && this.acceptedTokens.length !== 0) {
        this.acceptedTokens.pop();
      }
    },
    ...mapActions('view', [
      'searchStop',
      'setSpinner',
    ]),
    search(terms, done) {
      this.requestId += 1;
      this.setSpinner(Constants.SPINNER_LOADING);
      this.sendStompMessage(MESSAGES_BUILDERS.SUBMIT_SEARCH({
        requestId: this.requestId,
        contextId: this.contextId,
        maxResults: this.maxResults,
        session: this.$store.state.data.session,
        cancelSearch: false,
        queryString: terms,
      }).body, {});
      this.doneFunc = done;
    },
    selected(item) {
      this.acceptedTokens.push(item);
      this.actualToken = '';
    },
  },
  watch: {
    searchResult(newResult) {
      // check if the new result is good
      const { requestId, contextId } = newResult;
      if (this.contextId === null) {
        this.contextId = contextId;
      } else if (contextId !== this.contextId) {
        console.warn(`Something strange was happened: differents search context ids:\n
        actual: ${this.contextId} / received: ${contextId}`);
        this.setSpinner({
          ...Constants.SPINNER_ERROR,
          errorMessage: 'Different search context id',
        });
        return;
      }
      // is the same request
      if (this.requestId === requestId) {
        // there is a result and the new result has same id: is a increment of previous
        if (this.result !== null &&
          this.result.requestId === requestId) {
          // add old results to new results to maintain new attribute values (like end)
          newResult.matches.push(...this.result.matches);
        }
        this.result = newResult;
      } else {
        console.log(`Result discarded for bad request id:\n
        actual: ${this.requestId} / received: ${requestId}\n`);
        this.setSpinner({
          ...Constants.SPINNER_ERROR,
          errorMessage: 'Different search request id',
        });
        return;
      }
      const { matches } = this.result;
      const results = [];
      matches.forEach((match) => {
        const desc = Constants.SEMANTIC_TYPES[match.mainSemanticType];
        results.push({
          value: match.name,
          label: match.name,
          labelLines: 1,
          sublabel: match.description,
          sublabelLines: 1,
          letter: desc.symbol,
          leftInverted: true,
          leftColor: desc.color,
          id: match.id,
          index: this.acceptedTokensCounter += 1,
        });
      });
      this.doneFunc(results);
      this.setSpinner(Constants.SPINNER_STOPPED);
    },
    acceptedTokens() {
      Vue.nextTick(() => {
        const scrollValue = this.searchDiv.scrollWidth;
        if (this.scrolled !== scrollValue) {
          this.searchDiv.scrollLeft = scrollValue;
          this.scrolled = scrollValue;
        }
      });
    },
  },
  mounted() {
    this.searchDiv = this.$refs['search-div'];
  },
};
</script>

<style>
  .tokens {
    display: inline-block;
    margin-right: 0.2em;
    padding: 2px;
  }
  .tokens-accepted {
    text-shadow: 0px 0 1px #fff;
    font-weight: 600;
  }
  .tokens.selected {
    color: #fff;
  }
  #mc-search-div {
    width: 330px;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;
    height: 55px;
    float: left;
    line-height: 55px;
    margin-left: 5px;
  }
  #left-shadow {
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&1+0,0+100 */
    background: -moz-linear-gradient(left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    width: 5px;
    height: 20px;
    margin: -3px 0;
    padding: 0;
    display: none;
  }
</style>

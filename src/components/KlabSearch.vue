<template>
  <div id="mc-search-div" ref="mc-search-div">
    <div id="left-shadow"></div>
    <div
      v-for="(token, index) in acceptedTokens"
      :key="token.index"
      :class="[
        'tokens-accepted',
        'tokens',
        token.selected ? 'selected' : '',
        'text-'+token.leftColor,
        token.selected ? 'bg-'+token.leftColor : ''
      ]"
      :ref="'token-'+token.index"
      :tabindex="index"
      @focus="onFocus(token,$event)"
      @blur="onFocus(token,$event)"
      @keydown="tokenOnKeyPressed"
    >{{ token.value }}</div>
    <div class="tokens"><q-input
      :autofocus="true"
      :color="controlColor.name"
      v-model="actualToken"
      :placeholder="$t('label.searchPlaceholder')"
      size="10"
      id="mc-search-input"
      ref="mc-search-input"
      :tabindex="acceptedTokens.length"
      :hide-underline="true"
      @focus="searchFocus(true)"
      @blur="searchFocus(false)"
      @keydown="searchInputOnKeyPressed"
      @keyup.esc="searchEnd"
    >
      <q-autocomplete
        @search="search"
        @selected="selected"
        @show="suggestionShowed = true"
        @hide="suggestionShowed = false"
        :debounce="200"
        :min-characters="2"
        ref="mc-autocomplete"
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
      contextId: null,
      requestId: 0,
      doneFunc: null,
      result: null,
      acceptedTokens: [],
      actualToken: '',
      searchDiv: null,
      searchInput: null,
      autocomplete: null,
      scrolled: 0,
      acceptedTokensCounter: 0,
      suggestionShowed: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'searchResult',
    ]),
    ...mapGetters('view', [
      'spinner',
      'searchIsFocused',
    ]),
    controlColor() {
      return {
        value: this.spinner.colorValue,
        name: this.spinner.color,
      };
    },
  },
  methods: {
    ...mapActions('view', [
      'searchStop',
      'setSpinner',
      'searchFocus',
    ]),
    onFocus(token, event) {
      token.selected = event.type === 'focus';
    },
    tokenOnKeyPressed(event) {
      if (event.keyCode === 37 || event.keyCode === 39) {
        const selected = this.acceptedTokens.findIndex(at => at.selected);
        let nextFocus = null;
        if (event.keyCode === 37 && selected > 0) {
          nextFocus = `token-${this.acceptedTokens[selected - 1].index}`;
        } else if (event.keyCode === 39 && selected < this.acceptedTokens.length) {
          if (selected === this.acceptedTokens.length - 1) {
            nextFocus = 'mc-search-input';
          } else {
            nextFocus = `token-${this.acceptedTokens[selected + 1].index}`;
          }
        }
        if (nextFocus !== null) {
          let nextFocusEl = this.$refs[nextFocus];
          if (Array.isArray(nextFocusEl)) {
            [nextFocusEl] = nextFocusEl;
          }
          Vue.nextTick(() => {
            nextFocusEl.focus();
          });
        }
      }
    },
    searchInputOnKeyPressed(event) {
      switch (event.keyCode) {
        case 13: // ENTER
          if (!this.suggestionShowed) {
            this.askToKLab(event);
            event.preventDefault();
          }
          break;
        case 8: // BACKSPACE
          if (this.actualToken === '' && this.acceptedTokens.length !== 0) {
            this.acceptedTokens.pop();
          }
          break;
        case 9: // TAB force to select with TAB
          if (this.suggestionShowed) {
            this.autocomplete.setValue(this.autocomplete.results[this.autocomplete.keyboardIndex]);
            event.preventDefault();
          }
          break;
        case 37: // left arrow
          if (!this.suggestionShowed && this.searchInput.$refs.input.selectionStart === 0) {
            const token = this.acceptedTokens[this.acceptedTokens.length - 1];
            Vue.nextTick(() => {
              this.$refs[`token-${token.index}`][0].focus();
            });
          }
          break;
        default:
          break;
      }
    },
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
    tokenToString() {
      return this.acceptedTokens.reduce((accumulator, token) => `${accumulator} ${token.id}`, '');
    },
    askToKLab() {
      if (this.acceptedTokens.length > 0) {
        console.log(`TODO ask for ${this.tokenToString()}`);
      } else {
        console.log('Nothing to search for');
      }
      this.searchEnd();
    },
    searchEnd() {
      this.contextId = null;
      this.requestId = 0;
      this.doneFunc = null;
      this.result = null;
      this.acceptedTokens = [];
      this.actualToken = '';
      this.scrolled = 0;
      this.acceptedTokensCounter = 0;
      this.searchStop();
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
        if (typeof desc === 'undefined') {
          console.warn(`Unknown semantic type: ${match.mainSemanticType}`);
          return;
        }
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
          selected: false,
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
    searchIsFocused(newValue) {
      if (newValue) {
        this.searchInput.focus();
        this.acceptedTokens.forEach((at) => {
          at.selected = false;
        });
      } else {
        this.searchInput.blur();
      }
    },
  },
  mounted() {
    this.searchDiv = this.$refs['mc-search-div'];
    this.searchInput = this.$refs['mc-search-input'];
    this.autocomplete = this.$refs['mc-autocomplete'];

    Vue.config.warnHandler = (msg, vm, trace) => {
      if (msg.indexOf('"letter"') === -1) {
        console.warn('Vue warn:', msg, vm, trace);
      }
    };
  },
};
</script>

<style>
  .tokens {
    display: inline-block;
    margin-right: 0.1em;
    padding: 0 5px;
    border-radius: 20px;
  }
  .tokens-accepted {
    text-shadow: 0px 0 1px #fff;
    font-weight: 600;
  }
  .tokens.selected {
    color: #fff;
    outline: none;
  }
  #mc-search-div {
    width: 330px;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;
    float: left;
    line-height: 30px;
    margin-left: 5px;
    margin-top: 13px;
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

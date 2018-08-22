<template>
  <div id="mc-search-div" ref="mc-search-div">
    <!-- <div id="left-shadow"></div>  TODO is useless to generate an exit effect when search scroll to left -->
    <div
      v-for="(token, index) in acceptedTokens"
      :key="token.index"
      :class="[
        'tokens-accepted',
        'tokens',
        'bg-semantic-elements',
        token.selected ? 'selected' : '',
        'text-'+token.leftColor,
      ]"
      :style="{ 'border-color': token.selected ? token.rgb : 'transparent' }"
      :ref="'token-'+token.index"
      :tabindex="index"
      @focus="onTokenFocus(token,$event)"
      @blur="onTokenFocus(token,$event)"
      @keydown="onKeyPressedOnToken"
    >{{ token.value }}
      <q-tooltip
        :delay="500"
        :offset="[0, 15]"
        self="top left"
        anchor="bottom left"
      >
        <span v-if="token.sublabel.length > 0">{{ token.sublabel }}</span>
        <span v-else>{{ $t('label.noTokenDescription') }}</span>
      </q-tooltip>
    </div>
    <div class="tokens"><q-input
      :autofocus="true"
      v-model="actualToken"
      :placeholder="$t('label.searchPlaceholder')"
      size="20"
      id="mc-search-input"
      ref="mc-search-input"
      :tabindex="acceptedTokens.length"
      :hide-underline="true"
      @focus="onInputFocus(true)"
      @blur="onInputFocus(false)"
      @keydown="onKeyPressedOnSearchInput"
      @keyup.esc="searchEnd"
    >
      <q-autocomplete
        @search="search"
        @selected="selected"
        @show="suggestionShowed = true"
        @hide="onAutocompleteHide"
        :debounce="200"
        :min-characters="2"
        :max-results="15"
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
      searchContextId: null,
      searchRequestId: 0,
      doneFunc: null,
      result: null,
      acceptedTokens: [],
      actualToken: '',
      actualSearchString: '',
      noSearch: false,
      searchDiv: null,
      searchInput: null,
      autocompleteEl: null,
      scrolled: 0,
      acceptedTokensCounter: 0,
      suggestionShowed: false,
      searchTimeout: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'searchResult',
      'contextId',
    ]),
    ...mapGetters('view', [
      'spinner',
      'searchIsFocused',
      'searchLostChar',
    ]),
    controlColor() {
      return {
        value: this.spinner.colorValue,
        name: this.spinner.color,
      };
    },
    inputSearchColor: {
      get() {
        return this.searchInput ? this.searchInput.$refs.input.style.color : 'black';
      },
      set(color) {
        this.searchInput.$refs.input.style.color = color;
      },
    },
  },
  methods: {
    ...mapActions('view', [
      'searchStop',
      'setSpinner',
      'searchFocus',
      'resetSearchLostChar',
    ]),
    onTokenFocus(token, event) {
      token.selected = event.type === 'focus';
    },
    onInputFocus(focused) {
      this.searchFocus({ focused });
      this.actualToken = this.actualSearchString;
    },
    onAutocompleteHide() {
      this.suggestionShowed = false;
      if (this.actualToken !== this.actualSearchString) {
        this.noSearch = true;
        this.resetSearchInput();
      }
    },
    onKeyPressedOnToken(event) {
      if (event.keyCode === 37 || event.keyCode === 39) {
        event.preventDefault();
        const selected = this.acceptedTokens.findIndex(at => at.selected);
        let nextFocus = null;
        let isInput = false;
        if (event.keyCode === 37 && selected > 0) { // left arrow
          nextFocus = `token-${this.acceptedTokens[selected - 1].index}`;
        } else if (event.keyCode === 39 && selected < this.acceptedTokens.length) {
          if (selected === this.acceptedTokens.length - 1) {
            nextFocus = 'mc-search-input';
            isInput = true;
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
            // calculate possible offset problems
            let scrollOffset = null;
            const cssLeft = this.searchDiv.offsetLeft;
            if (event.keyCode === 37) { // left arrow
              const leftElementPosition = (nextFocusEl.offsetLeft + cssLeft) - this.searchDiv.offsetLeft;
              if (this.searchDiv.scrollLeft >= leftElementPosition) {
                scrollOffset = leftElementPosition;
              }
            } else {
              const el = isInput ? nextFocusEl.$el : nextFocusEl;
              const rigthElementPosition = (isInput ? el.offsetLeft : nextFocusEl.offsetLeft) + cssLeft + el.offsetWidth;
              const parentSize = this.searchDiv.offsetWidth + this.searchDiv.scrollLeft;
              if (parentSize <= rigthElementPosition) {
                scrollOffset = (this.searchDiv.scrollLeft + (rigthElementPosition - parentSize)) - cssLeft;
              }
            }
            if (scrollOffset !== null) {
              Vue.nextTick(() => {
                // move the scroll
                this.searchDiv.scrollLeft = scrollOffset;
              });
            }
          });
        }
      }
    },
    onKeyPressedOnSearchInput(event) {
      this.noSearch = false;
      switch (event.keyCode) {
        case 13: // ENTER
          if (!this.suggestionShowed) {
            this.searchInKLab(event);
          }
          break;
        case 8: // BACKSPACE
          if (this.actualToken === '' && this.acceptedTokens.length !== 0) {
            this.acceptedTokens.pop();
            event.preventDefault();
          } else if (this.actualSearchString !== '') {
            event.preventDefault();
            this.actualSearchString = this.actualSearchString.slice(0, -1);
            // this.actualToken = this.actualSearchString; TODO change
          }
          break;
        case 9: // TAB force to select with TAB
          if (this.suggestionShowed && this.autocompleteEl.keyboardIndex !== -1) {
            this.autocompleteEl.setValue(this.autocompleteEl.results[this.autocompleteEl.keyboardIndex]);
          }
          event.preventDefault();
          break;
        case 37: // left arrow
          if (!this.suggestionShowed && this.searchInput.$refs.input.selectionStart === 0) {
            const token = this.acceptedTokens[this.acceptedTokens.length - 1];
            Vue.nextTick(() => {
              this.$refs[`token-${token.index}`][0].focus();
            });
            event.preventDefault();
          }
          break;
        case 32: // SPACE BAR is not allowed in search
          event.preventDefault();
          this.$q.notify({
            message: this.$t('messages.noSpaceAllowedInSearch'),
            type: 'warning',
            timeout: 1500,
          });
          break;
        default:
          if (event.keyCode !== 39 && (event.keyCode < 65 || event.keyCode > 90)) {
            event.preventDefault(); // only letters are permitted
          } else {
            event.preventDefault();
            this.actualSearchString += event.key;
            // this.searchInput.$refs.input.style.color = 'black';
            // this.actualToken = this.actualSearchString; todo change
            // this.autocompleteEl.trigger();
          }
          break;
      }
    },
    // call when autocomplete decide that an element is selected
    selected(item, isNavigation) {
      if (!isNavigation) {
        this.acceptedTokens.push(item);
        // this.actualToken = ''; TODO change
        this.actualSearchString = '';
      } else {
        this.inputSearchColor = item.rgb;
      }
    },
    // call when autocomplete want to search
    search(terms, done) {
      if (this.noSearch) { // only to intercept unwanted reactivity
        this.noSearch = false;
        done([]);
        return;
      }
      this.searchRequestId += 1;
      this.sendStompMessage(MESSAGES_BUILDERS.SEARCH_REQUEST({
        requestId: this.searchRequestId,
        contextId: this.searchContextId,
        maxResults: this.maxResults,
        session: this.$store.state.data.session,
        cancelSearch: false,
        queryString: this.actualSearchString, // terms split space
      }).body);
      this.setSpinner({
        ...Constants.SPINNER_LOADING,
        owner: this.$options.name,
      });
      this.doneFunc = done;
      this.searchTimeout = setTimeout(() => {
        this.setSpinner({
          ...Constants.SPINNER_ERROR,
          owner: this.$options.name,
          errorMessage: this.$t('errors.searchTimeout'),
          time: 2,
          then: {
            ...Constants.SPINNER_STOPPED,
          },
        });
        this.doneFunc([]);
      }, 2000);
    },
    // ask for token to keylab to obtain possibility
    searchInKLab() {
      if (this.acceptedTokens.length > 0) {
        const urn = this.acceptedTokens.map(token => token.id).join(' ');
        this.sendStompMessage(MESSAGES_BUILDERS.OBSERVATION_REQUEST({
          urn,
          contextId: this.contextId,
          searchContextId: this.searchContextId,
          session: this.$store.state.data.session,
        }).body);
        this.$q.notify({
          message: this.$t('label.askForObservation', { urn: this.acceptedTokens.map(token => token.label).join(' ') }),
          type: 'info',
          // position: 'top',
          timeout: 2000,
        });
      } else {
        console.log('Nothing to search for');
      }
      this.searchEnd();
    },
    // search reset
    searchEnd() {
      if (!this.suggestionShowed) {
        this.searchContextId = null;
        this.searchRequestId = 0;
        this.doneFunc = null;
        this.result = null;
        this.acceptedTokens = [];
        this.actualSearchString = ''; // actualToken is changed using watcher
        this.scrolled = 0;
        this.acceptedTokensCounter = 0;
        this.noSearch = false;
        this.searchStop();
      }
    },
    // helper to reset the input search field (if tomorrow will be more complex)
    resetSearchInput() {
      this.actualToken = this.actualSearchString;
      this.inputSearchColor = 'black';
    },
  },
  watch: {
    // sinchronize actualSearchString with actualToken
    actualSearchString() {
      this.resetSearchInput();
    },
    // obtained some results
    searchResult(newResult) {
      // if we are waiting for a results, we can stop waiting
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = null;
      }
      // check if the new result is good
      const { requestId, contextId } = newResult;
      if (this.searchContextId === null) {
        this.searchContextId = contextId;
      } else if (contextId !== this.searchContextId) {
        console.warn(`Something strange was happened: differents search context ids:\n
        actual: ${this.searchContextId} / received: ${contextId}`);
        this.setSpinner({
          ...Constants.SPINNER_ERROR,
          owner: this.$options.name,
          errorMessage: 'Different search context id',
        });
        return;
      }
      // is the same request
      if (this.searchRequestId === requestId) {
        // there is a result and the new result has same id: is a increment of previous
        if (this.result !== null &&
          this.result.requestId === requestId) {
          // add old results to new results to maintain new attribute values (like end)
          newResult.matches.push(...this.result.matches);
        }
        this.result = newResult;
      } else {
        console.log(`Result discarded for bad request id:\n
        actual: ${this.searchRequestId} / received: ${requestId}\n`);
        this.setSpinner({
          ...Constants.SPINNER_ERROR,
          owner: this.$options.name,
          errorMessage: 'Different search request id',
        });
        return;
      }
      const { matches } = this.result;
      const results = [];
      // const totMatches = matches.length;
      matches.forEach((match/* ,index */) => {
        const matchType = Constants.MATCH_TYPES[match.matchType];
        if (typeof matchType === 'undefined') {
          console.warn(`Unknown type: ${match.matchType}`);
          return;
        }
        let desc = matchType;
        if (match.mainSemanticType !== null) {
          const mainSemanticType = Constants.SEMANTIC_TYPES[match.mainSemanticType];
          if (typeof mainSemanticType !== 'undefined') {
            desc = mainSemanticType;
          }
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
          rgb: desc.rgb,
          id: match.id,
          index: this.acceptedTokensCounter += 1,
          selected: false,
          // stamp: `${index + 1}/${totMatches}`, TODO is useless?
        });
      });
      if (results.length === 0) {
        this.$q.notify({
          message: this.$t('messages.noSearchResults'),
          type: 'info',
          // position: 'top',
          timeout: 1000,
        });
      }
      this.setSpinner({ ...Constants.SPINNER_STOPPED, owner: this.$options.name });
      Vue.nextTick(() => {
        this.doneFunc(results);
        this.autocompleteEl.keyboardIndex = 0;
      });
    },
    // we have new token, scroll behaviour
    acceptedTokens() {
      Vue.nextTick(() => {
        const scrollValue = this.searchDiv.scrollWidth;
        if (this.scrolled !== scrollValue) {
          this.searchDiv.scrollLeft = scrollValue;
          this.scrolled = scrollValue;
        }
      });
    },
    // synchronize with app main keyboard event interception
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
    // if a char was pressed without search input focus, is possible that it will be not write, so we do it
    searchLostChar(newValue) {
      if (newValue !== null) { // && this.actualToken === '') {
        this.actualSearchString += newValue;
        this.resetSearchLostChar();
      }
    },
  },
  mounted() {
    this.searchDiv = this.$refs['mc-search-div'];
    this.searchInput = this.$refs['mc-search-input'];
    this.autocompleteEl = this.$refs['mc-autocomplete'];
    this.actualSearchString = (this.searchLostChar === null) ? '' : this.searchLostChar;
    this.inputSearchColor = 'black';
    // this.actualToken = this.actualSearchString; TODO Change
    // Only in dev: stop the annoying warning of letter
    Vue.config.warnHandler = (msg, vm, trace) => {
      if (msg.indexOf('"letter"') === -1) {
        console.warn('Vue warn:', msg, vm, trace);
      }
    };
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .tokens {
    display: inline-block;
    margin-right: 1px;
    padding: 0 3px;
  }
  .tokens-accepted {
    text-shadow: 0px 0 1px #fff;
    font-weight: 600;
  }
  .tokens.selected {
    /* color: #fff; */
    outline: none;
  }
  .bg-semantic-elements {
     border-radius: 10px;
     border-style: solid;
     border-width: 2px;
  }
  #mc-search-div {
    width: 85%;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;
    position: absolute;
    left: 60px;
    /* line-height: 30px; */
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
  .q-tooltip {
    /* background-color: rgba(155, 155, 155, 0.5); */
    max-width: $main-control-width;
  }
  .q-popover {
    max-width: $main-control-width !important;
    border-radius: 10px;
  }
</style>

<template>
  <div id="ks-container"
       ref="ks-container"
  >
    <div id="ks-internal-container" style="position: relative">
      <div
      v-for="(token, index) in acceptedTokens"
      :key="token.index"
      :class="[
        'ks-tokens-accepted',
        'ks-tokens',
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
      @touchstart="handleTouch($event, null, deleteLastToken)"
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
      <div class="ks-tokens" :class="[fuzzyMode ? 'ks-tokens-fuzzy' : 'ks-tokens-klab']">
      <q-input
        :class="[ fuzzyMode ? 'ks-fuzzy' : '', searchIsFocused ? 'ks-search-focused' : '']"
        :autofocus="true"
        v-model="actualToken"
        :placeholder="fuzzyMode ? $t('label.fuzzySearchPlaceholder') : $t('label.searchPlaceholder')"
        size="20"
        id="ks-search-input"
        ref="ks-search-input"
        :tabindex="acceptedTokens.length"
        :hide-underline="true"
        @focus="onInputFocus(true)"
        @blur="onInputFocus(false)"
        @keydown="onKeyPressedOnSearchInput"
        @keyup.esc="searchEnd({})"
        @contextmenu.native.prevent
        @touchstart.native="handleTouch($event, null, searchInKLab)"
      >
        <klab-autocomplete
          @search="autocompleteSearch"
          @selected="selected"
          @show="onAutocompleteShow"
          @hide="onAutocompleteHide"
          :debounce="400"
          :min-characters="minimumCharForAutocomplete"
          :max-results="50"
          ref="ks-autocomplete"
          id="ks-autocomplete"
          :class="[ notChrome() ? 'not-chrome' : '']"
        ></klab-autocomplete>
      </q-input>
    </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import { MATCH_TYPES, SEMANTIC_TYPES, SPINNER_CONSTANTS, SEARCH_MODES, CONSTANTS } from 'shared/Constants';
import { isUpperCase } from 'shared/Utils';
import KlabAutocomplete from 'components/KlabAutocompleteComponent';
import HandleTouch from 'shared/HandleTouchMixin';

const SINGLE_CHARS = '=(<)>';

export default {
  name: 'KlabSearch',
  components: {
    KlabAutocomplete,
  },
  mixins: [HandleTouch],
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
      searchDivInitialSize: undefined,
      searchDivInternal: undefined,
      searchInput: null,
      autocompleteEl: null,
      scrolled: 0,
      suggestionShowed: false,
      searchTimeout: null,
      searchHistoryIndex: -1,
      autocompleteSB: null,
      freeText: false,
      parenthesisDepth: 0,
      last: false,
      minimumCharForAutocomplete: 2,
    };
  },
  computed: {
    ...mapGetters('data', [
      'searchResult',
      'contextId',
      'isCrossingIDL',
    ]),
    ...mapGetters('view', [
      'spinner',
      'searchIsFocused',
      'searchLostChar',
      'searchHistory',
      'fuzzyMode',
      'largeMode',
      'isDocked',
    ]),
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
      'storePreviousSearch',
      'setFuzzyMode',
      'setLargeMode',
    ]),
    notChrome() {
      return navigator.userAgent.indexOf('Chrome') === -1;
    },
    onTokenFocus(token, event) {
      token.selected = event.type === 'focus';
    },
    onInputFocus(focused) {
      this.searchFocus({ focused });
      this.actualToken = this.actualSearchString;
    },
    onAutocompleteShow() {
      this.suggestionShowed = true;
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
            nextFocus = 'ks-search-input';
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
              const rightElementPosition = (isInput ? el.offsetLeft : nextFocusEl.offsetLeft) + cssLeft + el.offsetWidth;
              const parentSize = this.searchDiv.offsetWidth + this.searchDiv.scrollLeft;
              if (parentSize <= rightElementPosition) {
                scrollOffset = (this.searchDiv.scrollLeft + (rightElementPosition - parentSize)) - cssLeft;
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
      if (this.last) {
        event.preventDefault();
        this.$q.notify({
          message: this.$t('messages.lastTermAlertText'),
          type: 'warning',
          icon: 'mdi-alert',
          timeout: 2000,
        });
        return;
      }
      switch (event.keyCode) {
        case 8: // BACKSPACE
          if (this.actualToken === '' && this.acceptedTokens.length !== 0) { // existing accepted token without actual search text
            const item = this.acceptedTokens.pop();
            this.searchHistoryIndex = -1;
            event.preventDefault();
            this.sendStompMessage(MESSAGES_BUILDERS.SEARCH_MATCH({
              contextId: this.searchContextId,
              matchIndex: item.matchIndex,
              matchId: item.id,
              added: false,
            }, this.$store.state.data.session).body);
            this.freeText = this.acceptedTokens.length > 0
              ? this.acceptedTokens[this.acceptedTokens.length - 1].nextTokenClass !== MATCH_TYPES.NEXT_TOKENS.TOKEN
              : false;
            this.$nextTick(() => {
              this.checkLargeMode(false);
            });
          } else if (this.actualSearchString !== '') { // existing actual token so backspace work normally
            event.preventDefault();
            this.actualSearchString = this.actualSearchString.slice(0, -1);
          } else if (this.actualSearchString === '' && this.actualToken !== '') { // existing actual token, but is a complex suggestion, so everything must be delete
            this.actualToken = '';
            event.preventDefault();
          }
          break;
        case 9: // TAB force to select with TAB
          /*
          if (this.acceptedTokens.length === 0 && this.searchInput.$refs.input.selectionStart === 0) {
            this.setFuzzyMode(!this.fuzzyMode);
          }
          */
          if (this.suggestionShowed && this.autocompleteEl.keyboardIndex !== -1) {
            this.autocompleteEl.setValue(this.autocompleteEl.results[this.autocompleteEl.keyboardIndex]);
            this.searchHistoryIndex = -1;
          } else if (this.freeText) {
            this.acceptText();
          }
          event.preventDefault();
          break;
        case 13: // ENTER
          if (this.freeText || this.fuzzyMode) {
            this.acceptText();
          } else {
            this.searchInKLab(event);
          }
          break;
        case 27: // ESCAPE
          if (this.suggestionShowed) {
            this.autocompleteEl.hide();
          } else {
            this.searchEnd({ noStore: true });
          }
          event.preventDefault();
          break;
        case 32: // SPACE BAR is not allowed in search but if is the first char, we ask for suggestions
          event.preventDefault();
          if (this.fuzzyMode) {
            this.searchHistoryIndex = -1;
            this.actualSearchString += event.key;
          } else if (this.freeText) { // Accept text
            this.acceptFreeText();
          } else if (this.suggestionShowed) { // take the first or the selected one
            const selectedIdx = this.autocompleteEl.keyboardIndex === -1 ? 0 : this.autocompleteEl.keyboardIndex;
            this.autocompleteEl.setValue(this.autocompleteEl.results[selectedIdx]);
            this.searchHistoryIndex = -1;
          } else if (!this.askForSuggestion()) {
            this.$q.notify({
              message: this.$t('messages.noSpaceAllowedInSearch'),
              type: 'warning',
              icon: 'mdi-alert',
              timeout: 1500,
            });
          }
          break;
        case 37: // left arrow
          if (!this.suggestionShowed && this.searchInput.$refs.input.selectionStart === 0
          && this.acceptedTokens.length > 0) {
            const token = this.acceptedTokens[this.acceptedTokens.length - 1];
            Vue.nextTick(() => {
              this.$refs[`token-${token.index}`][0].focus();
            });
            event.preventDefault();
          }
          break;
        case 38: // Arrow up
          if (!this.suggestionShowed) {
            this.searchHistoryEvent(1, event);
          }
          break;
        case 40: // Arrow down
          if (!this.suggestionShowed) {
            this.searchHistoryEvent(-1, event);
          }
          break;
        default:
          if (!this.isAcceptedKey(event.key)) { // ) is permitted only if we have some parenthesis open
            if (event.keyCode !== 39) { // right arrow
              event.preventDefault();
            } // only chars added in initApp are permitted
          } else if (event.key === ')' && this.parenthesisDepth === 0) {
            event.preventDefault();
          } else {
            event.preventDefault();
            if (this.acceptedTokens.length === 0 && this.searchInput.$refs.input.selectionStart === 0 && isUpperCase(event.key)) {
              this.setFuzzyMode(true);
            }
            this.searchHistoryIndex = -1;
            this.actualSearchString += event.key;
            if (SINGLE_CHARS.indexOf(event.key) !== -1) {
              this.askForSuggestion(event.key.trim());
            }
            // this.searchInput.$refs.input.style.color = 'black';
            // this.actualToken = this.actualSearchString; todo change
            // this.autocompleteEl.trigger();
          }
          break;
      }
    },
    acceptText() {
      const trimmedSearch = this.actualToken.trim();
      if (trimmedSearch === '') {
        this.$q.notify({
          message: this.$t('messages.emptyFreeTextSearch'),
          type: 'warning',
          icon: 'mdi-alert',
          timeout: 1000,
        });
      } else {
        this.search(this.actualToken, (results) => {
          if (results && results.length > 0) {
            this.selected(results[0], false);
          } else {
            this.$q.notify({
              message: this.$t('messages.noSearchResults'),
              type: 'info',
              icon: 'mdi-information',
              timeout: 1000,
            });
          }
        });
      }
    },
    // call when autocomplete decide that an element is selected
    selected(item, isNavigation) {
      if (!isNavigation) {
        this.acceptedTokens.push(item);
        this.actualSearchString = '';
        this.sendStompMessage(MESSAGES_BUILDERS.SEARCH_MATCH({
          contextId: this.searchContextId,
          matchIndex: item.matchIndex,
          matchId: item.id,
          added: true,
        }, this.$store.state.data.session).body);
        if (this.fuzzyMode) {
          this.setSpinner({
            ...SPINNER_CONSTANTS.SPINNER_LOADING,
            owner: this.$options.name,
          });
          this.$nextTick(() => {
            this.searchEnd({});
          });
          return;
        }
        this.freeText = item.nextTokenClass !== MATCH_TYPES.NEXT_TOKENS.TOKEN;
        this.$nextTick(() => {
          this.checkLargeMode(true);
        });
      } else {
        this.inputSearchColor = item.rgb;
      }
    },
    checkLargeMode() {
      this.$nextTick(() => {
        let diff;
        if (this.isDocked) {
          diff = this.searchDivInitialSize - this.searchDivInternal.clientWidth;
          if (diff < 0 && this.largeMode === 0) {
            this.setLargeMode(1);
          } else if (diff >= 0 && this.largeMode > 0) {
            this.setLargeMode(0);
          }
        } else {
          diff = this.searchDiv.clientWidth - this.searchDivInternal.clientWidth;
          if (diff >= 0) {
            const fSteps = Math.floor(diff / CONSTANTS.SEARCHBAR_INCREMENT);
            if (fSteps > 0 && this.largeMode > 0) {
              if (fSteps > this.largeMode) {
                this.setLargeMode(0);
              } else {
                this.setLargeMode(this.largeMode - fSteps);
              }
            }
          } else {
            const cSteps = Math.ceil(Math.abs(diff) / CONSTANTS.SEARCHBAR_INCREMENT);
            this.setLargeMode(this.largeMode + cSteps);
          }
        }
        /*
        let diff = 0;
        diff = this.searchDiv.clientWidth - this.searchDiv.scrollWidth;
        if (this.isDocked) {
          if (diff < 0 && this.largeMode === 0) {
            this.setLargeMode(1);
          } else if (diff >= 0) {
            this.setLargeMode(0);
          }
        } else {
          const actualDiff = this.searchDiv.clientWidth - CONSTANTS.SEARCHBAR_INCREMENT * this.largeMode;
          const largeMode = Math.ceil(Math.abs(actualDiff) / CONSTANTS.SEARCHBAR_INCREMENT);
          console.log(`this.searchDiv.clientWidth: ${this.searchDiv.clientWidth};\nthis.searchDiv.scrollWidth: ${this.searchDiv.scrollWidth}\nDIFF: ${diff}; largeMode: ${largeMode}`);
          this.setLargeMode(largeMode);
        }
        */
      });
    },
    // call when autocomplete want to search
    autocompleteSearch(terms, done) {
      if (this.freeText) {
        done([]);
        return;
      }
      this.search(terms, done);
    },
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
        cancelSearch: false,
        defaultResults: terms === '',
        searchMode: !this.fuzzyMode ? SEARCH_MODES.SEMANTIC : SEARCH_MODES.FREETEXT,
        queryString: this.actualSearchString, // terms split space
      }, this.$store.state.data.session).body);
      this.setSpinner({
        ...SPINNER_CONSTANTS.SPINNER_LOADING,
        owner: this.$options.name,
      });
      this.doneFunc = done;
      this.searchTimeout = setTimeout(() => {
        this.setSpinner({
          ...SPINNER_CONSTANTS.SPINNER_ERROR,
          owner: this.$options.name,
          errorMessage: this.$t('errors.searchTimeout'),
          time: 2,
          then: {
            ...SPINNER_CONSTANTS.SPINNER_STOPPED,
          },
        });
        this.doneFunc([]);
      }, process.env.SEARCH_TIMEOUT_MS);
    },
    // ask for token to keylab to obtain possibility
    searchInKLab() {
      if (this.suggestionShowed || this.fuzzyMode) {
        return;
      }
      if (this.parenthesisDepth > 0) {
        this.$q.notify({
          message: this.$t('messages.parenthesisAlertText'),
          type: 'warning',
          icon: 'mdi-alert',
          timeout: 2000,
        });
        return;
      }
      if (this.isCrossingIDL) {
        this.$q.dialog({
          title: this.$t('label.IDLAlertTitle'),
          message: this.$t('messages.IDLAlertText'),
          color: 'mc-red',
        }).catch(() => {});
        return;
      }
      if (this.acceptedTokens.length > 0) {
        const urn = this.acceptedTokens.map(token => token.id).join(' ');
        this.sendStompMessage(MESSAGES_BUILDERS.OBSERVATION_REQUEST({
          urn,
          contextId: this.contextId,
          searchContextId: null, // this.searchContextId, -> we don't want delete it for search history
        }, this.$store.state.data.session).body);
        const searchText = this.acceptedTokens.map(token => token.label).join(' ');
        this.$q.notify({
          message: this.$t('label.askForObservation', { urn: searchText }),
          type: 'info',
          icon: 'mdi-information',
          timeout: 2000,
        });
      } else {
        console.info('Nothing to search for');
      }
      this.searchEnd({});
    },
    // search reset
    searchEnd({ noStore = false, noDelete = false }) {
      if (!this.suggestionShowed) {
        if (this.acceptedTokens.length > 0) {
          if (noDelete) {
            return;
          }
          if (!noStore) {
            this.storePreviousSearch({
              acceptedTokens: this.acceptedTokens.slice(0),
              searchContextId: this.searchContextId,
              searchRequestId: this.searchRequestId,
            });
          }
        }
        this.searchContextId = null;
        this.searchRequestId = 0;
        this.doneFunc = null;
        this.result = null;
        this.acceptedTokens = [];
        this.searchHistoryIndex = -1;
        this.actualSearchString = ''; // actualToken is changed using watcher
        this.scrolled = 0;
        this.noSearch = false;
        this.freeText = false;
        this.setFuzzyMode(false);
        this.setLargeMode(0);
        this.parenthesisDepth = 0;
        this.last = false;
        this.searchStop();
      }
    },
    // helper to reset the input search field (if tomorrow will be more complex)
    resetSearchInput() {
      this.$nextTick(() => {
        this.actualToken = this.actualSearchString;
        this.inputSearchColor = 'black';
      });
    },
    searchHistoryEvent(index, event = null) {
      if (this.actualToken === '' && this.searchHistory.length > 0
        && (this.acceptedTokens.length === 0 || this.searchHistoryIndex >= 0)
        && this.searchHistory.length > 0 && (index > 0 || this.searchHistoryIndex > 0)
        && this.searchHistoryIndex + index < this.searchHistory.length) {
        this.searchHistoryIndex += index;
        const previousSearch = this.searchHistory[this.searchHistoryIndex];
        this.acceptedTokens = previousSearch.acceptedTokens.slice(0);
        this.searchContextId = previousSearch.searchContextId;
        this.searchRequestId = previousSearch.searchRequestId;
        if (event !== null) {
          event.preventDefault();
        }
      }
    },
    askForSuggestion(char = '') {
      if ((char !== '' || this.acceptedTokens.length === 0) && this.searchInput.$refs.input.selectionStart === 0) {
        this.search(char, (results) => {
          this.autocompleteEl.__clearSearch();
          if (Array.isArray(results) && results.length > 0) {
            this.autocompleteEl.results = results;
            Vue.nextTick(() => {
              this.autocompleteEl.__showResults();
              if (char !== '') {
                this.autocompleteEl.keyboardIndex = 0;
              }
            });
          } else {
            this.autocompleteEl.hide();
          }
        });
        return true;
      }
      return false;
    },
    deleteLastToken() {
      if (this.acceptedTokens.length !== 0) { // existing accepted token without actual search text
        const item = this.acceptedTokens.pop();
        this.searchHistoryIndex = -1;
        this.sendStompMessage(MESSAGES_BUILDERS.SEARCH_MATCH({
          contextId: this.searchContextId,
          matchIndex: item.matchIndex,
          matchId: item.id,
          added: false,
        }, this.$store.state.data.session).body);
      }
    },
    // if a char was pressed without search input focus, is possible that it will be not write, so we do it
    charReceived(char, append = false) {
      if (char === 'ArrowUp') {
        this.searchHistoryEvent(1);
      } else if (char === 'ArrowDown') {
        this.searchHistoryEvent(-1);
        // } else if (char === 'Tab' && this.acceptedTokens.length === 0 && this.searchInput.$refs.input.selectionStart === 0) {
      } else if (char === ' ') {
        this.askForSuggestion();
      } else {
        if (isUpperCase(char)) {
          this.setFuzzyMode(true);
        }
        this.actualSearchString = append ? this.actualSearchString + char : char;
        if (SINGLE_CHARS.indexOf(char) !== -1) {
          this.askForSuggestion(char);
        }
      }
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
          ...SPINNER_CONSTANTS.SPINNER_ERROR,
          owner: this.$options.name,
          errorMessage: 'Different search context id',
        });
        return;
      }
      // is the same request
      if (this.searchRequestId === requestId) {
        // there is a result and the new result has same id: is a increment of previous
        if (this.result !== null
          && this.result.requestId === requestId) {
          // add old results to new results to maintain new attribute values (like end)
          newResult.matches.push(...this.result.matches);
        }
        this.result = newResult;
      } else {
        console.warn(`Result discarded for bad request id:\n
        actual: ${this.searchRequestId} / received: ${requestId}\n`);
        this.setSpinner({
          ...SPINNER_CONSTANTS.SPINNER_ERROR,
          owner: this.$options.name,
          errorMessage: 'Different search request id',
        });
        return;
      }
      const { matches, error, errorMessage, parenthesisDepth, last } = this.result;
      this.parenthesisDepth = parenthesisDepth;
      this.last = last;
      if (error) {
        this.setSpinner({
          ...SPINNER_CONSTANTS.SPINNER_ERROR,
          owner: this.$options.name,
          errorMessage,
        });
        return;
      }
      const results = [];
      // const totMatches = matches.length;
      matches.forEach((match/* ,index */) => {
        const matchType = MATCH_TYPES[match.matchType];
        if (typeof matchType === 'undefined') {
          console.warn(`Unknown type: ${match.matchType}`);
          return;
        }
        let desc = matchType;
        if (match.mainSemanticType !== null) {
          const mainSemanticType = SEMANTIC_TYPES[match.mainSemanticType];
          if (typeof mainSemanticType !== 'undefined') {
            desc = mainSemanticType;
          }
        }
        if (match.matchType === 'SEPARATOR') {
          results.push({
            value: match.name,
            label: match.name,
            labelLines: 1,
            rgb: desc.rgb,
            selected: false,
            disable: true,
          });
        } else {
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
            index: this.acceptedTokens.length + 1,
            matchIndex: match.index,
            selected: false,
            nextTokenClass: match.nextTokenClass,
            // stamp: `${index + 1}/${totMatches}`, TODO is useless?
          });
        }
      });
      if (!this.fuzzyMode && results.length === 0) {
        this.$q.notify({
          message: this.$t('messages.noSearchResults'),
          type: 'info',
          icon: 'mdi-information',
          timeout: 1000,
        });
      }
      this.setSpinner({ ...SPINNER_CONSTANTS.SPINNER_STOPPED, owner: this.$options.name });
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
    searchLostChar(newValue) {
      if (newValue !== null && newValue !== '') { // && this.actualToken === '') {
        this.charReceived(newValue, true);
        this.resetSearchLostChar();
      }
    },

  },
  beforeMount() {
    this.setFuzzyMode(false);
  },
  mounted() {
    this.searchDiv = this.$refs['ks-container'];
    this.searchDivInternal = document.getElementById('ks-internal-container');
    this.searchInput = this.$refs['ks-search-input'];
    this.autocompleteEl = this.$refs['ks-autocomplete'];
    if (this.searchLostChar !== null && this.searchLostChar !== '') {
      this.charReceived(this.searchLostChar, false);
    } else {
      this.actualSearchString = '';
    }
    this.inputSearchColor = 'black';
    this.setLargeMode(0);
    this.$nextTick(() => {
      // for docked mode, to check dimension only with the small size
      this.searchDivInitialSize = this.searchDiv.clientWidth;
    });
  },
  beforeDestroy() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  #ks-container
    overflow-x hidden
    overflow-y hidden
    white-space nowrap
    #ks-internal-container
      float left
  .ks-tokens
    display inline-block
    margin-right -3px
    padding 0 3px

  .ks-tokens-accepted
    /* mix-blend-mode: difference; */
    font-weight 600

  .ks-tokens.selected
    /* color: #fff; */
    outline none

  .bg-semantic-elements
     border-radius 4px
     border-style solid
     border-width 2px

  .q-tooltip
    /* background-color: rgba(155, 155, 155, 0.5); */
    max-width $main-control-width

  .q-popover
    max-width $main-control-width !important
    border-radius 10px

  #ks-autocomplete
    /* for ff */
    scrollbar-color: #e5e5e5 rgba(0,0,0,0);
    scrollbar-width: thin;
    .q-item
      &.text-faded
        padding 8px 16px 5px 16px
        min-height 0
        font-size 0.8em
        color #333
        border-bottom 1px solid #ccc
        &.q-select-highlight
          background-color transparent

      &:not(.text-faded):active
        background rgba(189,189,189,0.5)
    /* for webkit */
    &::-webkit-scrollbar-track
      border-radius 10px
      background-color rgba(0,0,0,0)

    &::-webkit-scrollbar
      width 6px
      background-color rgba(0,0,0,0)

    &::-webkit-scrollbar-thumb
      border-radius 10px
      width 5px
      background-color #e5e5e5

  .ks-tokens-fuzzy
    width 100%
  .ks-tokens-klab
    width 256px
  #ks-search-input
    background-color transparent
  .ks-search-focused
    padding 0;
    border-radius: 4px;
    background-color: $main-control-cyan;
    transition background-color 0.8s
    &.ks-fuzzy
      background-color: $main-control-green;
      transition background-color 0.8s


</style>

<template>
  <div id="ks-container"
       ref="ks-container"
  >
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
      @keyup.esc="searchEnd({})"
      @contextmenu.native.prevent
      @touchstart.native="handleTouch($event, null, searchInKLab)"
    >
    <!-- :style="{ 'background-color': waitForDouble ? 'rgba(0, 0, 0, .1)' : 'transparent' }" TODO: implement way to know if we are waiting -->
      <klab-autocomplete
        @filter="search"
        @input="selected"
        @show="onAutocompleteShow"
        @hide="onAutocompleteHide"
        :debounce="200"
        :min-characters="2"
        :max-results="50"
        ref="mc-autocomplete"
        id="mc-autocomplete"
        :class="[ notChrome() ? 'not-chrome' : '']"
      ></klab-autocomplete>
    </q-input>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import Constants, { MATCH_TYPES, SEMANTIC_TYPES } from 'shared/Constants';
import HandleTouch from 'shared/HandleTouchMixin';
import KlabAutocomplete from 'components/KlabAutocompleteComponent';

export default {
  name: 'KlabSearch',
  mixins: [HandleTouch],
  props: {
    maxResults: {
      type: Number,
      default: -1,
    },
  },
  components: [
    KlabAutocomplete,
  ],
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
      suggestionShowed: false,
      searchTimeout: null,
      searchHistoryIndex: -1,
      autocompleteSB: null,
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
      switch (event.keyCode) {
        case 8: // BACKSPACE
          if (this.actualToken === '' && this.acceptedTokens.length !== 0) { // existing accepted token without actual search text
            this.acceptedTokens.pop();
            this.searchHistoryIndex = -1;
            event.preventDefault();
          } else if (this.actualSearchString !== '') { // existing actual token so backspace work normally
            event.preventDefault();
            this.actualSearchString = this.actualSearchString.slice(0, -1);
          } else if (this.actualSearchString === '' && this.actualToken !== '') { // existing actual token, but is a complex suggestion, so everything must be delete
            this.actualToken = '';
            event.preventDefault();
          }
          break;
        case 9: // TAB force to select with TAB
          if (this.suggestionShowed && this.autocompleteEl.keyboardIndex !== -1) {
            this.autocompleteEl.setValue(this.autocompleteEl.results[this.autocompleteEl.keyboardIndex]);
            this.searchHistoryIndex = -1;
          }
          event.preventDefault();
          break;
        case 13: // ENTER
          this.searchInKLab(event);
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
          if (!this.askForSuggestion()) {
            this.$q.notify({
              message: this.$t('messages.noSpaceAllowedInSearch'),
              type: 'warning',
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
          if (event.keyCode < 65 || event.keyCode > 90) {
            if (event.keyCode !== 39) { // right arrow
              event.preventDefault();
            } // only letters are permitted
          } else {
            event.preventDefault();
            this.searchHistoryIndex = -1;
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
        cancelSearch: false,
        defaultResults: terms === '',
        queryString: this.actualSearchString, // terms split space
      }, this.$store.state.data.session).body);
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
      }, process.env.SEARCH_TIMEOUT_MS);
    },
    // ask for token to keylab to obtain possibility
    searchInKLab() {
      if (this.suggestionShowed) {
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
          // position: 'top',
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
    askForSuggestion() {
      if (this.acceptedTokens.length === 0 && this.searchInput.$refs.input.selectionStart === 0) {
        this.search('', (results) => {
          this.autocompleteEl.__clearSearch();
          if (Array.isArray(results) && results.length > 0) {
            this.autocompleteEl.results = results;
            Vue.nextTick(() => {
              this.autocompleteEl.__showResults();
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
        this.acceptedTokens.pop();
        this.searchHistoryIndex = -1;
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
          ...Constants.SPINNER_ERROR,
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
            selected: false,
            // stamp: `${index + 1}/${totMatches}`, TODO is useless?
          });
        }
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
        if (newValue === 'ArrowUp') {
          this.searchHistoryEvent(1);
        } else if (newValue === 'ArrowDown') {
          this.searchHistoryEvent(-1);
        } else if (newValue === ' ') {
          this.askForSuggestion();
        } else {
          this.actualSearchString = this.actualSearchString + newValue;
        }
        this.resetSearchLostChar();
      }
    },
  },
  mounted() {
    this.searchDiv = this.$refs['ks-container'];
    this.searchInput = this.$refs['mc-search-input'];
    this.autocompleteEl = this.$refs['mc-autocomplete'];
    if (this.searchLostChar !== null) {
      if (this.searchLostChar === 'ArrowUp') {
        this.searchHistoryEvent(1);
      } else if (this.searchLostChar === 'ArrowDown') {
        this.searchHistoryEvent(-1);
      } else if (this.searchLostChar === ' ') {
        this.askForSuggestion();
      } else {
        this.actualSearchString = this.searchLostChar;
      }
    } else {
      this.actualSearchString = '';
    }
    this.inputSearchColor = 'black';
  },
};
</script>

<style lang="stylus">

  #ks-container
    overflow-x hidden
    overflow-y hidden
    white-space nowrap

  .tokens
    display inline-block
    margin-right 1px
    padding 0 3px

  .tokens-accepted
    /* mix-blend-mode: difference; */
    font-weight 600

  .tokens.selected
    /* color: #fff; */
    outline none

  .bg-semantic-elements
     border-radius 10px
     border-style solid
     border-width 2px

  .q-tooltip
    /* background-color: rgba(155, 155, 155, 0.5); */
    max-width $main-control-width

  .q-menu
    max-width $main-control-width !important
    border-radius 10px

  #mc-autocomplete
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

</style>

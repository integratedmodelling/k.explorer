<template>
  <div v-if="searchIsActive" id="search-div" class="q-pa-md">
    <!--
    <q-chips-input
      inverted-color="controlColor.value"
      :value="tokenToString"
      :placeholder="$t('label.searchPlaceholder')"
      :autofocus="true"
    >
    -->
    <div
      contenteditable="true"
      class="single-line text-left, float-left"
      @focus="setEndOfContenteditable"
      ref="tokens-div"
      @keydown="filter"
      >
      <div
        v-for="(token) in acceptedTokens"
        :key="token.id"
        style="display: inline-block"
      >{{ token.value }} </div>
      <q-input
        :autofocus="true"
        color="controlColor.name"
        v-model="actualToken"
        placeholder="Type 'fre'"
        class="float-left"
        style="width: auto"
        ref="input-search"
        id="input-search"
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
  <div v-else id="text-div" class="q-pa-md text-white">
    {{ contextLabel === null ? $t('label.noContext') : contextLabel }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import Constants from 'shared/Constants';

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
    };
  },
  computed: {
    ...mapGetters('data', [
      'contextLabel',
      'searchResult',
    ]),
    ...mapGetters('view', [
      'spinner',
      'searchIsActive',
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
    setEndOfContenteditable() {
      let range;
      let selection;
      const element = this.$refs['tokens-div'];
      if (document.createRange) { // Firefox, Chrome, Opera, Safari, IE 9+
        range = document.createRange();// Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(element);// Select the entire contents of the element with the range
        range.collapse(false);// collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();// get the selection object (allows you to change selection)
        selection.removeAllRanges();// remove any selections already made
        selection.addRange(range);// make the range you have just created the visible selection
      } else if (document.selection) { // IE 8 and lower
        range = document.body.createTextRange();// Create a range (a range is a like the selection but invisible)
        range.moveToElementText(element);// Select the entire contents of the element with the range
        range.collapse(false);// collapse the range to the end point. false means collapse to end rather than the start
        range.select();// Select the range (make it the visible selection
      }
    },
    filter(event) {
      if (event.target.id === 'input-search') {
        return;
      }
      if (event.keyCode < 33 || event.keyCode > 40) {
        event.preventDefault();
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
        results.push({
          value: match.name,
          label: match.name,
          labelLines: 1,
          sublabel: match.description,
          sublabelLines: 1,
          letter: match.matchType.charAt(0),
          leftInverted: true,
          color: 'primary',
          id: match.id,
        });
      });
      this.doneFunc(results);
      this.setSpinner(Constants.SPINNER_STOPPED);
    },
  },
};
</script>

<style>
</style>

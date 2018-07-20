/**
 * Wrapper for searches
 * Every search has 2 id: the context id received in the first answer of REST service, and an interneal ID than mark
 * the step of search
 * Every token has a type and could be a two words (so space is not separator)
 */
import { SHARED } from 'shared/MessagesConstants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';

export class Token {
  constructor(token, type = null) {
    if (type !== null && typeof type !== 'object' && typeof SHARED.SEARCH_TYPES.find(t => t.enumId === type.enumId) === 'undefined') {
      throw new Error(`Type must be one of known:\n${JSON.stringify(SHARED.SEARCH_TYPES)}`);
    }
    this.token = token;
    this.type = type;
  }
}

export default class KLabSearch {
  constructor(store, stompSendFunction, maxResults = -1) {
    this.store = store;
    this.stompSendFunction = stompSendFunction;
    this.session = store.state.data.session;
    this.requestId = 0;
    this.history = [];
    this.maxResults = maxResults;
    this.initSearch();
    this.done = null;
  }

  get contextId() {
    return this.store.state.data.searchContextId;
  }

  get requestId() {
    return this.store.state.data.searchRequestId;
  }

  set contextId(contextId) {
    this.store.commit('data/SET_SEARCH_CONTEXT_ID', contextId);
  }

  set requestId(requestId) {
    this.store.commit('data/SET_SEARCH_REQUEST_ID', requestId);
  }

  initSearch() {
    this.contextId = null;
    this.acceptedTokens = [];
    this.matches = [];
  }

  sendSearchMessage({ queryString, matchTypes = null, cancelSearch = false }, done) {
    this.requestId += 1;
    this.stompSendFunction(MESSAGES_BUILDERS.SUBMIT_SEARCH({
      requestId: this.requestId,
      contextId: this.contextId,
      maxResults: this.maxResults,
      session: this.session,
      cancelSearch,
      queryString,
      matchTypes,
    }).body);
    this.done = done;
  }

  processResults(results) {
    if (results.requestId === this.requestId) {
      const { matches } = results;
      const autocomplete = [];
      matches.forEach((match) => {
        autocomplete.push({
          value: match.name,
          label: match.name,
          labelLines: 1,
          sublabel: match.description,
          sublabelLines: 1,
          letter: match.matchType.charAt(0),
          leftInverted: true,
        });
      });
      this.done(autocomplete);
    }
  }

  setMatches(contextId, requestId, matches = []) {
    if (contextId === this.contextId && requestId === this.requestId) {
      this.matches.push(...matches);
    }
  }

  acceptToken(token) {
    // if (contextId === this.contextId && requestId === this.requestId) {
    this.acceptedTokens.push(token);
    this.matches.splice(0, this.matches.length);
    // } else {
    //   console.log(`Received an old answer with requestId ${requestId}, now we are in requestId ${this.requestId}`);
    // }
  }
}

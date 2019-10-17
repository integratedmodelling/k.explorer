/* eslint-disable no-underscore-dangle,one-var,prefer-destructuring,no-undef,prefer-template,no-void,arrow-parens,space-before-function-paren,quote-props,semi,indent,comma-dangle,object-curly-newline,no-unused-expressions */
import { QAutocomplete, QPopover, QList, uid, dom } from 'quasar';
import QItemWrapper from './QItemWrapper';

const { width } = dom;

export default {
  name: 'KlabQAutocomplete',
  extends: QAutocomplete,
  methods: {
    trigger(focus) {
      if (!this.__input || !this.__input.isEditable() || !this.__input.hasFocus() || !this.isWorking()) {
        return;
      }

      const
        terms = [null, void 0].includes(this.__input.val) ? '' : String(this.__input.val),
        termsLength = terms.length,
        searchId = uid(),
        popover = this.$refs.popover;

      this.searchId = searchId;

      if (termsLength < this.minCharacters || (focus === true /* avoid callback params */ && termsLength > 0)) {
        this.searchId = '';
        this.__clearSearch();
        this.hide();
        return;
      }

      this.width = width(this.inputEl) + 'px';

      if (this.staticData) {
        this.searchId = '';
        this.results = this.filter(terms, this.staticData);
        if (this.results.length) {
          this.__showResults();
          return;
        }

        popover.hide();
        return;
      }

      // this.__input.loading = true;
      this.$emit('search', terms, results => {
        if (!this.isWorking() || this.searchId !== searchId) {
          return;
        }

        this.__clearSearch();

        if (Array.isArray(results) && results.length > 0) {
          this.results = results;
          this.__showResults();
          return;
        }

        this.hide();
      });
    },
  },
  render (h) {
    const dark = this.__input.isDark()
    return h(QPopover, {
      ref: 'popover',
      'class': dark ? 'bg-dark' : null,
      props: {
        fit: true,
        keepOnScreen: true,
        anchorClick: false,
        maxHeight: this.maxHeight,
        noFocus: true,
        noRefocus: true
      },
      on: {
        show: () => {
          this.__input.selectionOpen = true
          this.$emit('show')
        },
        hide: () => {
          this.__input.selectionOpen = false
          this.$emit('hide')
        }
      },
      nativeOn: {
        mousedown: (e) => { // so if scrollbar is clicked, it doesn't disappear
          e.preventDefault();
        }
      }
    }, [
      h(QList, {
          props: {
            dark,
            noBorder: true,
            separator: this.separator
          },
          style: this.computedWidth
        },
        this.computedResults.map((result, index) => h(QItemWrapper, {
          key: result.id || index,
          'class': {
            'q-select-highlight': this.keyboardIndex === index,
            'cursor-pointer': !result.disable,
            'text-faded': result.disable,
            'ka-separator': result.separator
          },
          props: { cfg: result },
          nativeOn: {
            mousedown: (e) => {
              !result.disable && (this.keyboardIndex = index);
              e.preventDefault();
            },
            click: () => {
              !result.disable && this.setValue(result);
            }
          }
        })))
    ])
  }
};

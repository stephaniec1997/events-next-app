import { isArray } from 'lodash';
import parse from 'autosuggest-highlight/parse';

export default class LocationOption {
  constructor(data = '') {
    this.data = data;
    this._options = data && typeof data === 'object' && !isArray(data) ? data : {};

    this._description = this._options.description || null;
    this._description_matched_substrings = this._options.matched_substrings || [];
    this._main_text = this._options.structured_formatting?.main_text || null;
    this._main_text_matched_substrings = this._options.structured_formatting?.main_text_matched_substrings || [];
    this._secondary_text = this._options.structured_formatting?.secondary_text || null;
  }

  get description() {
    return this._description || this.data;
  }

  get descriptionMatchedSubstrings() {
    return this._description_matched_substrings;
  }

  get descriptionParts() {
    return this.parts(
      this.description,
      this.descriptionMatchedSubstrings,
    );
  }

  get mainText() {
    return this._main_text;
  }

  get mainTextMatchedSubstrings() {
    return this._main_text_matched_substrings;
  }

  get mainTextParts() {
    return this.parts(
      this.mainText,
      this.mainTextMatchedSubstrings,
    );
  }

  get secondaryText() {
    return this._secondary_text;
  }

  parts(text, matches) {
    return parse(
      text,
      matches.map(match => [match.offset, match.offset + match.length]),
    );
  }
}

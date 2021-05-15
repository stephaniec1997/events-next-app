import { isArray } from 'lodash';

import Event from 'models/event';

export default class Events {
  constructor(data = {}) {
    this._options = data && typeof data === 'object' && !isArray(data) ? data : {};

    this._eventsList = isArray(this._options.events)
      ? this._options.events
        .map(event => new Event(event))
      : [];
  }

  get eventsList() {
    return this._eventsList;
  }
}

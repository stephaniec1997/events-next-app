import { isArray } from 'lodash';

export default class Event {
  constructor(data = {}) {
    this._options = data && typeof data === 'object' && !isArray(data) ? data : {};

    this._id = this._options._id || null;
    this._name = this._options.name || "New Event";
    this._start_date = new Date(this._options.startDate) || null;
    this._end_date = new Date(this._options.endDate) || null;
    this._place = this._options.place || null;
    this._description = this._options.description || null;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get startDate() {
    return this.formatDate(this._start_date);
  }

  get endDate() {
    return this.formatDate(this._end_date);
  }

  get place() {
    return this._place;
  }

  get description() {
    return this._description;
  }

  formatDate(date) {
    return date.toLocaleString();
  }
}

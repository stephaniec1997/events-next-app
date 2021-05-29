import moment from "moment";
import { isArray } from "lodash";

export default class Event {
  constructor(data = {}) {
    this._options =
      data && typeof data === "object" && !isArray(data) ? data : {};

    this._id = this._options.id || null;
    this._name = this._options.name || "New Event";
    this._start_date =
      this._options.startDate && moment(this._options.startDate * 1000);
    this._end_date =
      (!this._options.allDay && moment(this._options.endDate * 1000)) || null;
    this._allDay = this._options.allDay || null;
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

  get allDay() {
    return this._allDay;
  }

  get place() {
    return this._place;
  }

  get description() {
    return this._description;
  }

  formatDate(date) {
    if (this.allDay) {
      return date && date.format("dddd LL");
    }
    return date && date.format("LLL");
  }
}

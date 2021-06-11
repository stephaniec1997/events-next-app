// USED FOR PROFILE PAGE
import { isArray } from "lodash";

import EventsModel from "models/events";

export default class User {
  constructor(data = {}) {
    this._options =
      data && typeof data === "object" && !isArray(data) ? data : {};

    this._id = this._options.uid || null;
    this._email = this._options.email || null;
    this._display_name = this._options.displayName || null;
    this._photo_url = this._options.photoURL || null;
    this._subscriptions = new EventsModel(this._options.subscriptions);
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get displayName() {
    return this._display_name || this._email;
  }

  get avatarUrl() {
    return this._photo_url;
  }

  get subscriptions() {
    return this._subscriptions;
  }

  set displayName(name) {
    this._display_name = name;
  }

  set avatarUrl(url) {
    this._photo_url = url;
  }
}

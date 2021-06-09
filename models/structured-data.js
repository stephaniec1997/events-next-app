import { isArray } from "lodash";
import { SITE_NAME, SITE_URL } from "constants";

export const SCHEMA_CONTEXT = "https://schema.org";

export const EVENT_DATA_TYPE = "Event";
export const ITEM_LIST_DATA_TYPE = "ItemList";
export const STRUCTURED_DATA_TYPES = [EVENT_DATA_TYPE, ITEM_LIST_DATA_TYPE];

export const EVENT_REQUIRED_PROPERTIES = [
  { property: "location" },
  { property: "startDate" },
  { property: "name" },
];

export const EVENT_OPTIONAL_PROPERTIES = [
  { property: "description" },
  { property: "offers" },
  { property: "eventStatus" },
  { property: "endDate" },
  { property: "eventAttendanceMode" },
  { property: "image" },
  { property: "performer" },
  { property: "organizer" },
];

export default class StructuredData {
  constructor(data = {}, type = "event") {
    this._options =
      data && typeof data === "object" && !isArray(data) ? data : {};

    this._type = type;
    this._id = this._options.id || null;
    this._name = this._options.name || "New Event";
    this._start_date =
      this._options.startDate && new Date(this._options.startDate * 1000);
    this._end_date =
      (!this._options.allDay && new Date(this._options.endDate * 1000)) || null;
    this._place = this._options.place || null;
    this._description = this._options.description || null;
    this._virtual = this._options.virtual || null;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get startDate() {
    return this._start_date;
  }

  get endDate() {
    return this._end_date;
  }

  get virtual() {
    return this._virtual;
  }

  get place() {
    return this._place;
  }

  get location() {
    if (this.virtual) {
      return (
        this.place && {
          "@type": "VirtualLocation",
          url: this.place,
        }
      );
    }
    return (
      this.place && {
        "@type": "Place",
        name: this.place,
        // address: {
        //   "@type": "PostalAddress",
        //   streetAddress: "100 West Snickerpark Dr",
        //   addressLocality: "Snickertown",
        //   postalCode: "19019",
        //   addressRegion: "PA",
        //   addressCountry: "US",
        // },
      }
    );
  }

  get eventAttendanceMode() {
    return this.virtual
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode";
  }

  get description() {
    return this._description;
  }

  get url() {
    switch (this._type) {
      case "event":
      default:
        return `${SITE_URL}/event/${this.id}`;
    }
  }

  get organizer() {
    return {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    };
  }

  get type() {
    switch (this._type) {
      case "event":
      default:
        return EVENT_DATA_TYPE;
    }
  }

  get mainEntityOfPage() {
    return (
      this.url && {
        "@type": "WebPage",
        "@id": this.url,
      }
    );
  }

  get body() {
    if (!this.type || !this.hasRequiredProperties()) {
      return null;
    }

    const data = {
      "@context": SCHEMA_CONTEXT,
      "@type": this.type,
      mainEntityOfPage: this.mainEntityOfPage,
    };

    let properties;

    switch (this.type) {
      case EVENT_DATA_TYPE:
      default:
        properties = [
          ...EVENT_REQUIRED_PROPERTIES,
          ...EVENT_OPTIONAL_PROPERTIES,
        ];
        break;
    }

    properties.forEach(({ property }) => {
      data[property] = this[property];
    });

    return data;
  }

  hasRequiredProperties() {
    let requiredProperties;

    switch (this.type) {
      case EVENT_DATA_TYPE:
      default:
        requiredProperties = EVENT_REQUIRED_PROPERTIES;
        break;
    }

    return requiredProperties.every(({ property }) => !!this[property]);
  }
}

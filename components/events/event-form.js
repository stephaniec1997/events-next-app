import moment from "moment";
import { useState } from "react";
import { useRouter } from "next/router";

import Form from "components/form";
import FormError from "components/form/error";

import { validateForm } from "utils";

const EventForm = ({ event }) => {
  const router = useRouter();
  const [error, setError] = useState(null);

  event = event ? event : {};

  const createEvent = (newEvent) => {
    console.log("creating event", newEvent);
  };

  const editEvent = (updatedEvent) => {
    console.log(`editing ${event.id} event`, updatedEvent);
  };

  const handleSubmit = (newEvent) => {
    const eid = event.id;
    const newEventData = {
      name: newEvent.name,
      startDate: newEvent.date.start.toDate(),
      endDate: newEvent.date.end.toDate(),
      allDay: newEvent.date.allDay,
      place:
        typeof newEvent.place === "string"
          ? newEvent.place
          : newEvent.place.description,
      description: newEvent.description,
    };

    const formErrors = validateForm({ ...newEventData, allDay: true });

    if (formErrors) {
      return setError(formErrors);
    }

    if (eid) {
      editEvent(newEventData);
    } else {
      createEvent(newEventData);
    }

    router.back();
  };

  return (
    <>
      <FormError error={error} setOpen={setError} />
      <Form
        title={event.id ? "Edit Event" : "New Event"}
        fields={[
          { label: "name", type: "text", value: event.name },
          {
            label: "date",
            type: "date",
            value: {
              start: event.startDate || moment(),
              end: event.endDate || moment(),
              allDay: event.allDay || false,
            },
          },
          { label: "place", type: "location", value: event.place },
          { label: "description", type: "long", value: event.description },
        ]}
        buttonTitle={event.id ? "Save Edits" : "Create Event"}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EventForm;

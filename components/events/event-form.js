import { useState } from "react";
import { useRouter } from "next/router";

import Form from "components/form";
import FormError from "components/form/error";
import FormSuccess from "components/form/success";

import { validateForm } from "utils";
import { addEvent, updateEvent } from "utils/api";

const EventForm = ({ event }) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);

  event = event ? event : {};

  const handleSubmit = (newEvent) => {
    setDisableSubmit(true);
    const eid = event.id;
    const newEventData = {
      name: newEvent.name,
      startDate: newEvent.date.start,
      endDate: newEvent.date.end,
      allDay: newEvent.date.allDay,
      place:
        typeof newEvent.location.place === "string"
          ? newEvent.location.place
          : newEvent.location.place.description,
      virtual: newEvent.location.virtual,
      description: newEvent.description,
    };

    const formErrors = validateForm({ ...newEventData, allDay: true });

    if (formErrors) {
      setError(formErrors);
      setDisableSubmit(false);
      return;
    }

    let action = () => {};

    if (eid) {
      action = (data) => {
        return updateEvent(eid, data);
      };
    } else {
      action = addEvent;
    }

    action(newEventData)
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          setError(response.error);
          setDisableSubmit(false);
        } else {
          setSuccessMessage(response.message);
          setTimeout(() => {
            router.replace("/admin");
          }, 500);
        }
      });
  };

  return (
    <>
      <FormSuccess message={successMessage} setOpen={setSuccessMessage} />
      <FormError error={error} setOpen={setError} />
      <Form
        title={event.id ? "Edit Event" : "New Event"}
        fields={[
          { label: "name", type: "text", value: event.name },
          {
            label: "date",
            type: "date",
            value: {
              start: event.startDate,
              end: event.endDate,
              allDay: event.allDay,
            },
          },
          {
            label: "location",
            type: "location",
            value: {
              place: event.place,
              virtual: event.virtual,
            },
          },
          { label: "description", type: "long", value: event.description },
        ]}
        buttonTitle={event.id ? "Save Edits" : "Create Event"}
        onSubmit={handleSubmit}
        disableSubmit={disableSubmit}
      />
    </>
  );
};

export default EventForm;

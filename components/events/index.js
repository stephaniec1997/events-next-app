import { Fragment } from "react";
import { useRouter } from "next/router";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import Event from "components/events/event";

import EventsModel from "models/events";

const Events = ({ data, edit }) => {
  const router = useRouter();

  const events = new EventsModel(data);

  return (
    <List>
      {events.eventsList.map(event => (
        <Fragment key={event.id}>
          <Event
            key={`event-${event.id}`}
            button
            component="li"
            event={event}
            edit={edit}
            disableLocation
            onClick={() => {
              router.push(`/event/${event.id}`);
            }}
          />
          <Divider
            key={`event-${event.id}-divider`}
            variant="inset"
            component="li"
          />
        </Fragment>
      ))}
    </List>
  );
};

export default Events;

import { Fragment } from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import Event from "components/events/subscriptions/event";
import EventsModel from "models/events";

const Subscriptions = ({ data }) => {
  const events = new EventsModel(data);

  return (
    <List>
      {events.eventsList.map(event => (
        <Fragment key={event.id}>
          <Event event={event} />
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

export default Subscriptions;

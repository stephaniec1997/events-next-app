import List from "@material-ui/core/List";

import StructuredData from "components/structured-data";
import Event from "components/events/event";

import EventModel from "models/event";

import { getEvent } from "utils/firebase/admin";

const EventPage = ({ event }) => {
  const eventData = new EventModel(event);

  return (
    <>
      <StructuredData data={event} />
      <List>
        <Event event={eventData} />
      </List>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const data = await getEvent(params.eid);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: params.eid,
      event: data,
    },
  };
}

export default EventPage;

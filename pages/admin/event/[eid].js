import EventForm from "components/events/event-form";

import EventModel from "models/event";

import { getEvent } from "utils/firebase/admin";

const Event = ({ event }) => {
  const eventData = new EventModel(event);

  return <EventForm event={eventData} />;
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

export default Event;

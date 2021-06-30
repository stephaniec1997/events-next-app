import nookies from "nookies";

import List from "@material-ui/core/List";

import StructuredData from "components/structured-data";
import Event from "components/events/event";

import EventModel from "models/event";

import { getEvent, getUserSubscription } from "utils/firebase/admin";

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

export async function getServerSideProps(ctx) {
  const eid = ctx.params.eid;
  const data = await getEvent(eid);

  if (!data) {
    return {
      notFound: true,
    };
  }

  const cookies = nookies.get(ctx);
  let subscription;
  if (cookies.token) {
    subscription = await getUserSubscription(cookies.token, eid);
  }

  return {
    props: {
      id: eid,
      event: { ...data, subscription },
    },
  };
}

export default EventPage;

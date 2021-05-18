import List from '@material-ui/core/List';

import Event from 'components/events/event';

import EventModel from 'models/event';

import { EVENT } from 'helpers/mock-data';

const EventPage = ({ event }) => {
  const eventData = new EventModel(event);

  return (
    <List>
      <Event event={eventData}/>
    </List>
  );
};

export async function getServerSideProps({ params }) {
  const data = EVENT;// TODO: Actually fetch this data

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

import Event from 'components/events/event';
import List from '@material-ui/core/List';

import EventModel from 'models/event';

import {EVENT} from 'helpers/mock-data';

const EventPage = ({event}) => {
  const eventData = new EventModel(event);

  return (
    <List>
      <Event event={eventData}/>
    </List>
  );
};

export async function getServerSideProps({params}) {
  const data = EVENT;// TODO: Actually fetch this data

  if (!Math.floor(Math.random() * 2)) { // TODO: replace condition with !data
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

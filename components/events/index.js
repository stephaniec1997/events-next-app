import Link from 'next/link';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Event from 'components/events/event';

import EventsModel from 'models/events';

const Events = ({ data, edit }) => {
  const events = new EventsModel(data);

  return (
    <List>
      {events.eventsList.map(event => (
        <>
          <Link key={event.id} href={`/event/${event.id}`}>
            <Event button component="a" event={event} edit={edit} />
          </Link>
          <Divider variant="inset" component="li" />
        </>
        ))
      }
    </List>
  );
};

export default Events;

import List from '@material-ui/core/List';
import Event from 'components/events/event';

import EventsModel from 'models/events';

const Events = ({data, edit}) => {
  const events = new EventsModel(data);

  return (
    <List>
      {events.eventsList.map(event => (
        <Event key={event.id} event={event} edit={edit} />
        ))
      }
    </List>
  );
};

export default Events;

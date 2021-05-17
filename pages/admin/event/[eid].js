import EventForm from 'components/events/event-form';

import EventModel from 'models/event';

import {EVENT} from 'helpers/mock-data';


const Event = ({event}) => {
  const eventData = new EventModel(event);

  return (
      <EventForm event={eventData}/>
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


export default Event;

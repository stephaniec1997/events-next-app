import EventForm from 'components/events/event-form';

import EventModel from 'models/event';

const Event = ({event}) => {
  const eventData = new EventModel(event);

  return (
      <EventForm event={eventData}/>
    );
};

export async function getServerSideProps({params}) {
  const data = {
    _id: params.eid,
    name: 'test event (local)',
    startDate: new Date().toString(),
    place: 'test place',
    description: 'test event that needs to be gotten from db instead',
  };// TODO: Actually fetch this data

  if (!Math.floor(Math.random() * 2)) { // TODO: replace condition with !data
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: data,
    }, // will be passed to the page component as props
  };
}


export default Event;

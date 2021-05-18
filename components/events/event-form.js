import Form from 'components/form';

const EventForm = ({ event }) => {
  event = event? event: {};

  const createEvent = (newEvent) => {
    console.log('creating event', newEvent);
  };

  const editEvent = (updatedEvent) => {
    console.log(`editing ${event.id} event`, updatedEvent);

  };

  const handleSubmit = (newEvent) =>{
    const eid = event.id;
    const newEventData = {
      name: newEvent.name,
      startDate: newEvent.date.start,
      endDate:newEvent.date.end,
      allDay: newEvent.date.allDay,
      place: typeof newEvent.place === 'string' ? event.place : event.place.description,
      description: newEvent.description,
    };
    if (eid) {
      editEvent(newEventData);
    } else {
      createEvent(newEventData);
    }
  };

  return(
    <Form
      title={event.id? 'Edit Event':'New Event'}
      fields={[
        { label:'name', type:'text', value: event.name },
        {
          label:'date',
          type:'date',
          value: {
            start: event.startDate,
            end:event.endDate,
            allDay: event.allDay,
          },
        },
        { label:'place', type:'location', value: event.place },
        { label:'description', type:'long', value: event.description },
      ]}
      buttonTitle={event.id? 'Save Edits':'Create Event'}
      onSubmit={handleSubmit}
    />
  );
};

export default EventForm;

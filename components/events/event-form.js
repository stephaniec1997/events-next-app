import Form from 'components/form';

const EventForm = ({event}) => {

  event = event? event: {};

  return(
    <Form
      title={event.id? 'Edit Event':'New Event'}
      fields={[
        {label:'name', type:'text', value: event.name},
        {
          label:'date',
          type:'date',
          value: {
            start: event.startDate,
            end:event.endDate,
            allDay: event.allDay,
          },
        },
        {label:'place', type:'location', value: event.place},
        {label:'description', type:'long', value: event.description},
      ]}
      buttonTitle={event.id? 'Save Edits':'Create Event'}
    />
  );
};


export default EventForm;

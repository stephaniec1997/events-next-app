import Form from 'components/form';

const EventForm = ({event}) => {
  return(
    <Form
      title={'New Event'}
      fields={[
        {label:'name', type:'text'},
        {label:'date', type:'date'},
        {label:'place', type:'location'},
        {label:'description', type:'long'},
      ]}
      buttonTitle={'Create Event'}
    />
  );
};

export default EventForm;

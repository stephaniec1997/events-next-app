// import { useRouter } from 'next/router';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
//
import EventForm from 'components/events/event-form';
//
// const useStyles = makeStyles(theme => ({
//   root:{
//     margin: theme.spacing(1),
//   },
//   fields: {
//     display: 'flex',
//     flexDirection:'column',
//   },
// }));

const Event = ({event}) => {
  // const classes = useStyles();
  // const router = useRouter();
  // const { eid } = router.query;
  // const title = eid === 'create'? 'Create': 'Edit';

  return (
      <EventForm event={event}/>
    );
};

export default Event;

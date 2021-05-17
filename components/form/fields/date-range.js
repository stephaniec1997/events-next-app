import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  DateTimePicker,
} from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  dates: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(1),
    marginLeft: 0,
    paddingLeft: 0,
  },
  endDate: {
    marginLeft: theme.spacing(2),
  },
}));

const EventForm = ({values, setValues, className}) => {
  const classes = useStyles();

  const handleSwitchChange = prop => (event) => {
    setValues({ ...values, [prop]: event.target.checked });
  };

  const handleDateChange = prop => (date) => {
    setValues({ ...values, [prop]: date });
  };

  return (
    <>
      <Container className={classes.dates}>
        <MuiPickersUtilsProvider utils={MomentUtils} >
          <>
            {values.allDay && (
              <DatePicker
                value={values.start}
                disablePast
                inputVariant="outlined"
                onChange={handleDateChange('start')}
                label="Start Date"
                showTodayButton
              />
            )}
            {values.allDay || (
              <DateTimePicker
                value={values.start}
                disablePast
                inputVariant="outlined"
                onChange={handleDateChange('start')}
                label="Start Date"
                showTodayButton
              />
            )}
            {values.allDay || (
              <DateTimePicker
                value={values.end}
                disablePast
                minDate={values.start}
                strictCompareDates
                minDateMessage='Date and time should be after start date'
                inputVariant="outlined"
                onChange={handleDateChange('end')}
                label="End Date"
                showTodayButton
                className={classes.endDate}
              />
            )}
          </>
        </MuiPickersUtilsProvider>
      </Container>
      <FormControlLabel
        control={
          <Switch
            checked={values.allDay}
            className={className}
            onChange={handleSwitchChange('allDay')}
            name="allDay"
            color="primary"
          />
        }
        label="All Day Event"
      />
    </>
  );
};

export default EventForm;

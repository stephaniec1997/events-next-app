import { makeStyles } from '@material-ui/core/styles';
import {capitalize} from 'lodash';

import DateRangeField from 'components/form/fields/date-range';
import LocationField from 'components/form/fields/location';
import PasswordField from 'components/form/fields/password';
import TextField from 'components/form/fields/text';


const useStyles = makeStyles(theme => ({
  field: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Form = ({label, type, value, onChange}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    switch (type) {
      case 'date':
      case 'location':
        return onChange(e);
      case 'password':
      case 'text':
      default:
        return onChange(e.target.value);
    }
  };

  const fieldLabel = capitalize(label);

  switch (type) {
    case 'date':
      return (
        <DateRangeField
          values={value}
          setValues={handleChange}
        />
      );
    case 'location':
      return(
        <LocationField
          value={value}
          setValue={handleChange}
        />
      );
    case 'password':
      return(
        <PasswordField
          password={value}
          setPassword={handleChange}
          className={classes.field}
        />
      );
    case 'long':
      return(
        <TextField
          label={fieldLabel}
          value={value}
          onChange={handleChange}
          className={classes.field}
          multiline
        />
      );
    case 'text':
    default:
      return(
        <TextField
          label={fieldLabel}
          value={value}
          onChange={handleChange}
          className={classes.field}
        />
      );
  }
};

export default Form;

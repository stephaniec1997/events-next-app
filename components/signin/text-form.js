import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import PasswordField from 'components/signin/password-field';

const useStyles = makeStyles(theme => ({
  root:{
    margin: theme.spacing(1),
  },
  fields: {
    display: 'flex',
    flexDirection:'column',
  },
  textField: {
    margin: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const TextForm = ({title, fields}) => {
  const classes = useStyles();
  const [values, setValues] = useState(
    fields.reduce((acc,curr)=>(acc[curr]='', acc),{}),
  );

  const handleChange = prop => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
      <Card className={classes.root}>
        <CardHeader
          title={title}
        />
        <CardContent className={classes.fields}>
          {fields.map((field) =>{
            if (field === 'password'){
              return(
                <PasswordField
                  password={values.password}
                  setPassword={handleChange}
                  className={classes.textField}
                />
              );
            }
            return (
            <TextField
              key={field}
              label={field.slice(0,1).toUpperCase() + field.slice(1)}
              id="standard-start-adornment"
              value={values[field]}
              onChange={handleChange(field)}
              className={classes.textField}
            />
          );})}

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {/* TODO: ONCLICK FUNCTIONALITY*/}
            {title}
          </Button>
        </CardContent>
      </Card>
  );
};

export default TextForm;

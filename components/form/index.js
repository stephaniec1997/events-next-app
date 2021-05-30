import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import FormFields from "components/form/fields/";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  fields: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const initialState = (fields) => {
  const state = {};
  fields.map(({ label, type, value }) => {
    switch (type) {
      case "date":
        state[label] = value || {
          start: new Date(),
          end: new Date(),
          allDay: false,
        };
        break;
      case "location":
      case "password":
      case "text":
      default:
        state[label] = value || "";
        break;
    }
  });
  return state;
};

const Form = ({ title, fields, buttonTitle, onSubmit, disableSubmit }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState(fields));

  const handleChange = prop => (value) => {
    setValues({ ...values, [prop]: value });
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={title} />
      <CardContent className={classes.fields}>
        {fields.map(({ label, type }) => {
          return (
            <FormFields
              key={`${title}-${label}`}
              title={title}
              label={label}
              type={type}
              value={values[label]}
              onChange={handleChange(label)}
            />
          );
        })}

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
          disabled={disableSubmit}
        >
          {buttonTitle}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Form;
